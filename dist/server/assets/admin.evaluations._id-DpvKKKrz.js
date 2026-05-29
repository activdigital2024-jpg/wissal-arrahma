import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useParams, useNavigate, Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { B as Button, c as cn, C as Card } from "./card-C7mc0XoI.js";
import { Loader2, ArrowLeft, Languages, Printer, Pencil, User, Calendar, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import { arSA, fr } from "date-fns/locale";
import { A as ALL_SKILLS, S as SCORE_LEVELS, D as DOMAINS } from "./evaluationSchema-C9KbR3PJ.js";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const T = {
  fr: {
    back: "Retour",
    title: "Évaluation mensuelle",
    titleAr: "تقييم شهري",
    child: "Enfant",
    age: "Âge",
    years: "ans",
    date: "Date",
    educator: "Éducatrice",
    summary: "Synthèse",
    skillsEvaluated: "compétences évaluées",
    notRated: "Non noté",
    observations: "Observations générales",
    recommendations: "Recommandations mensuelles",
    edit: "Modifier",
    print: "Imprimer",
    noObservations: "Aucune observation renseignée.",
    noRecommendations: "Aucune recommandation renseignée.",
    switchLang: "العربية"
  },
  ar: {
    back: "رجوع",
    title: "التقييم الشهري",
    titleAr: "تقييم شهري",
    child: "الطفل(ة)",
    age: "السن",
    years: "سنة",
    date: "التاريخ",
    educator: "المربية",
    summary: "ملخص",
    skillsEvaluated: "مهارات مُقيّمة",
    notRated: "غير مُقيّم",
    observations: "ملاحظات عامة حول أداء الطفل",
    recommendations: "توصيات شهرية",
    edit: "تعديل",
    print: "طباعة",
    noObservations: "لا توجد ملاحظات.",
    noRecommendations: "لا توجد توصيات.",
    switchLang: "Français"
  }
};
const EvaluationView = () => {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { roles } = useAuth();
  const isStaff = roles.includes("admin") || roles.includes("secretary");
  const isParentOnly = !isStaff;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(isParentOnly ? "ar" : "fr");
  const t = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    if (!id) return;
    (async () => {
      let ev;
      {
        const { data: realEv } = await supabase.from("evaluations").select(
          "id, student_id, eval_date, educator_name, ratings, general_notes, recommendations, students(full_name, age)"
        ).eq("id", id).maybeSingle();
        ev = realEv;
      }
      setData(ev);
      setLoading(false);
    })();
  }, [id]);
  const stats = useMemo(() => {
    if (!data)
      return { counts: {}, rated: 0, total: ALL_SKILLS.length };
    const counts = {
      not_observed: 0,
      emerging: 0,
      developing: 0,
      proficient: 0,
      advanced: 0
    };
    let rated = 0;
    ALL_SKILLS.forEach((s) => {
      const v = data.ratings?.[s.key];
      if (v && counts[v] !== void 0) {
        counts[v]++;
        rated++;
      }
    });
    return { counts, rated, total: ALL_SKILLS.length };
  }, [data]);
  if (loading)
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) });
  if (!data) return /* @__PURE__ */ jsx("div", { children: "Évaluation introuvable" });
  const dateLocale = lang === "ar" ? arSA : fr;
  const monthLabel = format(new Date(data.eval_date), "MMMM yyyy", { locale: dateLocale });
  const fullDate = format(new Date(data.eval_date), lang === "ar" ? "d MMMM yyyy" : "d MMMM yyyy", {
    locale: dateLocale
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 print:space-y-4", dir, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap print:hidden", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({ to: ".." }), children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: cn("h-4 w-4", lang === "ar" ? "ml-2 rotate-180" : "mr-2") }),
        t.back
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => setLang(lang === "fr" ? "ar" : "fr"), children: [
          /* @__PURE__ */ jsx(Languages, { className: "h-4 w-4 mr-2" }),
          t.switchLang
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: () => window.print(), children: [
          /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4 mr-2" }),
          t.print
        ] }),
        isStaff && /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: `/admin/evaluations/$id/edit`, params: { id: data.id }, children: [
          /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4 mr-2" }),
          t.edit
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Card,
      {
        className: cn("p-8 bg-gradient-hero text-primary-foreground", lang === "ar" && "font-ar"),
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm opacity-90 mb-2", children: t.title }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl lg:text-4xl font-bold capitalize", children: monthLabel }),
            /* @__PURE__ */ jsx("div", { className: "text-sm opacity-90 mt-1", children: fullDate })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: cn("grid gap-3 text-sm", lang === "ar" && "text-right"), children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-95", children: [
              /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs("span", { className: "opacity-80", children: [
                t.child,
                " :"
              ] }),
              /* @__PURE__ */ jsx("strong", { children: data.students?.full_name ?? "—" })
            ] }),
            data.students?.age != null && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-95", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs("span", { className: "opacity-80", children: [
                t.age,
                " :"
              ] }),
              /* @__PURE__ */ jsxs("strong", { children: [
                data.students.age,
                " ",
                t.years
              ] })
            ] }),
            data.educator_name && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-95", children: [
              /* @__PURE__ */ jsx(GraduationCap, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxs("span", { className: "opacity-80", children: [
                t.educator,
                " :"
              ] }),
              /* @__PURE__ */ jsx("strong", { children: data.educator_name })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(Card, { className: cn("p-6", lang === "ar" && "font-ar"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: t.summary }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
          stats.rated,
          " / ",
          stats.total,
          " ",
          t.skillsEvaluated
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: SCORE_LEVELS.map((l) => {
        const count = stats.counts[l.value];
        const pct = stats.total ? Math.round(count / stats.total * 100) : 0;
        return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border/60 p-3", children: [
          /* @__PURE__ */ jsx("div", { className: cn("inline-block text-xs px-2 py-0.5 rounded-full mb-2", l.color), children: lang === "ar" ? l.label_ar : l.label_fr }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: count }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            pct,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx(
            "progress",
            {
              className: "h-1.5 w-full appearance-none rounded-full",
              value: pct,
              max: 100,
              "aria-hidden": "true"
            }
          ) })
        ] }, l.value);
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: DOMAINS.map((domain) => {
      const domainSkills = domain.skills;
      const ratedInDomain = domainSkills.filter((s) => data.ratings?.[s.key]).length;
      return /* @__PURE__ */ jsxs(
        Card,
        {
          className: cn("overflow-hidden break-inside-avoid", lang === "ar" && "font-ar"),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-primary-soft px-5 py-3 border-b border-border/60 flex items-center justify-between gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-primary text-lg", children: lang === "ar" ? domain.ar : domain.fr }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-primary/70", children: [
                ratedInDomain,
                "/",
                domainSkills.length
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "divide-y divide-border/60", children: domainSkills.map((skill) => {
              const v = data.ratings?.[skill.key];
              const level = v ? SCORE_LEVELS.find((l) => l.value === v) : null;
              const label = lang === "ar" ? skill.ar : skill.fr;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "px-5 py-3 flex items-center justify-between gap-4",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium flex-1", children: label }),
                    level ? /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: cn(
                          "text-xs px-3 py-1.5 rounded-md font-semibold whitespace-nowrap",
                          level.color
                        ),
                        children: lang === "ar" ? level.label_ar : level.label_fr
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "text-xs px-3 py-1.5 rounded-md bg-muted text-muted-foreground whitespace-nowrap", children: t.notRated })
                  ]
                },
                skill.key
              );
            }) })
          ]
        },
        domain.key
      );
    }) }),
    /* @__PURE__ */ jsxs(Card, { className: cn("p-6 break-inside-avoid", lang === "ar" && "font-ar"), children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-3", children: t.observations }),
      data.general_notes ? /* @__PURE__ */ jsx("p", { className: "text-foreground/80 leading-relaxed whitespace-pre-wrap", children: data.general_notes }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground italic", children: t.noObservations })
    ] }),
    /* @__PURE__ */ jsxs(
      Card,
      {
        className: cn(
          "p-6 border-accent/30 bg-accent-soft break-inside-avoid",
          lang === "ar" && "font-ar"
        ),
        children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-3 text-accent", children: t.recommendations }),
          data.recommendations ? /* @__PURE__ */ jsx("p", { className: "text-foreground/85 leading-relaxed whitespace-pre-wrap", children: data.recommendations }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground italic", children: t.noRecommendations })
        ]
      }
    )
  ] });
};
const SplitComponent = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(EvaluationView, {}),
  /* @__PURE__ */ jsx(Outlet, {})
] });
export {
  SplitComponent as component
};
