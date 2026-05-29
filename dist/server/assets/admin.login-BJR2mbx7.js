import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { toast } from "sonner";
import { l as logo } from "./logo-BEdXg2sE.js";
function LoginPage() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!loading && user) navigate({
      to: "/admin"
    });
  }, [user, loading, navigate]);
  const handle = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success("تم تسجيل الدخول");
        navigate({
          to: "/admin"
        });
      } else {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              full_name: fullName
            }
          }
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب. الرجاء طلب صلاحية المسؤول.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "حدث خطأ";
      toast.error(errorMessage);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-2xl border bg-card p-8 shadow-elegant", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: "الشعار", className: "h-16 w-16 rounded-full ring-2 ring-primary/20" }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "لوحة الإدارة" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "جمعية وصال الرحمة" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handle, className: "space-y-4", children: [
      mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "full-name", className: "mb-1 block text-sm font-medium", children: "الاسم الكامل" }),
        /* @__PURE__ */ jsx("input", { id: "full-name", name: "full_name", value: fullName, onChange: (e) => setFullName(e.target.value), required: true, className: "w-full rounded-lg border bg-background px-3 py-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "login-email", className: "mb-1 block text-sm font-medium", children: "البريد الإلكتروني" }),
        /* @__PURE__ */ jsx("input", { id: "login-email", name: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, dir: "ltr", className: "w-full rounded-lg border bg-background px-3 py-2 text-left" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "login-password", className: "mb-1 block text-sm font-medium", children: "كلمة المرور" }),
        /* @__PURE__ */ jsx("input", { id: "login-password", name: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, dir: "ltr", className: "w-full rounded-lg border bg-background px-3 py-2 text-left" })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: busy, className: "w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: busy ? "..." : mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب" })
    ] }),
    /* @__PURE__ */ jsx("button", { onClick: () => setMode(mode === "login" ? "signup" : "login"), className: "mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground", children: mode === "login" ? "لا تملك حساباً؟ إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 border-t pt-4 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-sm text-primary hover:underline", children: "← العودة للموقع" }) })
  ] }) });
}
export {
  LoginPage as component
};
