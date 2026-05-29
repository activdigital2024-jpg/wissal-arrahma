import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { L as Layout } from "./Layout-DC7JUDwb.js";
import { Heart, ArrowLeft, GraduationCap, Sparkles, Users } from "lucide-react";
import { l as logo } from "./logo-BEdXg2sE.js";
import { c as cooking, a as art, p as painting, l as learning } from "./activity-learning-Fgufsv1F.js";
import "react";
const stats = [{
  value: "2011",
  label: "سنة التأسيس"
}, {
  value: "5",
  label: "مجالات التدخل"
}, {
  value: "+10",
  label: "شركاء فاعلون"
}, {
  value: "100%",
  label: "غير ربحية"
}];
const pillars = [{
  icon: GraduationCap,
  title: "التعليم والإدماج",
  text: "برامج تعليمية مكيفة لتعزيز الإدماج المدرسي للأطفال."
}, {
  icon: Sparkles,
  title: "التأهيل والتكوين",
  text: "ورشات عملية لتنمية المهارات وتعزيز الاستقلالية."
}, {
  icon: Users,
  title: "دعم الأسر",
  text: "توعية وتكوين الأسر حول كيفية التعامل مع أطفالهم."
}, {
  icon: Heart,
  title: "المرافعة والشراكات",
  text: "الدفاع عن الحقوق والتعاون مع المؤسسات الوطنية والدولية."
}];
function HomePage() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-gradient-soft", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -left-20 -top-20 h-96 w-96 rounded-full bg-sun/30 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-32 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
          /* @__PURE__ */ jsxs("span", { className: "mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-3.5 w-3.5" }),
            " منذ 2011 · طنجة، المغرب"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl", children: [
            "فرصة متساوية لـ",
            /* @__PURE__ */ jsx("span", { className: "bg-gradient-hero bg-clip-text text-transparent", children: " كل طفل" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground", children: "تعمل جمعية وصال الرحمة على دمج وتعليم وتأهيل الأطفال في وضعية إعاقة ذهنية — التوحد، التثلث الصبغي 21، والتأخر الذهني." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/programmes", className: "inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:scale-105", children: [
              "برامجنا ",
              /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-smooth hover:border-primary hover:bg-primary/5", children: "ادعمنا" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("img", { src: cooking, alt: "ورشة الطبخ", className: "h-56 w-full rounded-3xl object-cover shadow-warm" }),
              /* @__PURE__ */ jsx("img", { src: art, alt: "ورشة الحرف", className: "h-40 w-full rounded-3xl object-cover shadow-soft" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-10 space-y-4", children: [
              /* @__PURE__ */ jsx("img", { src: painting, alt: "ورشة الرسم", className: "h-40 w-full rounded-3xl object-cover shadow-soft" }),
              /* @__PURE__ */ jsx("img", { src: learning, alt: "التعلم", className: "h-56 w-full rounded-3xl object-cover shadow-warm" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute -bottom-6 -right-6 hidden h-24 w-24 items-center justify-center rounded-2xl bg-card p-3 shadow-elegant sm:flex", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "الشعار", className: "h-full w-full object-contain" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "border-y border-border bg-card", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8", children: stats.map((s) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "font-display text-4xl font-bold text-primary lg:text-5xl", children: s.value }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary", children: "عملنا" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl", children: "أربعة محاور، هدف واحد" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "منح الأطفال الأدوات اللازمة للنمو والتعلم والاندماج الكامل في المجتمع." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: pillars.map((p) => /* @__PURE__ */ jsxs("div", { className: "group rounded-3xl border border-border bg-card p-6 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-hero group-hover:text-primary-foreground", children: /* @__PURE__ */ jsx(p.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.text })
      ] }, p.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-hero p-10 shadow-elegant lg:p-16", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -left-10 -top-10 h-64 w-64 rounded-full bg-sun/30 blur-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative grid gap-8 lg:grid-cols-3 lg:gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold text-primary-foreground sm:text-4xl", children: "رسالتنا" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg leading-relaxed text-primary-foreground/90", children: "توفير بيئة تعليمية وتأهيلية متكاملة لتنمية مهارات الأطفال في وضعية إعاقة ذهنية، وتعزيز استقلاليتهم، مع دعم أسرهم ونشر الوعي حول قضايا الإعاقة، وإقامة شراكات لتحسين جودة حياتهم وفتح آفاق مستقبلية لهم." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxs(Link, { to: "/a-propos", className: "inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-smooth hover:scale-105", children: [
          "المزيد ",
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" })
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
