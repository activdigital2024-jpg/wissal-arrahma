import { useEffect, useMemo, useState } from "react";
import { isDemoMode } from "@/lib/demoConfig";
import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/localdb/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  Pencil,
  Printer,
  User,
  Calendar,
  GraduationCap,
  Languages,
} from "lucide-react";
import { format } from "date-fns";
import { fr, arSA } from "date-fns/locale";
import { DOMAINS, SCORE_LEVELS, ScoreLevel, ALL_SKILLS } from "@/lib/evaluationSchema";
import { cn } from "@/lib/utils";

type Lang = "fr" | "ar";

interface EvalData {
  id: string;
  student_id: string;
  eval_date: string;
  educator_name: string | null;
  ratings: Record<string, ScoreLevel>;
  general_notes: string | null;
  recommendations: string | null;
  students: { full_name: string; age: number | null } | null;
}

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
    switchLang: "العربية",
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
    switchLang: "Français",
  },
};

const EvaluationView = () => {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { roles } = useAuth();
  const isStaff = roles.includes("admin") || roles.includes("secretary");
  const isParentOnly = !isStaff;

  const [data, setData] = useState<EvalData | null>(null);
  const [loading, setLoading] = useState(true);
  // Les parents arrivent en arabe par défaut (langue de l'évaluation),
  // le staff démarre en français.
  const [lang, setLang] = useState<Lang>(isParentOnly ? "ar" : "fr");
  const t = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (!id) return;
    (async () => {
      let ev;
      if (isDemoMode) {
        // Mock: evaluation not found in demo
        ev = null;
      } else {
        const { data: realEv } = await supabase
          .from("evaluations")
          .select(
            "id, student_id, eval_date, educator_name, ratings, general_notes, recommendations, students(full_name, age)",
          )
          .eq("id", id)
          .maybeSingle();
        ev = realEv;
      }
      setData(ev as unknown as EvalData);
      setLoading(false);
    })();
  }, [id]);

  const stats = useMemo(() => {
    if (!data)
      return { counts: {} as Record<ScoreLevel, number>, rated: 0, total: ALL_SKILLS.length };
    const counts: Record<ScoreLevel, number> = {
      not_observed: 0,
      emerging: 0,
      developing: 0,
      proficient: 0,
      advanced: 0,
    };
    let rated = 0;
    ALL_SKILLS.forEach((s) => {
      const v = data.ratings?.[s.key] as ScoreLevel;
      if (v && counts[v] !== undefined) {
        counts[v]++;
        rated++;
      }
    });
    return { counts, rated, total: ALL_SKILLS.length };
  }, [data]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  if (!data) return <div>Évaluation introuvable</div>;

  const dateLocale = lang === "ar" ? arSA : fr;
  const monthLabel = format(new Date(data.eval_date), "MMMM yyyy", { locale: dateLocale });
  const fullDate = format(new Date(data.eval_date), lang === "ar" ? "d MMMM yyyy" : "d MMMM yyyy", {
    locale: dateLocale,
  });

  return (
    <div className="space-y-6 print:space-y-4" dir={dir}>
      {/* Header actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap print:hidden">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: ".." })}>
          <ArrowLeft className={cn("h-4 w-4", lang === "ar" ? "ml-2 rotate-180" : "mr-2")} />
          {t.back}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setLang(lang === "fr" ? "ar" : "fr")}>
            <Languages className="h-4 w-4 mr-2" />
            {t.switchLang}
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            {t.print}
          </Button>
          {isStaff && (
            <Button asChild size="sm">
              <Link to={`/admin/evaluations/$id/edit`} params={{ id: data.id }}>
                <Pencil className="h-4 w-4 mr-2" />
                {t.edit}
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Hero */}
      <Card
        className={cn("p-8 bg-gradient-hero text-primary-foreground", lang === "ar" && "font-ar")}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm opacity-90 mb-2">{t.title}</div>
            <h1 className="text-3xl lg:text-4xl font-bold capitalize">{monthLabel}</h1>
            <div className="text-sm opacity-90 mt-1">{fullDate}</div>
          </div>
          <div className={cn("grid gap-3 text-sm", lang === "ar" && "text-right")}>
            <div className="flex items-center gap-2 opacity-95">
              <User className="h-4 w-4" />
              <span className="opacity-80">{t.child} :</span>
              <strong>{data.students?.full_name ?? "—"}</strong>
            </div>
            {data.students?.age != null && (
              <div className="flex items-center gap-2 opacity-95">
                <Calendar className="h-4 w-4" />
                <span className="opacity-80">{t.age} :</span>
                <strong>
                  {data.students.age} {t.years}
                </strong>
              </div>
            )}
            {data.educator_name && (
              <div className="flex items-center gap-2 opacity-95">
                <GraduationCap className="h-4 w-4" />
                <span className="opacity-80">{t.educator} :</span>
                <strong>{data.educator_name}</strong>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Synthèse — répartition des niveaux */}
      <Card className={cn("p-6", lang === "ar" && "font-ar")}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="font-bold text-lg">{t.summary}</h2>
          <div className="text-sm text-muted-foreground">
            {stats.rated} / {stats.total} {t.skillsEvaluated}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SCORE_LEVELS.map((l) => {
            const count = stats.counts[l.value];
            const pct = stats.total ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={l.value} className="rounded-lg border border-border/60 p-3">
                <div className={cn("inline-block text-xs px-2 py-0.5 rounded-full mb-2", l.color)}>
                  {lang === "ar" ? l.label_ar : l.label_fr}
                </div>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs text-muted-foreground">{pct}%</div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <progress
                    className="h-1.5 w-full appearance-none rounded-full"
                    value={pct}
                    max={100}
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Domaines */}
      <div className="space-y-4">
        {DOMAINS.map((domain) => {
          const domainSkills = domain.skills;
          const ratedInDomain = domainSkills.filter((s) => data.ratings?.[s.key]).length;
          return (
            <Card
              key={domain.key}
              className={cn("overflow-hidden break-inside-avoid", lang === "ar" && "font-ar")}
            >
              <div className="bg-primary-soft px-5 py-3 border-b border-border/60 flex items-center justify-between gap-3 flex-wrap">
                <h3 className="font-bold text-primary text-lg">
                  {lang === "ar" ? domain.ar : domain.fr}
                </h3>
                <span className="text-xs text-primary/70">
                  {ratedInDomain}/{domainSkills.length}
                </span>
              </div>
              <div className="divide-y divide-border/60">
                {domainSkills.map((skill) => {
                  const v = data.ratings?.[skill.key];
                  const level = v ? SCORE_LEVELS.find((l) => l.value === v) : null;
                  const label = lang === "ar" ? skill.ar : skill.fr;
                  return (
                    <div
                      key={skill.key}
                      className="px-5 py-3 flex items-center justify-between gap-4"
                    >
                      <div className="text-sm font-medium flex-1">{label}</div>
                      {level ? (
                        <div
                          className={cn(
                            "text-xs px-3 py-1.5 rounded-md font-semibold whitespace-nowrap",
                            level.color,
                          )}
                        >
                          {lang === "ar" ? level.label_ar : level.label_fr}
                        </div>
                      ) : (
                        <div className="text-xs px-3 py-1.5 rounded-md bg-muted text-muted-foreground whitespace-nowrap">
                          {t.notRated}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Observations */}
      <Card className={cn("p-6 break-inside-avoid", lang === "ar" && "font-ar")}>
        <h3 className="font-bold text-lg mb-3">{t.observations}</h3>
        {data.general_notes ? (
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
            {data.general_notes}
          </p>
        ) : (
          <p className="text-muted-foreground italic">{t.noObservations}</p>
        )}
      </Card>

      {/* Recommandations */}
      <Card
        className={cn(
          "p-6 border-accent/30 bg-accent-soft break-inside-avoid",
          lang === "ar" && "font-ar",
        )}
      >
        <h3 className="font-bold text-lg mb-3 text-accent">{t.recommendations}</h3>
        {data.recommendations ? (
          <p className="text-foreground/85 leading-relaxed whitespace-pre-wrap">
            {data.recommendations}
          </p>
        ) : (
          <p className="text-muted-foreground italic">{t.noRecommendations}</p>
        )}
      </Card>
    </div>
  );
};

export default EvaluationView;
