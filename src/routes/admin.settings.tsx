import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth.hook";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { isAdmin, loading } = useAuth();
  const [form, setForm] = useState({
    monthly_fee: 200,
    org_name: "",
    org_address: "",
    org_phone: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase
      .from("app_settings")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data)
          setForm({
            monthly_fee: Number((data as { monthly_fee: number }).monthly_fee),
            org_name: (data as { org_name: string }).org_name,
            org_address: (data as { org_address?: string }).org_address || "",
            org_phone: (data as { org_phone?: string }).org_phone || "",
          });
      });
  }, []);

  if (!loading && !isAdmin) return <Navigate to="/admin" />;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase
      .from("app_settings")
      .update({ ...form, monthly_fee: Number(form.monthly_fee) })
      .eq("id", 1);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("تم الحفظ");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">الإعدادات</h1>
      <form onSubmit={save} className="space-y-4 rounded-2xl border bg-card p-6">
        <div>
          <label htmlFor="settings-monthly-fee" className="mb-1 block text-sm font-medium">
            الرسوم الشهرية الافتراضية (د.م)
          </label>
          <input
            id="settings-monthly-fee"
            name="monthly_fee"
            type="number"
            step="0.01"
            required
            value={form.monthly_fee}
            onChange={(e) => setForm({ ...form, monthly_fee: Number(e.target.value) })}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="settings-org-name" className="mb-1 block text-sm font-medium">
            اسم الجمعية
          </label>
          <input
            id="settings-org-name"
            name="org_name"
            value={form.org_name}
            onChange={(e) => setForm({ ...form, org_name: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="settings-org-address" className="mb-1 block text-sm font-medium">
            العنوان
          </label>
          <input
            id="settings-org-address"
            name="org_address"
            value={form.org_address}
            onChange={(e) => setForm({ ...form, org_address: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="settings-org-phone" className="mb-1 block text-sm font-medium">
            الهاتف
          </label>
          <input
            id="settings-org-phone"
            name="org_phone"
            dir="ltr"
            value={form.org_phone}
            onChange={(e) => setForm({ ...form, org_phone: e.target.value })}
            className="input"
          />
        </div>
        <button
          disabled={busy}
          className="rounded-lg bg-primary px-5 py-2 font-medium text-primary-foreground disabled:opacity-50"
        >
          {busy ? "..." : "حفظ"}
        </button>
      </form>
    </div>
  );
}
