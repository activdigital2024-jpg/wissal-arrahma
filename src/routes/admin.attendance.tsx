import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth.hook";
import { Save, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/admin/attendance")({
  head: () => ({ meta: [{ title: "الحضور والغياب | لوحة الإدارة" }] }),
  component: AttendancePage,
});

type Student = { id: string; full_name: string };
type Status = "present" | "absent" | "late" | "excused";
type Row = { status: Status; reason: string; notes: string; existingId: string | null };
type AttendanceRecord = {
  id: string;
  student_id: string;
  status: Status;
  reason: string | null;
  notes: string | null;
};

const STATUS_OPTIONS: { value: Status; label: string; cls: string }[] = [
  { value: "present", label: "حاضر", cls: "bg-green-100 text-green-700" },
  { value: "absent", label: "غائب", cls: "bg-red-100 text-red-700" },
  { value: "late", label: "متأخر", cls: "bg-amber-100 text-amber-700" },
  { value: "excused", label: "مبرر", cls: "bg-blue-100 text-blue-700" },
];

function AttendancePage() {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState<Student[]>([]);
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setBusy(true);
    const { data: studs, error } = await supabase
      .from("students")
      .select("id, full_name")
      .eq("status", "active")
      .order("full_name");
    if (error) {
      toast.error(error.message);
      setBusy(false);
      return;
    }
    const list = (studs || []) as Student[];
    setStudents(list);

    const { data: existing } = await supabase
      .from("attendance")
      .select("id, student_id, status, reason, notes")
      .eq("attendance_date", date);
    const map: Record<string, Row> = {};
    list.forEach((s: Student) => {
      map[s.id] = { status: "present", reason: "", notes: "", existingId: null };
    });
    (
      (existing as Array<{
        id: string;
        student_id: string;
        status: string;
        reason?: string;
        notes?: string;
      }> | null) || []
    ).forEach((e) => {
      if (map[e.student_id]) {
        map[e.student_id] = {
          status: e.status as Status,
          reason: e.reason || "",
          notes: e.notes || "",
          existingId: e.id,
        };
      }
    });
    setRows(map);
    setBusy(false);
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const update = (sid: string, patch: Partial<Row>) =>
    setRows((r) => ({ ...r, [sid]: { ...r[sid], ...patch } }));

  const saveAll = async () => {
    setSaving(true);
    const payload = students.map((s) => ({
      id: rows[s.id]?.existingId ?? undefined,
      student_id: s.id,
      attendance_date: date,
      status: rows[s.id]?.status || "present",
      reason: rows[s.id]?.reason || null,
      notes: rows[s.id]?.notes || null,
      created_by: user?.id,
    }));
    const { error } = await supabase
      .from("attendance")
      .upsert(payload, { onConflict: "student_id,attendance_date" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("تم حفظ الحضور");
    loadAll();
  };

  const summary = useMemo(() => {
    const counts: Record<Status, number> = { present: 0, absent: 0, late: 0, excused: 0 };
    Object.values(rows).forEach((r) => counts[r.status]++);
    return counts;
  }, [rows]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">الحضور والغياب</h1>
          <p className="mt-1 text-sm text-muted-foreground">سجّل حضور الأطفال يومياً</p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div>
            <label
              htmlFor="attendance-date"
              className="mb-1 flex items-center gap-1 text-xs text-muted-foreground"
            >
              <CalendarDays className="h-3.5 w-3.5" /> التاريخ
            </label>
            <input
              id="attendance-date"
              name="attendance_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input max-w-xs"
            />
          </div>
          <button
            disabled={saving || busy || students.length === 0}
            onClick={saveAll}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "..." : "حفظ"}
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STATUS_OPTIONS.map((o) => (
          <div key={o.value} className={`rounded-xl border p-3 text-center ${o.cls}`}>
            <div className="text-xs">{o.label}</div>
            <div className="text-2xl font-bold">{summary[o.value]}</div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-right">
            <tr>
              <th className="p-3">الطفل</th>
              <th className="p-3">الحالة</th>
              <th className="p-3">السبب</th>
              <th className="p-3">ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            {busy ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  جارٍ التحميل...
                </td>
              </tr>
            ) : students.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  لا يوجد طلاب
                </td>
              </tr>
            ) : (
              students.map((s) => {
                const r = rows[s.id];
                if (!r) return null;
                const showReason = r.status !== "present";
                return (
                  <tr key={s.id} className="border-t">
                    <td className="p-3 font-medium">{s.full_name}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {STATUS_OPTIONS.map((o) => (
                          <button
                            key={o.value}
                            type="button"
                            aria-label={`تحديد الحالة: ${o.label} للطالب ${s.full_name}`}
                            onClick={() => update(s.id, { status: o.value })}
                            className={`rounded-full px-3 py-1 text-xs ${
                              r.status === o.value
                                ? o.cls + " ring-2 ring-offset-1 ring-foreground/20"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        disabled={!showReason}
                        value={r.reason}
                        onChange={(e) => update(s.id, { reason: e.target.value })}
                        placeholder={showReason ? "سبب الغياب..." : "—"}
                        title="سبب الغياب"
                        aria-label={`سبب الغياب للطالب ${s.full_name}`}
                        className="input max-w-50 disabled:opacity-50"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        value={r.notes}
                        onChange={(e) => update(s.id, { notes: e.target.value })}
                        placeholder="ملاحظات..."
                        title="ملاحظات الطالب"
                        aria-label={`ملاحظات الطالب ${s.full_name}`}
                        className="input max-w-50"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
