import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { toast } from "sonner";
import { X, Printer, Plus, Trash2 } from "lucide-react";
import { l as logo } from "./logo-BEdXg2sE.js";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import "@tanstack/react-router";
const monthNames$1 = [
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
  "دجنبر"
];
const methodLabel = { cash: "نقداً", bank: "تحويل بنكي", check: "شيك" };
function Receipt({ data, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 overflow-auto bg-black/60 p-4 print:static print:bg-white print:p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto my-4 max-w-2xl print:my-0 print:max-w-none", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between gap-2 print:hidden", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onClose,
            className: "flex items-center gap-2 rounded-lg bg-white px-4 py-2",
            children: [
              /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
              " إغلاق"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => window.print(),
            className: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground",
            children: [
              /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }),
              " طباعة"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: "receipt-print",
          className: "rounded-2xl bg-white p-8 text-black shadow-2xl print:rounded-none print:shadow-none",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between border-b-2 border-gray-800 pb-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("img", { src: logo, alt: "logo", className: "h-16 w-16 rounded-full" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold", children: data.org_name }),
                  data.org_address && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: data.org_address }),
                  data.org_phone && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", dir: "ltr", children: data.org_phone })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-end", children: [
                /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "رقم الإيصال" }),
                /* @__PURE__ */ jsxs("div", { className: "font-mono text-2xl font-bold", children: [
                  "#",
                  String(data.receipt_no).padStart(5, "0")
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-gray-500", children: data.payment_date })
              ] })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "my-6 text-center text-2xl font-bold", children: "إيصال أداء الرسوم الشهرية" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-gray-300 p-5", children: [
              /* @__PURE__ */ jsx(Row, { label: "اسم الطالب", value: data.student_name }),
              data.guardian_name && /* @__PURE__ */ jsx(Row, { label: "ولي الأمر", value: data.guardian_name }),
              data.guardian_phone && /* @__PURE__ */ jsx(Row, { label: "الهاتف", value: data.guardian_phone, ltr: true }),
              data.address && /* @__PURE__ */ jsx(Row, { label: "العنوان", value: data.address }),
              /* @__PURE__ */ jsx(Row, { label: "عن شهر", value: `${monthNames$1[data.month - 1]} ${data.year}` }),
              /* @__PURE__ */ jsx(
                Row,
                {
                  label: "طريقة الدفع",
                  value: methodLabel[data.payment_method] || data.payment_method
                }
              ),
              data.notes && /* @__PURE__ */ jsx(Row, { label: "ملاحظات", value: data.notes })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-lg bg-gray-100 p-5 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "المبلغ المؤدى" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 text-4xl font-bold", children: [
                data.amount.toFixed(2),
                " د.م"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-12 grid grid-cols-2 gap-8 text-sm", children: [
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "border-t border-gray-400 pt-2 text-center text-gray-600", children: "توقيع المسؤول" }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "border-t border-gray-400 pt-2 text-center text-gray-600", children: "توقيع ولي الأمر" }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-8 text-center text-xs text-gray-500", children: "شكراً لدعمكم — هذا الإيصال يثبت أداء الرسوم الشهرية المذكورة أعلاه." })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @media print {
          body * { visibility: hidden !important; }
          #receipt-print, #receipt-print * { visibility: visible !important; }

          /* Keep layout stable in print */
          #receipt-print {
            position: static !important;
            inset: auto !important;
            margin: 0 !important;
            width: 100% !important;
            box-shadow: none !important;
          }

          /* Avoid printing the overlay/backdrop */
          .print:hidden { display: none !important; }
          .print:static { position: static !important; }
        }
      ` })
  ] });
}
function Row({ label, value, ltr }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4 border-b border-dashed border-gray-200 pb-2 last:border-0 last:pb-0", children: [
    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: label }),
    /* @__PURE__ */ jsx("span", { className: "font-semibold", dir: ltr ? "ltr" : void 0, children: value })
  ] });
}
const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "ماي", "يونيو", "يوليوز", "غشت", "شتنبر", "أكتوبر", "نونبر", "دجنبر"];
const now = /* @__PURE__ */ new Date();
function PaymentsPage() {
  const {
    isAdmin
  } = useAuth();
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [open, setOpen] = useState(false);
  const [defaultFee, setDefaultFee] = useState(200);
  const [orgInfo, setOrgInfo] = useState({
    org_name: "",
    org_address: "",
    org_phone: ""
  });
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({
    student_id: "",
    amount: "",
    payment_method: "cash",
    payment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    notes: ""
  });
  const load = useCallback(async () => {
    const [{
      data: s
    }, {
      data: p
    }, {
      data: settings
    }] = await Promise.all([supabase.from("students").select("id,full_name,monthly_fee,guardian_name,guardian_phone,address").eq("status", "active").order("full_name"), supabase.from("payments").select("*").eq("year", year).eq("month", month).order("payment_date", {
      ascending: false
    }), supabase.from("app_settings").select("*").eq("id", 1).single()]);
    setStudents(s || []);
    setPayments(p || []);
    if (settings) {
      setDefaultFee(Number(settings.monthly_fee));
      setOrgInfo({
        org_name: settings.org_name,
        org_address: settings.org_address || "",
        org_phone: settings.org_phone || ""
      });
    }
  }, [year, month]);
  useEffect(() => {
    load();
  }, [load]);
  const paidIds = new Set(payments.map((p) => p.student_id));
  const unpaid = students.filter((s) => !paidIds.has(s.id));
  const openAdd = (studentId) => {
    const s = students.find((x) => x.id === studentId);
    setForm({
      student_id: studentId || "",
      amount: String(s?.monthly_fee ?? defaultFee),
      payment_method: "cash",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      notes: ""
    });
    setOpen(true);
  };
  const onStudentChange = (id) => {
    const s = students.find((x) => x.id === id);
    setForm((f) => ({
      ...f,
      student_id: id,
      amount: String(s?.monthly_fee ?? defaultFee)
    }));
  };
  const save = async (e) => {
    e.preventDefault();
    const {
      data,
      error
    } = await supabase.from("payments").insert({
      student_id: form.student_id,
      year,
      month,
      amount: Number(form.amount),
      payment_method: form.payment_method,
      payment_date: form.payment_date,
      notes: form.notes || null
    }).select().single();
    if (error) return toast.error(error.message);
    toast.success("تم تسجيل الدفع");
    setOpen(false);
    await load();
    if (data) printReceipt(data);
  };
  const del = async (id) => {
    if (!confirm("حذف هذا الدفع؟")) return;
    const {
      error
    } = await supabase.from("payments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("تم الحذف");
    load();
  };
  const printReceipt = (p) => {
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
      org_phone: orgInfo.org_phone
    });
    const maxWaitMs = 2e3;
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
      window.print();
    };
    window.setTimeout(tryPrint, 0);
  };
  const years = Array.from({
    length: 5
  }, (_, i) => now.getFullYear() - 2 + i);
  const total = payments.reduce((s, p) => s + Number(p.amount), 0);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "المدفوعات" }),
      /* @__PURE__ */ jsxs("button", { onClick: () => openAdd(), className: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " تسجيل دفع"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap gap-3 print:hidden", children: [
      /* @__PURE__ */ jsx("select", { id: "payments-month", "aria-label": "شهر", title: "شهر", value: month, onChange: (e) => setMonth(Number(e.target.value)), className: "input", children: monthNames.map((m, i) => /* @__PURE__ */ jsx("option", { value: i + 1, children: m }, i + 1)) }),
      /* @__PURE__ */ jsx("select", { id: "payments-year", "aria-label": "سنة", title: "سنة", value: year, onChange: (e) => setYear(Number(e.target.value)), className: "input", children: years.map((y) => /* @__PURE__ */ jsx("option", { value: y, children: y }, y)) }),
      /* @__PURE__ */ jsxs("div", { className: "ms-auto rounded-lg border bg-card px-4 py-2 text-sm", children: [
        "الإيرادات: ",
        /* @__PURE__ */ jsxs("span", { className: "font-bold", children: [
          total.toFixed(2),
          " د.م"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 print:hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "overflow-auto rounded-2xl border bg-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b bg-muted/50 p-3 font-bold", children: [
          "المدفوعات (",
          payments.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "text-right text-xs text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { className: "p-2", children: "رقم" }),
            /* @__PURE__ */ jsx("th", { className: "p-2", children: "الطالب" }),
            /* @__PURE__ */ jsx("th", { className: "p-2", children: "المبلغ" }),
            /* @__PURE__ */ jsx("th", { className: "p-2", children: "التاريخ" }),
            /* @__PURE__ */ jsx("th", { className: "p-2" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            payments.map((p) => {
              const s = students.find((x) => x.id === p.student_id);
              return /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
                /* @__PURE__ */ jsxs("td", { className: "p-2 font-mono", children: [
                  "#",
                  p.receipt_no
                ] }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: s?.full_name || "-" }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: Number(p.amount).toFixed(2) }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: p.payment_date }),
                /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
                  /* @__PURE__ */ jsx("button", { type: "button", onClick: () => printReceipt(p), className: "rounded p-1.5 hover:bg-accent", title: "طباعة", "aria-label": "طباعة الإيصال", children: /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }) }),
                  isAdmin && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => del(p.id), className: "rounded p-1.5 text-destructive hover:bg-destructive/10", title: "حذف", "aria-label": "حذف الدفع", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
                ] }) })
              ] }, p.id);
            }),
            payments.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "p-4 text-center text-muted-foreground", children: "لا توجد مدفوعات" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-auto rounded-2xl border bg-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "border-b bg-amber-50 p-3 font-bold text-amber-900", children: [
          "لم يدفعوا (",
          unpaid.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx("table", { className: "w-full text-sm", children: /* @__PURE__ */ jsxs("tbody", { children: [
          unpaid.map((s) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
            /* @__PURE__ */ jsx("td", { className: "p-2", children: s.full_name }),
            /* @__PURE__ */ jsx("td", { className: "p-2 text-end", children: /* @__PURE__ */ jsx("button", { onClick: () => openAdd(s.id), className: "rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground", children: "تسجيل الدفع" }) })
          ] }, s.id)),
          unpaid.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "p-4 text-center text-muted-foreground", children: "جميع الطلاب دفعوا 🎉" }) })
        ] }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxs("form", { onSubmit: save, onClick: (e) => e.stopPropagation(), className: "w-full max-w-md rounded-2xl bg-card p-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-4 text-xl font-bold", children: [
        "تسجيل دفع — ",
        monthNames[month - 1],
        " ",
        year
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "payment-student", className: "mb-1 block text-sm font-medium", children: "الطالب *" }),
          /* @__PURE__ */ jsxs("select", { id: "payment-student", name: "student_id", required: true, value: form.student_id, onChange: (e) => onStudentChange(e.target.value), className: "input", children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "اختر طالباً..." }),
            students.map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, disabled: paidIds.has(s.id), children: [
              s.full_name,
              " ",
              paidIds.has(s.id) ? " (دفع)" : ""
            ] }, s.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "payment-amount", className: "mb-1 block text-sm font-medium", children: "المبلغ (د.م) *" }),
          /* @__PURE__ */ jsx("input", { id: "payment-amount", name: "amount", type: "number", step: "0.01", required: true, value: form.amount, onChange: (e) => setForm({
            ...form,
            amount: e.target.value
          }), className: "input" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "payment-method", className: "mb-1 block text-sm font-medium", children: "طريقة الدفع" }),
          /* @__PURE__ */ jsxs("select", { id: "payment-method", name: "payment_method", value: form.payment_method, onChange: (e) => setForm({
            ...form,
            payment_method: e.target.value
          }), className: "input", children: [
            /* @__PURE__ */ jsx("option", { value: "cash", children: "نقداً" }),
            /* @__PURE__ */ jsx("option", { value: "bank", children: "تحويل بنكي" }),
            /* @__PURE__ */ jsx("option", { value: "check", children: "شيك" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "payment-date", className: "mb-1 block text-sm font-medium", children: "تاريخ الدفع" }),
          /* @__PURE__ */ jsx("input", { id: "payment-date", name: "payment_date", type: "date", value: form.payment_date, onChange: (e) => setForm({
            ...form,
            payment_date: e.target.value
          }), className: "input" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "payment-notes", className: "mb-1 block text-sm font-medium", children: "ملاحظات" }),
          /* @__PURE__ */ jsx("textarea", { id: "payment-notes", name: "notes", value: form.notes, onChange: (e) => setForm({
            ...form,
            notes: e.target.value
          }), className: "input min-h-16" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setOpen(false), className: "rounded-lg border px-4 py-2", children: "إلغاء" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground", children: "حفظ وطباعة الإيصال" })
      ] })
    ] }) }),
    receipt && /* @__PURE__ */ jsx(Receipt, { data: receipt, onClose: () => setReceipt(null) })
  ] });
}
export {
  PaymentsPage as component
};
