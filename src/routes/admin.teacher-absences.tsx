import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { useAuth } from "@/hooks/useAuth.hook";
import { toast } from "sonner";
import { Plus, Check, X, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/teacher-absences")({
  component: TeacherAbsencesPage,
});

type Absence = {
  id: string;
  teacher_id: string;
  absence_date: string;
  end_date: string | null;
  reason: string;
  justification: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type Teacher = { id: string; full_name: string | null; email: string | null };
type UserRole = { user_id: string };
type Profile = { id: string; full_name: string | null; email: string | null };

function TeacherAbsencesPage() {
  const { user, isAdmin, isTeacher } = useAuth();
  const [items, setItems] = useState<Absence[]>([]);
  const [teachers, setTeachers] = useState<Record<string, Teacher>>({});
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    teacher_id: "",
    absence_date: new Date().toISOString().slice(0, 10),
    end_date: "",
    reason: "",
    justification: "",
  });

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("teacher_absences")
      .select("*")
      .order("absence_date", { ascending: false });
    setItems((data || []) as Absence[]);

    if (isAdmin) {
      const { data: rolesRaw } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "teacher");
      const roles = (rolesRaw || []) as UserRole[];
      const ids = roles.map((r) => r.user_id);
      if (ids.length) {
        const { data: profsRaw } = await supabase
          .from("profiles")
          .select("id, full_name, email")
          .in("id", ids);
        const profs = (profsRaw || []) as Profile[];
        const map: Record<string, Teacher> = {};
        profs.forEach((p) => (map[p.id] = p));
        setTeachers(map);
      }
    }
  }, [isAdmin]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const teacher_id = isTeacher ? user!.id : form.teacher_id;
    if (!teacher_id) {
      toast.error("اختر الأستاذ");
      setBusy(false);
      return;
    }
    const { error } = await supabase.from("teacher_absences").insert({
      teacher_id,
      absence_date: form.absence_date,
      end_date: form.end_date || null,
      reason: form.reason,
      justification: form.justification || null,
      status: isAdmin ? "approved" : "pending",
      created_by: user!.id,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("تم الحفظ");
    setShowForm(false);
    setForm({ ...form, reason: "", justification: "", end_date: "" });
    load();
  };

  const setStatus = async (id: string, status: "approved" | "rejected") => {
    const { error } = await supabase.from("teacher_absences").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم التحديث");
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف؟")) return;
    const { error } = await supabase.from("teacher_absences").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      pending: "bg-amber-100 text-amber-700",
      approved: "bg-emerald-100 text-emerald-700",
      rejected: "bg-rose-100 text-rose-700",
    };
    const lbl: Record<string, string> = {
      pending: "قيد المراجعة",
      approved: "مقبول",
      rejected: "مرفوض",
    };
    return <span className={`rounded px-2 py-1 text-xs ${map[s]}`}>{lbl[s]}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">غياب الأساتذة</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> {showForm ? "إلغاء" : "إضافة غياب"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-2"
        >
          {isAdmin && (
            <div className="sm:col-span-2">
              <label htmlFor="absence-teacher" className="mb-1 block text-sm font-medium">
                الأستاذ
              </label>
              <select
                id="absence-teacher"
                name="teacher_id"
                required
                value={form.teacher_id}
                onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
                className="input"
              >
                <option value="">— اختر —</option>
                {Object.values(teachers).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.full_name || t.email}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label htmlFor="absence-start-date" className="mb-1 block text-sm font-medium">
              تاريخ بداية الغياب
            </label>
            <input
              id="absence-start-date"
              name="absence_date"
              type="date"
              required
              value={form.absence_date}
              onChange={(e) => setForm({ ...form, absence_date: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="absence-end-date" className="mb-1 block text-sm font-medium">
              تاريخ النهاية (اختياري)
            </label>
            <input
              id="absence-end-date"
              name="end_date"
              type="date"
              value={form.end_date}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              className="input"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="absence-reason" className="mb-1 block text-sm font-medium">
              السبب
            </label>
            <input
              id="absence-reason"
              name="reason"
              required
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="input"
              placeholder="مرض / ظرف عائلي / ..."
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="absence-justification" className="mb-1 block text-sm font-medium">
              المبرر / تفاصيل
            </label>
            <textarea
              id="absence-justification"
              name="justification"
              rows={3}
              value={form.justification}
              onChange={(e) => setForm({ ...form, justification: e.target.value })}
              className="input"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              disabled={busy}
              className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground disabled:opacity-50"
            >
              {busy ? "..." : "حفظ"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {isAdmin && <th className="p-3 text-right">الأستاذ</th>}
              <th className="p-3 text-right">من</th>
              <th className="p-3 text-right">إلى</th>
              <th className="p-3 text-right">السبب</th>
              <th className="p-3 text-right">المبرر</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  لا توجد سجلات
                </td>
              </tr>
            )}
            {items.map((a) => (
              <tr key={a.id} className="border-t">
                {isAdmin && (
                  <td className="p-3">
                    {teachers[a.teacher_id]?.full_name || teachers[a.teacher_id]?.email || "—"}
                  </td>
                )}
                <td className="p-3">{a.absence_date}</td>
                <td className="p-3">{a.end_date || "—"}</td>
                <td className="p-3">{a.reason}</td>
                <td className="p-3 max-w-xs whitespace-pre-wrap">{a.justification || "—"}</td>
                <td className="p-3">{statusBadge(a.status)}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-1">
                    {isAdmin && a.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => setStatus(a.id, "approved")}
                          className="rounded p-1 text-emerald-600 hover:bg-emerald-50"
                          aria-label="قبول"
                          title="قبول"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus(a.id, "rejected")}
                          className="rounded p-1 text-rose-600 hover:bg-rose-50"
                          aria-label="رفض"
                          title="رفض"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => remove(a.id)}
                        className="rounded p-1 text-rose-600 hover:bg-rose-50"
                        aria-label="حذف الغياب"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
