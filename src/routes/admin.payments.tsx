import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { toast } from "sonner";
import { Plus, Printer, Trash2 } from "lucide-react";
import { Receipt, type ReceiptData } from "@/components/Receipt";
import { useAuth } from "@/hooks/useAuth.hook";

export const Route = createFileRoute("/admin/payments")({
  component: PaymentsPage,
});

type Student = {
  id: string;
  full_name: string;
  monthly_fee: number | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  address: string | null;
};
type Payment = {
  id: string;
  receipt_no: number;
  student_id: string;
  year: number;
  month: number;
  amount: number;
  payment_method: string;
  payment_date: string;
  notes: string | null;
};

const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "ماي",
  "يونيو",
  "يوليوز",
  "غشت",
  "شتنبر",
  "أكتوبر",
  "نونبر",
  "دجنبر",
];
const now = new Date();

function PaymentsPage() {
  const { isAdmin } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [open, setOpen] = useState(false);
  const [defaultFee, setDefaultFee] = useState(200);
  const [orgInfo, setOrgInfo] = useState({ org_name: "", org_address: "", org_phone: "" });
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [form, setForm] = useState({
    student_id: "",
    amount: "",
    payment_method: "cash",
    payment_date: new Date().toISOString().slice(0, 10),
    notes: "",
  });

  const load = useCallback(async () => {
    const [{ data: s }, { data: p }, { data: settings }] = await Promise.all([
      supabase
        .from("students")
        .select("id,full_name,monthly_fee,guardian_name,guardian_phone,address")
        .eq("status", "active")
        .order("full_name"),
      supabase
        .from("payments")
        .select("*")
        .eq("year", year)
        .eq("month", month)
        .order("payment_date", { ascending: false }),
      supabase.from("app_settings").select("*").eq("id", 1).single(),
    ]);
    setStudents((s || []) as Student[]);
    setPayments((p || []) as Payment[]);
    if (settings) {
      setDefaultFee(Number((settings as { monthly_fee: number }).monthly_fee));
      setOrgInfo({
        org_name: (settings as { org_name: string }).org_name,
        org_address: (settings as { org_address?: string }).org_address || "",
        org_phone: (settings as { org_phone?: string }).org_phone || "",
      });
    }
  }, [year, month]);

  useEffect(() => {
    load();
  }, [load]);

  const paidIds = new Set(payments.map((p: { student_id: string }) => p.student_id));
  const unpaid = students.filter((s) => !paidIds.has(s.id));

  const openAdd = (studentId?: string) => {
    const s = students.find((x) => x.id === studentId);
    setForm({
      student_id: studentId || "",
      amount: String(s?.monthly_fee ?? defaultFee),
      payment_method: "cash",
      payment_date: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    setOpen(true);
  };

  const onStudentChange = (id: string) => {
    const s = students.find((x) => x.id === id);
    setForm((f) => ({ ...f, student_id: id, amount: String(s?.monthly_fee ?? defaultFee) }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("payments")
      .insert({
        student_id: form.student_id,
        year,
        month,
        amount: Number(form.amount),
        payment_method: form.payment_method,
        payment_date: form.payment_date,
        notes: form.notes || null,
      })
      .select()
      .single();
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل الدفع");
    setOpen(false);
    await load();
    if (data) printReceipt(data as Payment);
  };

  const del = async (id: string) => {
    if (!confirm("حذف هذا الدفع؟")) return;
    const { error } = await supabase.from("payments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };

  const printReceipt = (p: Payment) => {
    const s = students.find((x) => x.id === p.student_id);
    if (!s) return toast.error("الطالب غير موجود");
    setReceipt({
      receipt_no: p.receipt_no,
      student_name: s.full_name,
      guardian_name: s.guardian_name,
      guardian_phone: s.guardian_phone,
      address: s.address,
      year: p.year,
      month: p.month,
      amount: Number(p.amount),
      payment_method: p.payment_method,
      payment_date: p.payment_date,
      notes: p.notes,
      org_name: orgInfo.org_name,
      org_address: orgInfo.org_address,
      org_phone: orgInfo.org_phone,
    });
    // Wait until the printable receipt is actually rendered, then print.
    // This avoids printing a blank page on slower machines/browsers.
    const maxWaitMs = 2000;
    const start = Date.now();

    const tryPrint = () => {
      const el = document.getElementById("receipt-print");
      if (el && el.getBoundingClientRect().width > 0) {
        window.print();
        return;
      }

      if (Date.now() - start < maxWaitMs) {
        window.setTimeout(tryPrint, 50);
        return;
      }

      // fallback: at least attempt printing
      window.print();
    };

    window.setTimeout(tryPrint, 0);
  };

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 2 + i);
  const total = payments.reduce((s, p) => s + Number(p.amount), 0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h1 className="text-2xl font-bold">المدفوعات</h1>
        <button
          onClick={() => openAdd()}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> تسجيل دفع
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 print:hidden">
        <select
          id="payments-month"
          aria-label="شهر"
          title="شهر"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="input"
        >
          {monthNames.map((m, i) => (
            <option key={i + 1} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
        <select
          id="payments-year"
          aria-label="سنة"
          title="سنة"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="input"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <div className="ms-auto rounded-lg border bg-card px-4 py-2 text-sm">
          الإيرادات: <span className="font-bold">{total.toFixed(2)} د.م</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 print:hidden">
        <div className="overflow-auto rounded-2xl border bg-card">
          <div className="border-b bg-muted/50 p-3 font-bold">المدفوعات ({payments.length})</div>
          <table className="w-full text-sm">
            <thead className="text-right text-xs text-muted-foreground">
              <tr>
                <th className="p-2">رقم</th>
                <th className="p-2">الطالب</th>
                <th className="p-2">المبلغ</th>
                <th className="p-2">التاريخ</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const s = students.find((x) => x.id === p.student_id);
                return (
                  <tr key={p.id} className="border-t">
                    <td className="p-2 font-mono">#{p.receipt_no}</td>
                    <td className="p-2">{s?.full_name || "-"}</td>
                    <td className="p-2">{Number(p.amount).toFixed(2)}</td>
                    <td className="p-2">{p.payment_date}</td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => printReceipt(p)}
                          className="rounded p-1.5 hover:bg-accent"
                          title="طباعة"
                          aria-label="طباعة الإيصال"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => del(p.id)}
                            className="rounded p-1.5 text-destructive hover:bg-destructive/10"
                            title="حذف"
                            aria-label="حذف الدفع"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    لا توجد مدفوعات
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-auto rounded-2xl border bg-card">
          <div className="border-b bg-amber-50 p-3 font-bold text-amber-900">
            لم يدفعوا ({unpaid.length})
          </div>
          <table className="w-full text-sm">
            <tbody>
              {unpaid.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.full_name}</td>
                  <td className="p-2 text-end">
                    <button
                      onClick={() => openAdd(s.id)}
                      className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                    >
                      تسجيل الدفع
                    </button>
                  </td>
                </tr>
              ))}
              {unpaid.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-muted-foreground">جميع الطلاب دفعوا 🎉</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden"
          onClick={() => setOpen(false)}
        >
          <form
            onSubmit={save}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-card p-6"
          >
            <h2 className="mb-4 text-xl font-bold">
              تسجيل دفع — {monthNames[month - 1]} {year}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="payment-student" className="mb-1 block text-sm font-medium">
                  الطالب *
                </label>
                <select
                  id="payment-student"
                  name="student_id"
                  required
                  value={form.student_id}
                  onChange={(e) => onStudentChange(e.target.value)}
                  className="input"
                >
                  <option value="">اختر طالباً...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id} disabled={paidIds.has(s.id)}>
                      {s.full_name} {paidIds.has(s.id) ? " (دفع)" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="payment-amount" className="mb-1 block text-sm font-medium">
                  المبلغ (د.م) *
                </label>
                <input
                  id="payment-amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="payment-method" className="mb-1 block text-sm font-medium">
                  طريقة الدفع
                </label>
                <select
                  id="payment-method"
                  name="payment_method"
                  value={form.payment_method}
                  onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                  className="input"
                >
                  <option value="cash">نقداً</option>
                  <option value="bank">تحويل بنكي</option>
                  <option value="check">شيك</option>
                </select>
              </div>
              <div>
                <label htmlFor="payment-date" className="mb-1 block text-sm font-medium">
                  تاريخ الدفع
                </label>
                <input
                  id="payment-date"
                  name="payment_date"
                  type="date"
                  value={form.payment_date}
                  onChange={(e) => setForm({ ...form, payment_date: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="payment-notes" className="mb-1 block text-sm font-medium">
                  ملاحظات
                </label>
                <textarea
                  id="payment-notes"
                  name="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="input min-h-16"
                />
              </div>
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
                حفظ وطباعة الإيصال
              </button>
            </div>
          </form>
        </div>
      )}

      {receipt && <Receipt data={receipt} onClose={() => setReceipt(null)} />}
    </div>
  );
}
