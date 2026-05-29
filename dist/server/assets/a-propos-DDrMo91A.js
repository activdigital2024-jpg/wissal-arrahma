import { jsxs, jsx } from "react/jsx-runtime";
import { L as Layout } from "./Layout-DC7JUDwb.js";
import { Eye, Target, CheckCircle2 } from "lucide-react";
import { l as logo } from "./logo-BEdXg2sE.js";
import "@tanstack/react-router";
import "react";
const objectives = ["تقديم برامج تعليمية وتأهيلية للأطفال في وضعية إعاقة ذهنية.", "دعم الأسر وتقديم التوعية والتكوين حول كيفية التعامل مع أطفالهم.", "تعزيز الإدماج الاجتماعي والاقتصادي للأطفال ذوي الإعاقات الذهنية.", "السعي إلى إنشاء مركز شامل يقدم خدمات متكاملة للأطفال وأسرهم.", "التعاون مع المؤسسات الوطنية والدولية لتعزيز حقوق الأطفال في وضعية إعاقة."];
function AboutPage() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary", children: "من نحن" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl", children: "جمعية ملتزمة منذ سنة 2011" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground", children: "جمعية وصال الرحمة منظمة غير ربحية تأسست في 8 أكتوبر 2011، تعنى بدمج وتأهيل الأطفال في وضعية إعاقة ذهنية، بما في ذلك طيف التوحد، التثلث الصبغي 21، والتأخر الذهني. نعمل على تقديم برامج تعليمية وتأهيلية متكاملة لدعم الأطفال وتمكينهم من الاندماج في المجتمع." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-8 shadow-soft lg:p-10", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground", children: /* @__PURE__ */ jsx(Eye, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "رؤيتنا" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-muted-foreground", children: "نطمح إلى بناء مجتمع دامج يُتيح للأطفال في وضعية إعاقة ذهنية فرصًا متساوية للتعلّم، التأهيل، والاندماج الاجتماعي والاقتصادي." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border border-border bg-card p-8 shadow-soft lg:p-10", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-warm text-earth-foreground", children: /* @__PURE__ */ jsx(Target, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "رسالتنا" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-muted-foreground", children: "توفير بيئة تعليمية وتأهيلية متكاملة لتنمية مهارات الأطفال في وضعية إعاقة ذهنية، وتعزيز استقلاليتهم، مع دعم أسرهم ونشر الوعي حول قضايا الإعاقة، وإقامة شراكات لتحسين جودة حياتهم." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-16 grid gap-12 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-gradient-hero p-8 shadow-elegant", children: [
          /* @__PURE__ */ jsx("img", { src: logo, alt: "الشعار", className: "mx-auto h-32 w-32 rounded-full bg-background object-contain p-2" }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-center font-display text-xl font-bold text-primary-foreground", children: "وصال الرحمة" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-sm text-primary-foreground/80", children: "جمعية وصال الرحمة" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "أهدافنا" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-4", children: objectives.map((obj, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-smooth hover:border-primary/40", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground/90", children: obj })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AboutPage as component
};
