import { jsx, jsxs } from "react/jsx-runtime";
import { Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { toast } from "sonner";
import { Plus, Trash2, UserCog } from "lucide-react";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
const ROLE_LABELS = {
  admin: "مسؤول",
  secretary: "سكرتير",
  teacher: "أستاذ"
};
function UsersPage() {
  const {
    user: me,
    isAdmin,
    loading
  } = useAuth();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "secretary"
  });
  const load = async () => {
    const {
      data: roles,
      error
    } = await supabase.from("user_roles").select("user_id, role");
    if (error) return toast.error(error.message);
    const filtered = (roles ?? []).filter((r) => r.role !== "user");
    const ids = [...new Set(filtered.map((r) => r.user_id))];
    if (ids.length === 0) return setRows([]);
    const {
      data: profs
    } = await supabase.from("profiles").select("id, email, full_name").in("id", ids);
    const map = new Map((profs || []).map((p) => [p.id, p]));
    setRows(filtered.map((r) => ({
      user_id: r.user_id,
      role: r.role,
      email: map.get(r.user_id)?.email || "",
      full_name: map.get(r.user_id)?.full_name || ""
    })));
  };
  useEffect(() => {
    load();
  }, []);
  if (!loading && !isAdmin) return /* @__PURE__ */ jsx(Navigate, { to: "/admin" });
  const create = async (e) => {
    e.preventDefault();
    setBusy(true);
    const {
      data,
      error
    } = await supabase.functions.invoke("admin-users", {
      body: {
        action: "create",
        ...form
      }
    });
    setBusy(false);
    const response = data;
    if (error || response?.error) return toast.error(response?.error || error?.message || "خطأ");
    toast.success("تم إنشاء الحساب");
    setOpen(false);
    setForm({
      email: "",
      password: "",
      full_name: "",
      role: "secretary"
    });
    load();
  };
  const setRole = async (user_id, role) => {
    const {
      data,
      error
    } = await supabase.functions.invoke("admin-users", {
      body: {
        action: "set_role",
        user_id,
        role
      }
    });
    const response = data;
    if (error || response?.error) return toast.error(response?.error || error?.message);
    toast.success("تم تحديث الدور");
    load();
  };
  const remove = async (user_id) => {
    if (!confirm("حذف هذا الحساب نهائياً؟")) return;
    const {
      data,
      error
    } = await supabase.functions.invoke("admin-users", {
      body: {
        action: "delete",
        user_id
      }
    });
    const response = data;
    if (error || response?.error) return toast.error(response?.error || error?.message);
    toast.success("تم الحذف");
    load();
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "المستخدمون" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setOpen(true), className: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " حساب جديد"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-auto rounded-2xl border bg-card", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-muted/50 text-right", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الاسم" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "البريد" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "الدور" }),
        /* @__PURE__ */ jsx("th", { className: "p-3", children: "إجراءات" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        rows.map((r) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsx("td", { className: "p-3 font-medium", children: r.full_name || "-" }),
          /* @__PURE__ */ jsx("td", { className: "p-3", dir: "ltr", children: r.email }),
          /* @__PURE__ */ jsxs("td", { className: "p-3", children: [
            /* @__PURE__ */ jsxs("select", { "aria-label": `تغيير دور ${r.full_name}`, title: `تغيير دور ${r.full_name}`, value: r.role, disabled: r.user_id === me?.id, onChange: (e) => setRole(r.user_id, e.target.value), className: "rounded border bg-background px-2 py-1 text-sm disabled:opacity-50", children: [
              /* @__PURE__ */ jsx("option", { value: "admin", children: "مسؤول" }),
              /* @__PURE__ */ jsx("option", { value: "secretary", children: "سكرتير" }),
              /* @__PURE__ */ jsx("option", { value: "teacher", children: "أستاذ" })
            ] }),
            ROLE_LABELS && null
          ] }),
          /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx("button", { disabled: r.user_id === me?.id, onClick: () => remove(r.user_id), className: "rounded p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-30", title: r.user_id === me?.id ? "لا يمكنك حذف نفسك" : "حذف", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) }) })
        ] }, r.user_id)),
        rows.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "p-6 text-center text-muted-foreground", children: "لا يوجد مستخدمون" }) })
      ] })
    ] }) }),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: create, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md space-y-4 rounded-2xl bg-card p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 text-xl font-bold", children: [
        /* @__PURE__ */ jsx(UserCog, { className: "h-5 w-5" }),
        " إنشاء حساب"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "user-full-name", className: "mb-1 block text-sm font-medium", children: "الاسم الكامل" }),
        /* @__PURE__ */ jsx("input", { id: "user-full-name", name: "full_name", value: form.full_name, onChange: (e) => setForm({
          ...form,
          full_name: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "user-email", className: "mb-1 block text-sm font-medium", children: "البريد الإلكتروني *" }),
        /* @__PURE__ */ jsx("input", { id: "user-email", name: "email", type: "email", required: true, dir: "ltr", value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), className: "input text-left" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "user-password", className: "mb-1 block text-sm font-medium", children: "كلمة المرور *" }),
        /* @__PURE__ */ jsx("input", { id: "user-password", name: "password", type: "text", required: true, minLength: 6, dir: "ltr", value: form.password, onChange: (e) => setForm({
          ...form,
          password: e.target.value
        }), className: "input text-left" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "user-role", className: "mb-1 block text-sm font-medium", children: "الدور" }),
        /* @__PURE__ */ jsxs("select", { id: "user-role", name: "role", value: form.role, onChange: (e) => setForm({
          ...form,
          role: e.target.value
        }), className: "input", children: [
          /* @__PURE__ */ jsx("option", { value: "secretary", children: "سكرتير (تعديل، بدون حذف)" }),
          /* @__PURE__ */ jsx("option", { value: "teacher", children: "أستاذ (طلابه فقط)" }),
          /* @__PURE__ */ jsx("option", { value: "admin", children: "مسؤول (كامل الصلاحيات)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setOpen(false), className: "rounded-lg border px-4 py-2", children: "إلغاء" }),
        /* @__PURE__ */ jsx("button", { disabled: busy, type: "submit", className: "rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50", children: busy ? "..." : "إنشاء" })
      ] })
    ] }) })
  ] });
}
export {
  UsersPage as component
};
