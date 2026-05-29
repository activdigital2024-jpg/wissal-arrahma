import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth.hook";

export const Route = createFileRoute("/admin/students")({
  component: StudentsPage,
});

type Student = {
  id: string;
  full_name: string;
  birth_date: string | null;
  gender: string | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  address: string | null;
  email: string | null;
  parent_email: string | null;
  health_notes: string | null;
  enrollment_date: string;
  status: string;
  monthly_fee: number | null;
  teacher_id: string | null;
};

type TeacherOpt = { user_id: string; name: string };
type UserRole = { user_id: string };
type Profile = { id: string; full_name: string | null; email: string | null };

const empty: Partial<Student> = {
  full_name: "",
  birth_date: "",
  gender: "ذكر",
  guardian_name: "",
  guardian_phone: "",
  address: "",
  email: "",
  parent_email: "",
  health_notes: "",
  enrollment_date: new Date().toISOString().slice(0, 10),
  status: "active",
  monthly_fee: null,
  teacher_id: null,
};

function StudentsPage() {
  const { isAdmin } = useAuth();
  const [list, setList] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<TeacherOpt[]>([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Student>>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setList(data as Student[]);
  };

  const loadTeachers = async () => {
    const { data: rolesRaw } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "teacher");

    const roles = (rolesRaw || []) as UserRole[];
    const ids = roles.map((r) => r.user_id);
    if (ids.length === 0) return setTeachers([]);

    const { data: profsRaw } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", ids);

    const profs = (profsRaw || []) as Profile[];
    setTeachers(
      profs.map((p) => ({
        user_id: p.id,
        name: p.full_name || p.email || p.id.slice(0, 8),
      })),
    );
  };

  useEffect(() => {
    load();
    if (isAdmin) loadTeachers();
  }, [isAdmin]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      birth_date: form.birth_date || null,
      teacher_id: form.teacher_id || null,
      parent_email: form.parent_email || null,
      monthly_fee: form.monthly_fee ? Number(form.monthly_fee) : null,
    };

    const { error } = editingId
      ? await supabase.from("students").update(payload).eq("id", editingId)
      : await supabase.from("students").insert(payload as never);

    if (error) return toast.error(error.message);

    toast.success(editingId ? "تم التعديل" : "تمت الإضافة");
    setOpen(false);
    setEditingId(null);
    setForm(empty);
    load();
  };

  const edit = (s: Student) => {
    setForm(s);
    setEditingId(s.id);
    setOpen(true);
  };

  const del = async (id: string) => {
    if (!confirm("هل أنت متأكد من الحذف؟ ستُحذف كل المدفوعات المرتبطة.")) return;
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };

  const filtered = list.filter((s) =>
    [s.full_name, s.guardian_name, s.guardian_phone].some((v) =>
      (v || "").toLowerCase().includes(q.toLowerCase()),
    ),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">الطلاب</h1>
        <button
          onClick={() => {
            setForm(empty);
            setEditingId(null);
            setOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> إضافة طالب
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="بحث بالاسم أو هاتف ولي الأمر..."
          className="w-full bg-transparent outline-none"
          aria-label="بحث عن الطلاب"
        />
      </div>

      <div className="overflow-auto rounded-2xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-right">
            <tr>
              <th className="p-3">الاسم</th>
              <th className="p-3">ولي الأمر</th>
              <th className="p-3">الهاتف</th>
              <th className="p-3">الالتحاق</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-muted/30">
                <td className="p-3 font-medium">{s.full_name}</td>
                <td className="p-3">{s.guardian_name || "-"}</td>
                <td className="p-3" dir="ltr">
                  {s.guardian_phone || "-"}
                </td>
                <td className="p-3">{s.enrollment_date}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      s.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => edit(s)}
                      className="rounded p-1.5 hover:bg-accent"
                      aria-label={`تعديل الطالب ${s.full_name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => del(s.id)}
                        className="rounded p-1.5 text-destructive hover:bg-destructive/10"
                        aria-label={`حذف الطالب ${s.full_name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  لا يوجد طلاب
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
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-card p-6"
          >
            <h2 className="mb-4 text-xl font-bold">
              {editingId ? "تعديل بيانات الطالب" : "إضافة طالب"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="الاسم الكامل *" id="student-full_name">
                <input
                  required
                  id="student-full_name"
                  value={form.full_name || ""}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="input"
                  title="الاسم الكامل"
                  placeholder="أدخل اسم الطالب"
                />
              </Field>

              <Field label="تاريخ الميلاد" id="student-birth_date">
                <input
                  id="student-birth_date"
                  type="date"
                  value={form.birth_date || ""}
                  onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
                  className="input"
                  title="تاريخ الميلاد"
                />
              </Field>

              <Field label="الجنس" id="student-gender">
                <select
                  id="student-gender"
                  value={form.gender || ""}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="input"
                  title="الجنس"
                >
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </Field>

              <Field label="ولي الأمر" id="student-guardian_name">
                <input
                  id="student-guardian_name"
                  value={form.guardian_name || ""}
                  onChange={(e) => setForm({ ...form, guardian_name: e.target.value })}
                  className="input"
                  title="ولي الأمر"
                  placeholder="اسم ولي الأمر"
                />
              </Field>

              <Field label="هاتف ولي الأمر" id="student-guardian_phone">
                <input
                  id="student-guardian_phone"
                  dir="ltr"
                  value={form.guardian_phone || ""}
                  onChange={(e) => setForm({ ...form, guardian_phone: e.target.value })}
                  className="input"
                  title="هاتف ولي الأمر"
                  placeholder="رقم الهاتف"
                />
              </Field>

              <Field label="البريد الإلكتروني (للطفل)" id="student-email">
                <input
                  id="student-email"
                  type="email"
                  dir="ltr"
                  value={form.email || ""}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  title="البريد الإلكتروني (للطفل)"
                  placeholder="email@example.com"
                />
              </Field>

              <Field label="بريد ولي الأمر (لإرسال التقييم)" id="student-parent_email">
                <input
                  id="student-parent_email"
                  type="email"
                  dir="ltr"
                  value={form.parent_email || ""}
                  onChange={(e) => setForm({ ...form, parent_email: e.target.value })}
                  className="input"
                  title="بريد ولي الأمر (لإرسال التقييم)"
                  placeholder="email@example.com"
                />
              </Field>

              {isAdmin && (
                <Field label="الأستاذ المسؤول" id="student-teacher_id">
                  <select
                    id="student-teacher_id"
                    value={form.teacher_id || ""}
                    onChange={(e) => setForm({ ...form, teacher_id: e.target.value || null })}
                    className="input"
                    title="الأستاذ المسؤول"
                  >
                    <option value="">— بدون —</option>
                    {teachers.map((t) => (
                      <option key={t.user_id} value={t.user_id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </Field>
              )}

              <Field label="العنوان" full id="student-address">
                <input
                  id="student-address"
                  value={form.address || ""}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="input"
                  title="العنوان"
                  placeholder="عنوان السكن"
                />
              </Field>

              <Field label="ملاحظات صحية" full id="student-health_notes">
                <textarea
                  id="student-health_notes"
                  value={form.health_notes || ""}
                  onChange={(e) => setForm({ ...form, health_notes: e.target.value })}
                  className="input min-h-20"
                  title="ملاحظات صحية"
                  placeholder="ملاحظات صحية..."
                />
              </Field>

              <Field label="تاريخ الالتحاق" id="student-enrollment_date">
                <input
                  id="student-enrollment_date"
                  type="date"
                  value={form.enrollment_date || ""}
                  onChange={(e) => setForm({ ...form, enrollment_date: e.target.value })}
                  className="input"
                  title="تاريخ الالتحاق"
                />
              </Field>

              <Field label="الحالة" id="student-status">
                <select
                  id="student-status"
                  value={form.status || "active"}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="input"
                  title="الحالة"
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </Field>

              <Field label="رسوم خاصة (اختياري)" id="student-monthly_fee">
                <input
                  id="student-monthly_fee"
                  type="number"
                  step="0.01"
                  value={form.monthly_fee ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      monthly_fee: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  placeholder="استخدام الرسوم الافتراضية"
                  className="input"
                  title="رسوم خاصة (اختياري)"
                />
              </Field>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-4 py-2"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
              >
                {editingId ? "حفظ التعديلات" : "إضافة"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  id,
  children,
  full,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
