import { jsx, jsxs } from "react/jsx-runtime";
import { Navigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { toast } from "sonner";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
function SettingsPage() {
  const {
    isAdmin,
    loading
  } = useAuth();
  const [form, setForm] = useState({
    monthly_fee: 200,
    org_name: "",
    org_address: "",
    org_phone: ""
  });
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    supabase.from("app_settings").select("*").eq("id", 1).single().then(({
      data
    }) => {
      if (data) setForm({
        monthly_fee: Number(data.monthly_fee),
        org_name: data.org_name,
        org_address: data.org_address || "",
        org_phone: data.org_phone || ""
      });
    });
  }, []);
  if (!loading && !isAdmin) return /* @__PURE__ */ jsx(Navigate, { to: "/admin" });
  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    const {
      error
    } = await supabase.from("app_settings").update({
      ...form,
      monthly_fee: Number(form.monthly_fee)
    }).eq("id", 1);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("تم الحفظ");
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-2xl font-bold", children: "الإعدادات" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "space-y-4 rounded-2xl border bg-card p-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "settings-monthly-fee", className: "mb-1 block text-sm font-medium", children: "الرسوم الشهرية الافتراضية (د.م)" }),
        /* @__PURE__ */ jsx("input", { id: "settings-monthly-fee", name: "monthly_fee", type: "number", step: "0.01", required: true, value: form.monthly_fee, onChange: (e) => setForm({
          ...form,
          monthly_fee: Number(e.target.value)
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "settings-org-name", className: "mb-1 block text-sm font-medium", children: "اسم الجمعية" }),
        /* @__PURE__ */ jsx("input", { id: "settings-org-name", name: "org_name", value: form.org_name, onChange: (e) => setForm({
          ...form,
          org_name: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "settings-org-address", className: "mb-1 block text-sm font-medium", children: "العنوان" }),
        /* @__PURE__ */ jsx("input", { id: "settings-org-address", name: "org_address", value: form.org_address, onChange: (e) => setForm({
          ...form,
          org_address: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "settings-org-phone", className: "mb-1 block text-sm font-medium", children: "الهاتف" }),
        /* @__PURE__ */ jsx("input", { id: "settings-org-phone", name: "org_phone", dir: "ltr", value: form.org_phone, onChange: (e) => setForm({
          ...form,
          org_phone: e.target.value
        }), className: "input" })
      ] }),
      /* @__PURE__ */ jsx("button", { disabled: busy, className: "rounded-lg bg-primary px-5 py-2 font-medium text-primary-foreground disabled:opacity-50", children: busy ? "..." : "حفظ" })
    ] })
  ] });
}
export {
  SettingsPage as component
};
