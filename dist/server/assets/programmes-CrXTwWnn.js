import { jsxs, jsx } from "react/jsx-runtime";
import { L as Layout } from "./Layout-DC7JUDwb.js";
import { GraduationCap, Sparkles, Users, Megaphone, Briefcase } from "lucide-react";
import { c as cooking, a as art, p as painting, l as learning } from "./activity-learning-Fgufsv1F.js";
import "@tanstack/react-router";
import "react";
import "./logo-BEdXg2sE.js";
const domains = [{
  icon: GraduationCap,
  title: "التعليم والإدماج المدرسي",
  text: "برامج تعليمية مكيفة ومواكبة للأطفال نحو الإدماج المدرسي."
}, {
  icon: Sparkles,
  title: "التأهيل والتكوين",
  text: "ورشات عملية (طبخ، رسم، حرف يدوية) لتنمية الاستقلالية والمهارات."
}, {
  icon: Users,
  title: "الدعم الأسري والتوعية المجتمعية",
  text: "توعية وتكوين الأسر للتكفل بأطفالهم بشكل أفضل."
}, {
  icon: Megaphone,
  title: "المرافعة والشراكات",
  text: "الدفاع عن الحقوق والتعاون مع المؤسسات الوطنية والدولية."
}, {
  icon: Briefcase,
  title: "الإدماج الاجتماعي والاقتصادي",
  text: "إعداد الأطفال لحياة مستقلة وتيسير اندماجهم الاقتصادي."
}];
const activities = [{
  img: cooking,
  title: "ورشة الطبخ — Chef Fadoua",
  text: "تعلم أساسيات فن الطبخ بإشراف من شيف محترف."
}, {
  img: art,
  title: "ورشة الحرف اليدوية",
  text: "العمل اليدوي والإبداعي لتحفيز المهارات الحركية الدقيقة والتركيز."
}, {
  img: painting,
  title: "ورشة الرسم",
  text: "التعبير الفني وتنمية الإبداع."
}, {
  img: learning,
  title: "تعلم فردي",
  text: "متابعة بيداغوجية مكيفة مع إيقاع كل طفل."
}];
function ProgramsPage() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary", children: "برامجنا" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl", children: "خمسة مجالات للتدخل" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground", children: "مقاربة شاملة تجمع بين التعليم والتأهيل ودعم الأسر لتغيير حياة الأطفال بشكل دائم." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: domains.map((d, i) => /* @__PURE__ */ jsxs("div", { className: `rounded-3xl border border-border bg-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant ${i === 0 ? "lg:row-span-2 lg:bg-gradient-hero lg:text-primary-foreground" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: `mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "lg:bg-background/20 lg:text-primary-foreground" : "bg-primary/10 text-primary"}`, children: /* @__PURE__ */ jsx(d.icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold", children: d.title }),
      /* @__PURE__ */ jsx("p", { className: `mt-3 ${i === 0 ? "lg:text-primary-foreground/90" : "text-muted-foreground"}`, children: d.text })
    ] }, d.title)) }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold text-foreground sm:text-4xl", children: "ورشاتنا في صور" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: "لمحة عن الحياة اليومية والأنشطة العملية المقدمة للمستفيدين." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-2", children: activities.map((a) => /* @__PURE__ */ jsxs("article", { className: "group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-smooth hover:shadow-elegant", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: a.img, alt: a.title, className: "h-full w-full object-cover transition-smooth group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: a.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: a.text })
        ] })
      ] }, a.title)) })
    ] })
  ] });
}
export {
  ProgramsPage as component
};
