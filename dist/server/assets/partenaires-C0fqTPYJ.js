import { jsxs, jsx } from "react/jsx-runtime";
import { L as Layout } from "./Layout-DC7JUDwb.js";
import { Building2, Globe2, HeartHandshake } from "lucide-react";
import "@tanstack/react-router";
import "react";
import "./logo-BEdXg2sE.js";
const ads = "/assets/ads-DL2v50EP.jpg";
const regionTTA = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAvAC8AAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAiACMDASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAYHCAMEBQn/xAA0EAACAQMCBQAIAwkAAAAAAAABAgMEBQYAEQcSITFBCBMUIjJRYXEVgZEjNkVSocHS8PH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFBgAE/8QAJREAAQQBAwQCAwAAAAAAAAAAAQACAxEEBSExEjNBYSIjMlFx/9oADAMBAAIRAxEAPwD1EJ266iHiR6S2P4LWzW6jhe+3KIlZI4HCxRMO6tJ16j5AHbztrZ9I7iDPgmBtHQSmG5XKT2WKRT70a7Eu4+u3QHwWB8arvTVFHw7xjG2psdt2QZHfoTVvLdaf2lY0LlI0ij3+I7Ek9+u3Udp3MzHRuMcZquTyqjTtPZKwTSiwTQF1fu/FJ3p/TKuIqOabGqZ6cn4Y6pg368pB/TUz8NONmO8S1aGid6O5opaSgqeUSbDuy7E84+3byBqCLoc7tlqqK2pwLEZI4I/WVFPHbaeSaJD2Z41YsB57dPO2lG818FRjFp4gWOigxu701zNDUxW4FIGkEfrElRN/c3XdWXc7geN9cMeXPE75v6h+iK2Ssun407ajZ0ngEOsX7V5evgb/AF3GjSzgGYRZphtpva7IauAO6AbhXBKuB9mBGjT7Zo3AFRjoZGOLT4UJ+mdRTPQYvWDf2aKSoic+AzBCv9EbSW9+ocbyfhHdriu9BBaYxI/LvyftJVDbeSpIbbv0+erOcTcCpeIuIVtmqH9U7gPBPt1ilG/K39j8wSNVHudWcRpYMS4gYzPWC3NJ7BWUs5gkSNjuwV+UrIhPUdtiT9gDmRujmdIOHVzxsq/TZmz47YPLSdhyQR4/iYcQwu4YDm7Zfer5QSWGEzTfiMVYkxugdW92NFJZmYnc7/XvsNKEkgfgROyKEjfKAyoD8I9mbp+h1hF04bANtj9/c/ym4xdfI7R/800YtjVdxpqbdYrFaDj2GW2ZpZ5TIZSWO3O7SEDnkKjlAA2UfTR4+wdDK3vg3uUtvDUsoIqtyKFD1e5U9ejxTTQcHceV4mUlZ3Hu9w08hB/MEH89GpItdspLPbaSgpY1hpqaJIYo17KqgADv8ho1VMxg1oFqDlyBJI59cklbfdD/AL51y73YrZfaUxXK3UlwiADBKuBZVB7b7MD10aNbJ7S2J31wjw0w8N+6lk7D+HQ/46aLVRwUFKlPSwR00EYKpFCgVUHyAHQaNGj8X80pn9sLaKgkkgE/XRo0aaQAX//Z";
const provinceTanger = "/assets/province-tanger-CHPLY-K_.jpg";
const communeTanger = "/assets/commune-tanger-Cx5Ms2S8.jpg";
const wilayaTanger = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAvAC8AAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAhAB8DASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAACAABBAcCBgkF/8QANhAAAQMCAwUEBwkBAAAAAAAAAQIDBAURAAYhBxIxQVEIImHREzIzcYGCkRUjUmKSobGywfD/xAAZAQACAwEAAAAAAAAAAAAAAAACBgEDBAf/xAAjEQABBAEEAQUAAAAAAAAAAAABAAIDBAUREjEyQSFRgdHw/9oADAMBAAIRAxEAPwDpvWq5By/TZFQqMlESGwkrcecOiR/p8Bqb4HfNvbEQ1KcZy5RRIZSbCVPWU73LRCdbaczfqBjwu1tnl+bmOLlhh0phQ20yH0Dgt1V92/WybG35/prtf2R0ilbGIGZkTHPtRxLTy7quhYcPsgORTfj4Kvyso27krnujgOm3kp5x+NrtYyW0Cd/A8fK3XLvbHkiQhFdoLRjk956A4QpI67iuP6hgicrZrpec6M1VKRLRLiO3AUnQpI4pUDqkjofK/OQaE2+o8uWLa7Nu0JzJudDCfeKaTUGlJeQo91C0JKkL8DoU/N4C2WllH79sp9Ct2SwcQiMlYaOHj3T9qOjvU7a1NkuJ+6nMMvtlQ0ICA2f3b/jriLsv2j05mjSMnZsb9Pl2Xoh4nvRVk3v13d7vX5G5Ol8E7to2RxtqdAS2l1EWqxCVxJKx3QTxQrnuq0vbhYHW1iGeatnmYslSXGKxSZMZKTuh7cKmlAfhXwPla4GAtwzVbDpmDUFWY2zXuVG15HaOb+1Cs+p9mbdoc6pUvMTM5CAXoyVthCHGwL6ub1r2Gh4aakX0rfZjliTm7OcGmRQQ44lxRXbRIDaiSefQe84wyxSs3ZjYNJobVUlw3Vd+PGUsMG51KuCB71acNRgsdgmxROzKE9PqCm369LRuOKQAUsIvf0aTxPK552HQXGvXFmZjmM2gcq21dNGF7ZJN7j1H2rb5fMn+wxGkesr/ALmcLCw3S9FziLuUzPtPj54ko9X4nCwsBBwpl5X/2Q==";
const mokataaSouani = "/assets/mokataa-souani-x1U4BbBv.jpg";
const maagdenhuis = "/assets/maagdenhuis-BmorWmmg.jpg";
const fondationFrance = "/assets/fondation-france-Be-TKT-W.jpg";
const fairmont = "/assets/fairmont-BdH98j8S.jpg";
const araCora = "/assets/ara-cora-adil9hnD.jpg";
const unionHandicap = "/assets/union-handicap-UhgGBYIY.jpg";
const collectifAutisme = "/assets/collectif-autisme-DW-6-Fyf.jpg";
const institutional = [{
  name: "وكالة التنمية الاجتماعية",
  logo: ads
}, {
  name: "جهة طنجة-تطوان-الحسيمة",
  logo: regionTTA
}, {
  name: "عمالة طنجة-أصيلة",
  logo: provinceTanger
}, {
  name: "الجماعة الحضرية لطنجة",
  logo: communeTanger
}, {
  name: "ولاية طنجة",
  logo: wilayaTanger
}, {
  name: "مقاطعة السواني",
  logo: mokataaSouani
}];
const foundations = [{
  name: "Stichting Het R.C. Maagdenhuis",
  logo: maagdenhuis
}, {
  name: "Fondation de France",
  logo: fondationFrance
}, {
  name: "Fairmont Tazi Palace Tangier",
  logo: fairmont
}, {
  name: "ARA CORA",
  logo: araCora
}];
const networks = [{
  name: "اتحاد الجمعيات العاملة في مجال الإعاقة بولاية طنجة",
  logo: unionHandicap
}, {
  name: "التحالف الجهوي للجمعيات العاملة في مجال التوحد — طنجة-تطوان-الحسيمة",
  logo: collectifAutisme
}];
function LogoCard({
  p
}) {
  return /* @__PURE__ */ jsxs("div", { className: "group flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-5 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-24 w-full items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: p.logo, alt: p.name, loading: "lazy", className: "max-h-20 w-auto max-w-[85%] object-contain transition-smooth group-hover:scale-105" }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-center text-xs font-medium leading-snug text-muted-foreground", children: p.name })
  ] });
}
function Section({
  icon: Icon,
  title,
  subtitle,
  items,
  accent
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: `inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`, children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6", children: items.map((p) => /* @__PURE__ */ jsx(LogoCard, { p }, p.name)) })
  ] });
}
function PartnersPage() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-soft", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-primary", children: "معًا" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl", children: "شركاؤنا" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground", children: "شبكة من المؤسسات العمومية والمؤسسات المانحة والجمعيات التي تجعل عملنا ممكنًا وتعزز أثرنا في حياة الأطفال وأسرهم." })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx(Section, { icon: Building2, title: "المؤسسات العمومية", subtitle: "فاعلون عموميون وجماعات ترابية", items: institutional, accent: "bg-primary/10 text-primary" }),
      /* @__PURE__ */ jsx(Section, { icon: Globe2, title: "المؤسسات المانحة والداعمون", subtitle: "دعم مالي وطني ودولي", items: foundations, accent: "bg-sun/30 text-sun-foreground" }),
      /* @__PURE__ */ jsx(Section, { icon: HeartHandshake, title: "الشبكات الجمعوية", subtitle: "تجمعات واتحادات جمعوية شريكة", items: networks, accent: "bg-earth/15 text-earth" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-10 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "كن شريكًا" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-xl text-muted-foreground", children: "هل تمثل مؤسسة أو شركة أو هيئة مانحة وترغب في دعم دمج الأطفال في وضعية إعاقة ذهنية؟ تواصل معنا." }),
      /* @__PURE__ */ jsx("a", { href: "mailto:wissal.arrahma@gmail.com", className: "mt-6 inline-flex rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:scale-105", dir: "ltr", children: "wissal.arrahma@gmail.com" })
    ] }) })
  ] });
}
export {
  PartnersPage as component
};
