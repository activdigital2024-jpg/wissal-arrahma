import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/localdb/client";
import { Users, Receipt, Wallet, AlertCircle, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

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

function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, paidThisMonth: 0, unpaid: 0, revenue: 0 });
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  useEffect(() => {
    (async () => {
      const { count: studentCount } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      const { data: monthPaymentsRaw } = await supabase
        .from("payments")
        .select("amount, student_id")
        .eq("year", year)
        .eq("month", month);

      const monthPayments = (monthPaymentsRaw || []) as { amount: number; student_id: string }[];
      const revenue = monthPayments.reduce((s, p) => s + Number(p.amount), 0);
      const paidIds = new Set(monthPayments.map((p) => p.student_id));

      setStats({
        students: studentCount || 0,
        paidThisMonth: paidIds.size,
        unpaid: (studentCount || 0) - paidIds.size,
        revenue,
      });
    })();
  }, [year, month]);

  const cards = [
    { label: "الطلاب النشطون", value: stats.students, icon: Users, color: "text-primary" },
    {
      label: `دفعوا (${monthNames[month - 1]})`,
      value: stats.paidThisMonth,
      icon: Receipt,
      color: "text-green-600",
    },
    { label: "لم يدفعوا بعد", value: stats.unpaid, icon: AlertCircle, color: "text-amber-600" },
    {
      label: "إيرادات الشهر",
      value: `${stats.revenue.toFixed(2)} د.م`,
      icon: Wallet,
      color: "text-foreground",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">نظرة عامة</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="mt-2 text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          to="/admin/evaluations/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <ClipboardList className="h-4 w-4" />
          إضافة تقييم جديد
        </Link>
        <Link
          to="/admin/evaluations"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold hover:bg-muted"
        >
          <ClipboardList className="h-4 w-4" />
          مشاهدة التقييمات
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border bg-card p-6">
        <h2 className="mb-2 font-bold">الشهر الحالي</h2>
        <p className="text-sm text-muted-foreground">
          {monthNames[month - 1]} {year}
        </p>
      </div>
    </div>
  );
}
