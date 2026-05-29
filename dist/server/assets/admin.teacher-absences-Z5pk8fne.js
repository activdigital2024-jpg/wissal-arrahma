import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { toast } from "sonner";
import { Plus, Check, X, Trash2 } from "lucide-react";
import "@tanstack/react-router";
function TeacherAbsencesPage() {
  const {
    user,
    isAdmin,
    isTeacher
  } = useAuth();
  const [items, setItems] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    teacher_id: "",
    absence_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    end_date: "",
    reason: "",
    justification: ""
  });
  const load = useCallback(async () => {
    const {
      data
    } = await supabase.from("teacher_absences").select("*").order("absence_date", {
      ascending: false
    });
    setItems(data || []);
    if (isAdmin) {
      const {
        data: rolesRaw
      } = await supabase.from("user_roles").select("user_id").eq("role", "teacher");
      const roles = rolesRaw || [];
      const ids = roles.map((r) => r.user_id);
      if (ids.length) {
        const {
          data: profsRaw
        } = await supabase.from("profiles").select("id, full_name, email").in("id", ids);
        const profs = profsRaw || [];
        const map = {};
        profs.forEach((p) => map[p.id] = p);
        setTeachers(map);
      }
    }
  }, [isAdmin]);
  useEffect(() => {
    load();
  }, [load]);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const teacher_id = isTeacher ? user.id : form.teacher_id;
    if (!teacher_id) {
      toast.error("اختر الأستاذ");
      setBusy(false);
      return;
    }
    const {
      error
    } = await supabase.from("teacher_absences").insert({
      teacher_id,
      absence_date: form.absence_date,
      end_date: form.end_date || null,
      reason: form.reason,
      justification: form.justification || null,
      status: isAdmin ? "approved" : "pending",
      created_by: user.id
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("تم الحفظ");
    setShowForm(false);
    setForm({
      ...form,
      reason: "",
      justification: "",
      end_date: ""
    });
    load();
  };
  const setStatus = async (id, status) => {
    const {
      error
    } = await supabase.from("teacher_absences").update({
      status
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم التحديث");
    load();
  };
  const remove = async (id) => {
    if (!confirm("حذف؟")) return;
    const {
      error
    } = await supabase.from("teacher_absences").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  const statusBadge = (s) => {
    const map = {
      pending: "bg-amber-100 text-amber-700",
      approved: "bg-emerald-100 text-emerald-700",
      rejected: "bg-rose-100 text-rose-700"
    };
    const lbl = {
      pending: "قيد المراجعة",
      approved: "مقبول",
      rejected: "مرفوض"
    };
    return /* @__PURE__ */ jsx("span", { className: `rounded px-2 py-1 text-xs ${map[s]}`, children: lbl[s] });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "غياب الأساتذة" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowForm((v) => !v), className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " ",
        showForm ? "إلغاء" : "إضافة غياب"
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-2", children: [
      isAdmin && /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "absence-teacher", className: "mb-1 block text-sm font-medium", children: "الأستاذ" }),
        /* @__PURE__ */ jsxs("select", { id: "absence-teacher", name: "teacher_id", required: true, value: form.teacher_id, onChange: (e) => setForm({
          ...form,
          teacher_id: e.target.value
        }), className: "input", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "— اختر —" }),
          Object.values(teachers).map((t) => /* @__PURE__ */ jsx("option", { value: t.id, children: t.full_name || t.email }, t.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "absence-start-date", className: "mb-1 block text-sm font-medium", children: "تاريخ بداية الغياب" }),
        /* @__PURE__ */ jsx("input", { id: "absence-start-date", name: "absence_date", type: "date", required: true, value: form.absence_date, onChange: (e) => setForm({
          ...form,
          absence_date: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "absence-end-date", className: "mb-1 block text-sm font-medium", children: "تاريخ النهاية (اختياري)" }),
        /* @__PURE__ */ jsx("input", { id: "absence-end-date", name: "end_date", type: "date", value: form.end_date, onChange: (e) => setForm({
          ...form,
          end_date: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "absence-reason", className: "mb-1 block text-sm font-medium", children: "السبب" }),
        /* @__PURE__ */ jsx("input", { id: "absence-reason", name: "reason", required: true, value: form.reason, onChange: (e) => setForm({
          ...form,
          reason: e.target.value
        }), className: "input", placeholder: "مرض / ظرف عائلي / ..." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "absence-justification", className: "mb-1 block text-sm font-medium", children: "المبرر / تفاصيل" }),
        /* @__PURE__ */ jsx("textarea", { id: "absence-justification", name: "justification", rows: 3, value: form.justification, onChange: (e) => setForm({
          ...form,
          justification: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsx("button", { disabled: busy, className: "rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground disabled:opacity-50", children: busy ? "..." : "حفظ" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-2xl border bg-card", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxs("tr", { children: [
        isAdmin && /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "الأستاذ" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "من" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "إلى" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "السبب" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "المبرر" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-right", children: "الحالة" }),
        /* @__PURE__ */ jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        items.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "p-6 text-center text-muted-foreground", children: "لا توجد سجلات" }) }),
        items.map((a) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
          isAdmin && /* @__PURE__ */ jsx("td", { className: "p-3", children: teachers[a.teacher_id]?.full_name || teachers[a.teacher_id]?.email || "—" }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: a.absence_date }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: a.end_date || "—" }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: a.reason }),
          /* @__PURE__ */ jsx("td", { className: "p-3 max-w-xs whitespace-pre-wrap", children: a.justification || "—" }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: statusBadge(a.status) }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1", children: [
            isAdmin && a.status === "pending" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStatus(a.id, "approved"), className: "rounded p-1 text-emerald-600 hover:bg-emerald-50", "aria-label": "قبول", title: "قبول", children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStatus(a.id, "rejected"), className: "rounded p-1 text-rose-600 hover:bg-rose-50", "aria-label": "رفض", title: "رفض", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
            ] }),
            isAdmin && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => remove(a.id), className: "rounded p-1 text-rose-600 hover:bg-rose-50", "aria-label": "حذف الغياب", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, a.id))
      ] })
    ] }) })
  ] });
}
export {
  TeacherAbsencesPage as component
};
