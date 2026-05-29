import { useEffect } from "react";
import { X, Printer } from "lucide-react";
import logo from "@/assets/logo.jpg";

export type ReceiptData = {
  receipt_no: number;
  student_name: string;
  guardian_name: string | null;
  guardian_phone: string | null;
  address: string | null;
  year: number;
  month: number;
  amount: number;
  payment_method: string;
  payment_date: string;
  notes: string | null;
  org_name: string;
  org_address: string;
  org_phone: string;
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
const methodLabel: Record<string, string> = { cash: "نقداً", bank: "تحويل بنكي", check: "شيك" };

export function Receipt({ data, onClose }: { data: ReceiptData; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/60 p-4 print:static print:bg-white print:p-0">
      <div className="mx-auto my-4 max-w-2xl print:my-0 print:max-w-none">
        <div className="mb-3 flex items-center justify-between gap-2 print:hidden">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2"
          >
            <X className="h-4 w-4" /> إغلاق
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
          >
            <Printer className="h-4 w-4" /> طباعة
          </button>
        </div>

        <div
          id="receipt-print"
          className="rounded-2xl bg-white p-8 text-black shadow-2xl print:rounded-none print:shadow-none"
        >
          <div className="flex items-start justify-between border-b-2 border-gray-800 pb-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="h-16 w-16 rounded-full" />
              <div>
                <h1 className="text-xl font-bold">{data.org_name}</h1>
                {data.org_address && <p className="text-sm text-gray-600">{data.org_address}</p>}
                {data.org_phone && (
                  <p className="text-sm text-gray-600" dir="ltr">
                    {data.org_phone}
                  </p>
                )}
              </div>
            </div>
            <div className="text-end">
              <div className="text-xs text-gray-500">رقم الإيصال</div>
              <div className="font-mono text-2xl font-bold">
                #{String(data.receipt_no).padStart(5, "0")}
              </div>
              <div className="mt-1 text-xs text-gray-500">{data.payment_date}</div>
            </div>
          </div>

          <h2 className="my-6 text-center text-2xl font-bold">إيصال أداء الرسوم الشهرية</h2>

          <div className="space-y-3 rounded-lg border border-gray-300 p-5">
            <Row label="اسم الطالب" value={data.student_name} />
            {data.guardian_name && <Row label="ولي الأمر" value={data.guardian_name} />}
            {data.guardian_phone && <Row label="الهاتف" value={data.guardian_phone} ltr />}
            {data.address && <Row label="العنوان" value={data.address} />}
            <Row label="عن شهر" value={`${monthNames[data.month - 1]} ${data.year}`} />
            <Row
              label="طريقة الدفع"
              value={methodLabel[data.payment_method] || data.payment_method}
            />
            {data.notes && <Row label="ملاحظات" value={data.notes} />}
          </div>

          <div className="mt-6 rounded-lg bg-gray-100 p-5 text-center">
            <div className="text-sm text-gray-600">المبلغ المؤدى</div>
            <div className="mt-1 text-4xl font-bold">{data.amount.toFixed(2)} د.م</div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 text-sm">
            <div>
              <div className="border-t border-gray-400 pt-2 text-center text-gray-600">
                توقيع المسؤول
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-2 text-center text-gray-600">
                توقيع ولي الأمر
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-gray-500">
            شكراً لدعمكم — هذا الإيصال يثبت أداء الرسوم الشهرية المذكورة أعلاه.
          </p>
        </div>
      </div>

      <style>{`
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
      `}</style>
    </div>
  );
}

function Row({ label, value, ltr }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-gray-200 pb-2 last:border-0 last:pb-0">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="font-semibold" dir={ltr ? "ltr" : undefined}>
        {value}
      </span>
    </div>
  );
}
