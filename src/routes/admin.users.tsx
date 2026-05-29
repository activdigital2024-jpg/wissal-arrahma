import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { toast } from "sonner";
import { Plus, Trash2, UserCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth.hook";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

type AppRoleVal = "admin" | "secretary" | "teacher";
type UserRoleRaw = { user_id: string; role: string };
type UserRole = { user_id: string; role: AppRoleVal };
type Profile = { id: string; email: string; full_name: string | null };
type ApiResponse = { error?: string | null };
type ProfileRaw = { id: string; email: string; full_name: string | null };

const ROLE_LABELS: Record<AppRoleVal, string> = {
  admin: "مسؤول",
  secretary: "سكرتير",
  teacher: "أستاذ",
};

type Row = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: AppRoleVal;
};

function UsersPage() {
  const { user: me, isAdmin, loading } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "secretary" as AppRoleVal,
  });

  const load = async () => {
    const { data: roles, error } = await supabase.from("user_roles").select("user_id, role");
    if (error) return toast.error(error.message);
    const filtered = ((roles as UserRoleRaw[] | null) ?? []).filter(
      (r: UserRoleRaw) => (r.role as string) !== "user",
    );
    const ids = [...new Set(filtered.map((r: UserRoleRaw) => r.user_id))];

    if (ids.length === 0) return setRows([]);
    const { data: profs } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in("id", ids);
    const map = new Map(
      ((profs as Array<{ id: string; email: string | null; full_name: string | null }>) || []).map(
        (p) => [p.id, p as ProfileRaw],
      ),
    );

    setRows(
      (filtered as UserRoleRaw[]).map((r) => ({
        user_id: r.user_id,
        role: r.role as AppRoleVal,
        email: map.get(r.user_id)?.email || "",
        full_name: map.get(r.user_id)?.full_name || "",
      })),
    );
  };

  useEffect(() => {
    load();
  }, []);

  if (!loading && !isAdmin) return <Navigate to="/admin" />;

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "create", ...form },
    });
    setBusy(false);
    const response = data as ApiResponse | null;
    if (error || response?.error) return toast.error(response?.error || error?.message || "خطأ");
    toast.success("تم إنشاء الحساب");
    setOpen(false);
    setForm({ email: "", password: "", full_name: "", role: "secretary" });
    load();
  };

  const setRole = async (user_id: string, role: AppRoleVal) => {
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "set_role", user_id, role },
    });
    const response = data as ApiResponse | null;
    if (error || response?.error) return toast.error(response?.error || error?.message);
    toast.success("تم تحديث الدور");
    load();
  };

  const remove = async (user_id: string) => {
    if (!confirm("حذف هذا الحساب نهائياً؟")) return;
    const { data, error } = await supabase.functions.invoke("admin-users", {
      body: { action: "delete", user_id },
    });
    const response = data as ApiResponse | null;
    if (error || response?.error) return toast.error(response?.error || error?.message);
    toast.success("تم الحذف");
    load();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">المستخدمون</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> حساب جديد
        </button>
      </div>

      <div className="overflow-auto rounded-2xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-right">
            <tr>
              <th className="p-3">الاسم</th>
              <th className="p-3">البريد</th>
              <th className="p-3">الدور</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.user_id} className="border-t">
                <td className="p-3 font-medium">{r.full_name || "-"}</td>
                <td className="p-3" dir="ltr">
                  {r.email}
                </td>
                <td className="p-3">
                  <select
                    aria-label={`تغيير دور ${r.full_name}`}
                    title={`تغيير دور ${r.full_name}`}
                    value={r.role}
                    disabled={r.user_id === me?.id}
                    onChange={(e) => setRole(r.user_id, e.target.value as AppRoleVal)}
                    className="rounded border bg-background px-2 py-1 text-sm disabled:opacity-50"
                  >
                    <option value="admin">مسؤول</option>
                    <option value="secretary">سكرتير</option>
                    <option value="teacher">أستاذ</option>
                  </select>
                  {ROLE_LABELS && null}
                </td>
                <td className="p-3">
                  <button
                    disabled={r.user_id === me?.id}
                    onClick={() => remove(r.user_id)}
                    className="rounded p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-30"
                    title={r.user_id === me?.id ? "لا يمكنك حذف نفسك" : "حذف"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  لا يوجد مستخدمون
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={create}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md space-y-4 rounded-2xl bg-card p-6"
          >
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <UserCog className="h-5 w-5" /> إنشاء حساب
            </h2>
            <div>
              <label htmlFor="user-full-name" className="mb-1 block text-sm font-medium">
                الاسم الكامل
              </label>
              <input
                id="user-full-name"
                name="full_name"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="user-email" className="mb-1 block text-sm font-medium">
                البريد الإلكتروني *
              </label>
              <input
                id="user-email"
                name="email"
                type="email"
                required
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input text-left"
              />
            </div>
            <div>
              <label htmlFor="user-password" className="mb-1 block text-sm font-medium">
                كلمة المرور *
              </label>
              <input
                id="user-password"
                name="password"
                type="text"
                required
                minLength={6}
                dir="ltr"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input text-left"
              />
            </div>
            <div>
              <label htmlFor="user-role" className="mb-1 block text-sm font-medium">
                الدور
              </label>
              <select
                id="user-role"
                name="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as AppRoleVal })}
                className="input"
              >
                <option value="secretary">سكرتير (تعديل، بدون حذف)</option>
                <option value="teacher">أستاذ (طلابه فقط)</option>
                <option value="admin">مسؤول (كامل الصلاحيات)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-4 py-2"
              >
                إلغاء
              </button>
              <button
                disabled={busy}
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
              >
                {busy ? "..." : "إنشاء"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
