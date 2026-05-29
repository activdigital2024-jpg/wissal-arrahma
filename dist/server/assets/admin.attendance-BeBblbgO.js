import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { toast } from "sonner";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { CalendarDays, Save } from "lucide-react";
import "@tanstack/react-router";
const STATUS_OPTIONS = [{
  value: "present",
  label: "حاضر",
  cls: "bg-green-100 text-green-700"
}, {
  value: "absent",
  label: "غائب",
  cls: "bg-red-100 text-red-700"
}, {
  value: "late",
  label: "متأخر",
  cls: "bg-amber-100 text-amber-700"
}, {
  value: "excused",
  label: "مبرر",
  cls: "bg-blue-100 text-blue-700"
}];
function AttendancePage() {
  const {
    user
  } = useAuth();
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [rows, setRows] = useState({});
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const loadAll = async () => {
    setBusy(true);
    const {
      data: studs,
      error
    } = await supabase.from("students").select("id, full_name").eq("status", "active").order("full_name");
    if (error) {
      toast.error(error.message);
      setBusy(false);
      return;
    }
    const list = studs || [];
    setStudents(list);
    const {
      data: existing
    } = await supabase.from("attendance").select("id, student_id, status, reason, notes").eq("attendance_date", date);
    const map = {};
    list.forEach((s) => {
      map[s.id] = {
        status: "present",
        reason: "",
        notes: "",
        existingId: null
      };
    });
    (existing || []).forEach((e) => {
      if (map[e.student_id]) {
        map[e.student_id] = {
          status: e.status,
          reason: e.reason || "",
          notes: e.notes || "",
          existingId: e.id
        };
      }
    });
    setRows(map);
    setBusy(false);
  };
  useEffect(() => {
    loadAll();
  }, [date]);
  const update = (sid, patch) => setRows((r) => ({
    ...r,
    [sid]: {
      ...r[sid],
      ...patch
    }
  }));
  const saveAll = async () => {
    setSaving(true);
    const payload = students.map((s) => ({
      id: rows[s.id]?.existingId ?? void 0,
      student_id: s.id,
      attendance_date: date,
      status: rows[s.id]?.status || "present",
      reason: rows[s.id]?.reason || null,
      notes: rows[s.id]?.notes || null,
      created_by: user?.id
    }));
    const {
      error
    } = await supabase.from("attendance").upsert(payload, {
      onConflict: "student_id,attendance_date"
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("تم حفظ الحضور");
    loadAll();
  };
  const summary = useMemo(() => {
    const counts = {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0
    };
    Object.values(rows).forEach((r) => counts[r.status]++);
    return counts;
  }, [rows]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "الحضور والغياب" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "سجّل حضور الأطفال يومياً" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "attendance-date", className: "mb-1 flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
            " التاريخ"
          ] }),
          /* @__PURE__ */ jsx("input", { id: "attendance-date", name: "attendance_date", type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "input max-w-xs" })
        ] }),
        /* @__PURE__ */ jsxs("button", { disabled: saving || busy || students.length === 0, onClick: saveAll, className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50", children: [
          /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
          saving ? "..." : "حفظ"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4", children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsxs("div", { className: `rounded-xl border p-3 text-center ${o.cls}`, children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs", children: o.label }),
      /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: summary[o.value] })
    ] }, o.value)) }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border bg-card", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-right", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الطفل" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الحالة" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "السبب" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "ملاحظات" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: busy ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "p-6 text-center text-muted-foreground", children: "جارٍ التحميل..." }) }) : students.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "p-6 text-center text-muted-foreground", children: "لا يوجد طلاب" }) }) : students.map((s) => {
        const r = rows[s.id];
        if (!r) return null;
        const showReason = r.status !== "present";
        return /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsx("td", { className: "p-3 font-medium", children: s.full_name }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: STATUS_OPTIONS.map((o) => /* @__PURE__ */ jsx("button", { type: "button", "aria-label": `تحديد الحالة: ${o.label} للطالب ${s.full_name}`, onClick: () => update(s.id, {
            status: o.value
          }), className: `rounded-full px-3 py-1 text-xs ${r.status === o.value ? o.cls + " ring-2 ring-offset-1 ring-foreground/20" : "bg-muted text-muted-foreground"}`, children: o.label }, o.value)) }) }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("input", { disabled: !showReason, value: r.reason, onChange: (e) => update(s.id, {
            reason: e.target.value
          }), placeholder: showReason ? "سبب الغياب..." : "—", title: "سبب الغياب", "aria-label": `سبب الغياب للطالب ${s.full_name}`, className: "input max-w-50 disabled:opacity-50" }) }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("input", { value: r.notes, onChange: (e) => update(s.id, {
            notes: e.target.value
          }), placeholder: "ملاحظات...", title: "ملاحظات الطالب", "aria-label": `ملاحظات الطالب ${s.full_name}`, className: "input max-w-50" }) })
        ] }, s.id);
      }) })
    ] }) })
  ] });
}
export {
  AttendancePage as component
};
