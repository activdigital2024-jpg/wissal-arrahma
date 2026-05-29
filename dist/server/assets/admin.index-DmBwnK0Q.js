import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { Users, Receipt, AlertCircle, Wallet, ClipboardList } from "lucide-react";
import "sonner";
const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"];
function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    paidThisMonth: 0,
    unpaid: 0,
    revenue: 0
  });
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  useEffect(() => {
    (async () => {
      const {
        count: studentCount
      } = await supabase.from("students").select("*", {
        count: "exact",
        head: true
      }).eq("status", "active");
      const {
        data: monthPaymentsRaw
      } = await supabase.from("payments").select("amount, student_id").eq("year", year).eq("month", month);
      const monthPayments = monthPaymentsRaw || [];
      const revenue = monthPayments.reduce((s, p) => s + Number(p.amount), 0);
      const paidIds = new Set(monthPayments.map((p) => p.student_id));
      setStats({
        students: studentCount || 0,
        paidThisMonth: paidIds.size,
        unpaid: (studentCount || 0) - paidIds.size,
        revenue
      });
    })();
  }, [year, month]);
  const cards = [{
    label: "الطلاب النشطون",
    value: stats.students,
    icon: Users,
    color: "text-primary"
  }, {
    label: `دفعوا (${monthNames[month - 1]})`,
    value: stats.paidThisMonth,
    icon: Receipt,
    color: "text-green-600"
  }, {
    label: "لم يدفعوا بعد",
    value: stats.unpaid,
    icon: AlertCircle,
    color: "text-amber-600"
  }, {
    label: "إيرادات الشهر",
    value: `${stats.revenue.toFixed(2)} د.م`,
    icon: Wallet,
    color: "text-foreground"
  }];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-2xl font-bold", children: "نظرة عامة" }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: cards.map((c) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsx(c.icon, { className: `h-5 w-5 ${c.color}` })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold", children: c.value })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/admin/evaluations/new", className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsx(ClipboardList, { className: "h-4 w-4" }),
        "إضافة تقييم جديد"
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/admin/evaluations", className: "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold hover:bg-muted", children: [
        /* @__PURE__ */ jsx(ClipboardList, { className: "h-4 w-4" }),
        "مشاهدة التقييمات"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border bg-card p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-2 font-bold", children: "الشهر الحالي" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        monthNames[month - 1],
        " ",
        year
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
