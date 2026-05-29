import { jsxs, jsx } from "react/jsx-runtime";
import { L as Layout } from "./Layout-DC7JUDwb.js";
import { MapPin, Phone, Mail, Globe, Facebook } from "lucide-react";
import "@tanstack/react-router";
import "react";
import "./logo-BEdXg2sE.js";
const contacts = [{
  icon: MapPin,
  label: "العنوان",
  value: "برانص 1، زنقة Z رقم 03، طنجة",
  href: "https://maps.google.com/?q=Branes+1+Tanger",
  ltr: false
}, {
  icon: Phone,
  label: "الهاتف",
  value: "+212 6 74 16 46 77",
  href: "tel:+212674164677",
  extra: ["+212 6 63 17 70 13", "+212 5 39 33 15 52"],
  ltr: true
}, {
  icon: Mail,
  label: "البريد الإلكتروني",
  value: "wissal.arrahma@gmail.com",
  href: "mailto:wissal.arrahma@gmail.com",
  ltr: true
}, {
  icon: Globe,
  label: "الموقع الإلكتروني",
  value: "www.wissalarrahma.com",
  href: "https://www.wissalarrahma.com",
  ltr: true
}, {
  icon: Facebook,
  label: "فيسبوك",
  value: "Association.wissal.arrahma",
  href: "https://facebook.com/Association.wissal.arrahma",
  ltr: true
}];
function ContactPage() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary", children: "لنبقى على تواصل" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl", children: "اتصل بنا" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground", children: "هل لديك سؤال أو مشروع شراكة أو ترغب في دعم أنشطتنا؟ فريقنا في خدمتك." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: contacts.map((c) => /* @__PURE__ */ jsxs("a", { href: c.href, target: c.href.startsWith("http") ? "_blank" : void 0, rel: "noreferrer", className: "group rounded-2xl border border-border bg-card p-6 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-hero group-hover:text-primary-foreground", children: /* @__PURE__ */ jsx(c.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 font-medium text-foreground", dir: c.ltr ? "ltr" : void 0, children: c.value }),
        c.extra && /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-0.5 text-sm text-muted-foreground", dir: "ltr", children: c.extra.map((e) => /* @__PURE__ */ jsx("div", { children: e }, e)) })
      ] }, c.label)) }) }),
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-elegant", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold", children: "ادعم رسالتنا" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-primary-foreground/90", children: "كل مساهمة لها قيمتها: تبرع، تطوع، رعاية ورشة، أو مجرد مشاركة عملنا على شبكات التواصل." }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-6 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-sun" }),
            " تقديم تبرع مالي"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-sun" }),
            " الانخراط كمتطوع"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-sun" }),
            " رعاية ورشة"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-sun" }),
            " اقتراح شراكة"
          ] })
        ] }),
        /* @__PURE__ */ jsx("a", { href: "mailto:wissal.arrahma@gmail.com", className: "mt-6 inline-flex rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-smooth hover:scale-105", children: "راسلنا" })
      ] }) })
    ] })
  ] });
}
export {
  ContactPage as component
};
