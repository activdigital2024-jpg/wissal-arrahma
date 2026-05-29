import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { X, Menu, MapPin, Phone, Mail, Globe, Facebook } from "lucide-react";
import { l as logo } from "./logo-BEdXg2sE.js";
const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/a-propos", label: "من نحن" },
  { to: "/programmes", label: "برامجنا" },
  { to: "/partenaires", label: "شركاؤنا" },
  { to: "/contact", label: "اتصل بنا" }
];
function SiteHeader() {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", onClick: () => setOpen(false), children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo,
            alt: "شعار جمعية وصال الرحمة",
            className: "h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "font-display text-base font-bold text-foreground sm:text-lg", children: "وصال الرحمة" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "للدمج والتأهيل" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden items-center gap-1 md:flex", children: [
        links.map((l) => /* @__PURE__ */ jsx(
          Link,
          {
            to: l.to,
            activeProps: { className: "text-primary bg-primary/10" },
            activeOptions: { exact: l.to === "/" },
            className: "rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-smooth hover:bg-accent hover:text-foreground",
            children: l.label
          },
          l.to
        )),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/login",
            className: "ms-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent",
            children: "الإدارة"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/contact",
            className: "ms-2 rounded-full bg-gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:scale-105",
            children: "ادعمنا"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          "aria-label": "القائمة",
          onClick: () => setOpen(!open),
          className: "rounded-lg p-2 text-foreground hover:bg-accent md:hidden",
          children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsx("nav", { className: "border-t border-border bg-background px-4 py-4 md:hidden", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: links.map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        onClick: () => setOpen(false),
        activeProps: { className: "text-primary bg-primary/10" },
        activeOptions: { exact: l.to === "/" },
        className: "rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent",
        children: l.label
      },
      l.to
    )) }) })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-24 border-t border-border bg-gradient-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "الشعار",
              className: "h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-lg font-bold", children: "جمعية وصال الرحمة" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-sm text-muted-foreground", children: "منظمة غير ربحية تأسست في 8 أكتوبر 2011، تعنى بدمج وتأهيل الأطفال في وضعية إعاقة ذهنية بمدينة طنجة." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground", children: "روابط" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary", children: "الرئيسية" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/a-propos", className: "hover:text-primary", children: "من نحن" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/programmes", className: "hover:text-primary", children: "برامجنا" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/partenaires", className: "hover:text-primary", children: "شركاؤنا" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-primary", children: "اتصل بنا" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground", children: "للتواصل" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "برانص 1، زنقة Z رقم 03، طنجة" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", dir: "ltr", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "+212 6 74 16 46 77" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", dir: "ltr", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "wissal.arrahma@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", dir: "ltr", children: [
            /* @__PURE__ */ jsx(Globe, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "www.wissalarrahma.com" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Facebook, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "Association.wissal.arrahma" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-border py-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " جمعية وصال الرحمة — جميع الحقوق محفوظة"
    ] })
  ] });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
export {
  Layout as L
};
