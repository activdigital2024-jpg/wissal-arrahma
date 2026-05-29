import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/localdb/client";
import { useAuth } from "@/hooks/useAuth.hook";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول | لوحة الإدارة" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("تم تسجيل الدخول");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب. الرجاء طلب صلاحية المسؤول.");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "حدث خطأ";
      toast.error(errorMessage);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-elegant">
        <div className="mb-6 flex flex-col items-center gap-3">
          <img src={logo} alt="الشعار" className="h-16 w-16 rounded-full ring-2 ring-primary/20" />
          <h1 className="text-2xl font-bold">لوحة الإدارة</h1>
          <p className="text-sm text-muted-foreground">جمعية وصال الرحمة</p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="full-name" className="mb-1 block text-sm font-medium">
                الاسم الكامل
              </label>
              <input
                id="full-name"
                name="full_name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-lg border bg-background px-3 py-2"
              />
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              className="w-full rounded-lg border bg-background px-3 py-2 text-left"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
              كلمة المرور
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              dir="ltr"
              className="w-full rounded-lg border bg-background px-3 py-2 text-left"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {busy ? "..." : mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "لا تملك حساباً؟ إنشاء حساب جديد" : "لديك حساب؟ تسجيل الدخول"}
        </button>

        <div className="mt-6 border-t pt-4 text-center">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← العودة للموقع
          </Link>
        </div>
      </div>
    </div>
  );
}
