import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import "@tanstack/react-router";
const empty = {
  full_name: "",
  birth_date: "",
  gender: "ذكر",
  guardian_name: "",
  guardian_phone: "",
  address: "",
  email: "",
  parent_email: "",
  health_notes: "",
  enrollment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  status: "active",
  monthly_fee: null,
  teacher_id: null
};
function StudentsPage() {
  const {
    isAdmin
  } = useAuth();
  const [list, setList] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const load = async () => {
    const {
      data,
      error
    } = await supabase.from("students").select("*").order("created_at", {
      ascending: false
    });
    if (error) toast.error(error.message);
    else setList(data);
  };
  const loadTeachers = async () => {
    const {
      data: rolesRaw
    } = await supabase.from("user_roles").select("user_id").eq("role", "teacher");
    const roles = rolesRaw || [];
    const ids = roles.map((r) => r.user_id);
    if (ids.length === 0) return setTeachers([]);
    const {
      data: profsRaw
    } = await supabase.from("profiles").select("id, full_name, email").in("id", ids);
    const profs = profsRaw || [];
    setTeachers(profs.map((p) => ({
      user_id: p.id,
      name: p.full_name || p.email || p.id.slice(0, 8)
    })));
  };
  useEffect(() => {
    load();
    if (isAdmin) loadTeachers();
  }, [isAdmin]);
  const save = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      birth_date: form.birth_date || null,
      teacher_id: form.teacher_id || null,
      parent_email: form.parent_email || null,
      monthly_fee: form.monthly_fee ? Number(form.monthly_fee) : null
    };
    const {
      error
    } = editingId ? await supabase.from("students").update(payload).eq("id", editingId) : await supabase.from("students").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editingId ? "تم التعديل" : "تمت الإضافة");
    setOpen(false);
    setEditingId(null);
    setForm(empty);
    load();
  };
  const edit = (s) => {
    setForm(s);
    setEditingId(s.id);
    setOpen(true);
  };
  const del = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟ ستُحذف كل المدفوعات المرتبطة.")) return;
    const {
      error
    } = await supabase.from("students").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };
  const filtered = list.filter((s) => [s.full_name, s.guardian_name, s.guardian_phone].some((v) => (v || "").toLowerCase().includes(q.toLowerCase())));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "الطلاب" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => {
        setForm(empty);
        setEditingId(null);
        setOpen(true);
      }, className: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " إضافة طالب"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-2", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "بحث بالاسم أو هاتف ولي الأمر...", className: "w-full bg-transparent outline-none", "aria-label": "بحث عن الطلاب" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-auto rounded-2xl border bg-card", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-right", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الاسم" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "ولي الأمر" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الهاتف" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الالتحاق" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الحالة" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "إجراءات" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        filtered.map((s) => /* @__PURE__ */ jsxs("tr", { className: "border-t hover:bg-muted/30", children: [
          /* @__PURE__ */ jsx("td", { className: "p-3 font-medium", children: s.full_name }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: s.guardian_name || "-" }),
          /* @__PURE__ */ jsx("td", { className: "p-3", dir: "ltr", children: s.guardian_phone || "-" }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: s.enrollment_date }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("span", { className: `rounded-full px-2 py-1 text-xs ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`, children: s.status === "active" ? "نشط" : "غير نشط" }) }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("button", { type: "button", onClick: () => edit(s), className: "rounded p-1.5 hover:bg-accent", "aria-label": `تعديل الطالب ${s.full_name}`, children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
            isAdmin && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => del(s.id), className: "rounded p-1.5 text-destructive hover:bg-destructive/10", "aria-label": `حذف الطالب ${s.full_name}`, children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }) })
        ] }, s.id)),
        filtered.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 6, className: "p-6 text-center text-muted-foreground", children: "لا يوجد طلاب" }) })
      ] })
    ] }) }),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: save, onClick: (e) => e.stopPropagation(), className: "max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-card p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-bold", children: editingId ? "تعديل بيانات الطالب" : "إضافة طالب" }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(Field, { label: "الاسم الكامل *", id: "student-full_name", children: /* @__PURE__ */ jsx("input", { required: true, id: "student-full_name", value: form.full_name || "", onChange: (e) => setForm({
          ...form,
          full_name: e.target.value
        }), className: "input", title: "الاسم الكامل", placeholder: "أدخل اسم الطالب" }) }),
        /* @__PURE__ */ jsx(Field, { label: "تاريخ الميلاد", id: "student-birth_date", children: /* @__PURE__ */ jsx("input", { id: "student-birth_date", type: "date", value: form.birth_date || "", onChange: (e) => setForm({
          ...form,
          birth_date: e.target.value
        }), className: "input", title: "تاريخ الميلاد" }) }),
        /* @__PURE__ */ jsx(Field, { label: "الجنس", id: "student-gender", children: /* @__PURE__ */ jsxs("select", { id: "student-gender", value: form.gender || "", onChange: (e) => setForm({
          ...form,
          gender: e.target.value
        }), className: "input", title: "الجنس", children: [
          /* @__PURE__ */ jsx("option", { value: "ذكر", children: "ذكر" }),
          /* @__PURE__ */ jsx("option", { value: "أنثى", children: "أنثى" })
        ] }) }),
        /* @__PURE__ */ jsx(Field, { label: "ولي الأمر", id: "student-guardian_name", children: /* @__PURE__ */ jsx("input", { id: "student-guardian_name", value: form.guardian_name || "", onChange: (e) => setForm({
          ...form,
          guardian_name: e.target.value
        }), className: "input", title: "ولي الأمر", placeholder: "اسم ولي الأمر" }) }),
        /* @__PURE__ */ jsx(Field, { label: "هاتف ولي الأمر", id: "student-guardian_phone", children: /* @__PURE__ */ jsx("input", { id: "student-guardian_phone", dir: "ltr", value: form.guardian_phone || "", onChange: (e) => setForm({
          ...form,
          guardian_phone: e.target.value
        }), className: "input", title: "هاتف ولي الأمر", placeholder: "رقم الهاتف" }) }),
        /* @__PURE__ */ jsx(Field, { label: "البريد الإلكتروني (للطفل)", id: "student-email", children: /* @__PURE__ */ jsx("input", { id: "student-email", type: "email", dir: "ltr", value: form.email || "", onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), className: "input", title: "البريد الإلكتروني (للطفل)", placeholder: "email@example.com" }) }),
        /* @__PURE__ */ jsx(Field, { label: "بريد ولي الأمر (لإرسال التقييم)", id: "student-parent_email", children: /* @__PURE__ */ jsx("input", { id: "student-parent_email", type: "email", dir: "ltr", value: form.parent_email || "", onChange: (e) => setForm({
          ...form,
          parent_email: e.target.value
        }), className: "input", title: "بريد ولي الأمر (لإرسال التقييم)", placeholder: "email@example.com" }) }),
        isAdmin && /* @__PURE__ */ jsx(Field, { label: "الأستاذ المسؤول", id: "student-teacher_id", children: /* @__PURE__ */ jsxs("select", { id: "student-teacher_id", value: form.teacher_id || "", onChange: (e) => setForm({
          ...form,
          teacher_id: e.target.value || null
        }), className: "input", title: "الأستاذ المسؤول", children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "— بدون —" }),
          teachers.map((t) => /* @__PURE__ */ jsx("option", { value: t.user_id, children: t.name }, t.user_id))
        ] }) }),
        /* @__PURE__ */ jsx(Field, { label: "العنوان", full: true, id: "student-address", children: /* @__PURE__ */ jsx("input", { id: "student-address", value: form.address || "", onChange: (e) => setForm({
          ...form,
          address: e.target.value
        }), className: "input", title: "العنوان", placeholder: "عنوان السكن" }) }),
        /* @__PURE__ */ jsx(Field, { label: "ملاحظات صحية", full: true, id: "student-health_notes", children: /* @__PURE__ */ jsx("textarea", { id: "student-health_notes", value: form.health_notes || "", onChange: (e) => setForm({
          ...form,
          health_notes: e.target.value
        }), className: "input min-h-20", title: "ملاحظات صحية", placeholder: "ملاحظات صحية..." }) }),
        /* @__PURE__ */ jsx(Field, { label: "تاريخ الالتحاق", id: "student-enrollment_date", children: /* @__PURE__ */ jsx("input", { id: "student-enrollment_date", type: "date", value: form.enrollment_date || "", onChange: (e) => setForm({
          ...form,
          enrollment_date: e.target.value
        }), className: "input", title: "تاريخ الالتحاق" }) }),
        /* @__PURE__ */ jsx(Field, { label: "الحالة", id: "student-status", children: /* @__PURE__ */ jsxs("select", { id: "student-status", value: form.status || "active", onChange: (e) => setForm({
          ...form,
          status: e.target.value
        }), className: "input", title: "الحالة", children: [
          /* @__PURE__ */ jsx("option", { value: "active", children: "نشط" }),
          /* @__PURE__ */ jsx("option", { value: "inactive", children: "غير نشط" })
        ] }) }),
        /* @__PURE__ */ jsx(Field, { label: "رسوم خاصة (اختياري)", id: "student-monthly_fee", children: /* @__PURE__ */ jsx("input", { id: "student-monthly_fee", type: "number", step: "0.01", value: form.monthly_fee ?? "", onChange: (e) => setForm({
          ...form,
          monthly_fee: e.target.value ? Number(e.target.value) : null
        }), placeholder: "استخدام الرسوم الافتراضية", className: "input", title: "رسوم خاصة (اختياري)" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setOpen(false), className: "rounded-lg border px-4 py-2", children: "إلغاء" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground", children: editingId ? "حفظ التعديلات" : "إضافة" })
      ] })
    ] }) })
  ] });
}
function Field({
  label,
  id,
  children,
  full
}) {
  return /* @__PURE__ */ jsxs("div", { className: full ? "sm:col-span-2" : "", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, className: "mb-1 block text-sm font-medium", children: label }),
    children
  ] });
}
export {
  StudentsPage as component
};
