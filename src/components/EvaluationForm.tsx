import { useEffect, useState, type FormEvent } from "react";
import { isDemoMode } from "@/lib/demoConfig";
import { useNavigate, useParams } from "@tanstack/react-router";

import { supabase } from "@/integrations/localdb/client";
import { useAuth } from "@/hooks/useAuth.hook";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { DOMAINS, SCORE_LEVELS, ScoreLevel } from "@/lib/evaluationSchema";
import { cn } from "@/lib/utils";

import { Child } from "./Children";

interface ChildLite {
  id: string;
  full_name: string;
  educator_name: string | null;
}

interface EvaluationRecord {
  id: string;
  student_id: string;
  eval_date: string;
  educator_name: string | null;
  ratings: Record<string, ScoreLevel> | null;
  general_notes: string | null;
  recommendations: string | null;
}

const EvaluationForm = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams({ strict: false });
  const { user, roles } = useAuth();
  const isStaff =
    roles.includes("admin") || roles.includes("secretary") || roles.includes("teacher");
  const readOnly = !isStaff;

  const [children, setChildren] = useState<ChildLite[]>([]);
  const [childId, setChildId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [educator, setEducator] = useState("");
  const [scores, setScores] = useState<Record<string, ScoreLevel>>({});
  const [notes, setNotes] = useState("");
  const [recos, setRecos] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      let kids;
      if (isDemoMode) {
        const mockKidsStr = localStorage.getItem("mock_children");
        const rawKids: Child[] = mockKidsStr ? JSON.parse(mockKidsStr) : [];
        kids = rawKids.map((c) => ({
          id: c.id,
          full_name: c.full_name,
          educator_name: c.educator_name,
        }));
      } else {
        const { data: realKids, error: kidsError } = await supabase
          .from("students")
          .select("id, full_name, educator_name")
          .order("full_name");
        if (kidsError) {
          console.error("Failed to load students:", kidsError);
        }
        kids = (realKids ?? []) as ChildLite[];
      }
      setChildren((kids ?? []) as ChildLite[]);

      if (editId) {
        let ev: EvaluationRecord | null = null;
        if (isDemoMode) {
          // Mock empty for demo edit
          ev = null;
        } else {
          const realResult = (await supabase
            .from("evaluations")
            .select("*")
            .eq("id", editId)
            .maybeSingle()) as {
            data: EvaluationRecord | null;
            error: { message: string } | null;
          };
          ev = realResult.data;
        }
        if (ev) {
          setChildId(ev.student_id);
          setDate(ev.eval_date);
          setEducator(ev.educator_name ?? "");
          setScores(ev.ratings ?? {});
          setNotes(ev.general_notes ?? "");
          setRecos(ev.recommendations ?? "");
        }
      }
      setLoading(false);
    };
    load();
  }, [editId]);

  useEffect(() => {
    if (!editId && childId && !educator) {
      const c = children.find((x) => x.id === childId);
      if (c?.educator_name) setEducator(c.educator_name);
    }
  }, [childId, children, editId, educator]);

  const setScore = (key: string, level: ScoreLevel) => {
    setScores((s) => ({ ...s, [key]: level }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!childId) {
      toast.error("Sélectionnez un enfant — يرجى اختيار الطفل");
      return;
    }
    setSaving(true);
    const payload = {
      student_id: childId,
      eval_date: date,
      educator_name: educator || null,
      ratings: scores,
      general_notes: notes || null,
      recommendations: recos || null,
      created_by: user?.id ?? null,
      month: new Date(date).getMonth() + 1,
      year: new Date(date).getFullYear(),
    };
    let error: { message: string } | null = null;
    let data: { id?: string } | null = null;
    if (isDemoMode) {
      // Mock save success in demo - generate id, stay on form
      data = { id: editId || crypto.randomUUID() };
    } else {
      const result = (await (editId
        ? supabase.from("evaluations").update(payload).eq("id", editId).select("id").maybeSingle()
        : supabase.from("evaluations").insert(payload).select("id").maybeSingle())) as {
        data: { id?: string } | null;
        error: { message: string } | null;
      };
      error = result.error;
      data = result.data;
    }
    setSaving(false);
    if (error) {
      const isPermissionError =
        error.message?.includes("policy") ||
        error.message?.includes("permission") ||
        error.message?.includes("denied");
      if (isPermissionError) {
        toast.error("Vous n'avez pas la permission d'effectuer cette action — ليس لديك الإذن");
      } else {
        toast.error(`${error.message} — فشل الحفظ`);
      }
      console.error("Save error:", error);
      return;
    }
    const savedId = data?.id ?? editId;
    if (!savedId) {
      toast.error("Impossible de récupérer l'ID de l'évaluation — تعذر الحصول على معرف التقييم");
      return;
    }
    const successMessage = editId
      ? "Évaluation enregistrée — تم حفظ التقييم"
      : "Évaluation créée — تم إنشاء التقييم";
    toast.success(successMessage);
    navigate({ to: `/admin/evaluations/${savedId}` });
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate({ to: ".." })}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour
      </Button>

      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-bold">
            {readOnly ? "Évaluation" : editId ? "Modifier l'évaluation" : "Nouvelle évaluation"}
          </h1>
          <p className="text-muted-foreground font-ar mt-1" dir="rtl">
            تقييم شهري
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="evaluation-child">
                Enfant —{" "}
                <span className="font-ar" dir="rtl">
                  اسم الطفل *
                </span>
              </Label>
              <Select
                name="student_id"
                value={childId}
                onValueChange={setChildId}
                disabled={readOnly || !!editId}
              >
                <SelectTrigger id="evaluation-child">
                  <SelectValue placeholder="Choisir un enfant" />
                </SelectTrigger>
                <SelectContent>
                  {children.length > 0 ? (
                    children.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.full_name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">Aucun enfant disponible</div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="evaluation-date">
                Date —{" "}
                <span className="font-ar" dir="rtl">
                  التاريخ
                </span>
              </Label>
              <Input
                id="evaluation-date"
                name="eval_date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={readOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evaluation-educator">
                Éducatrice —{" "}
                <span className="font-ar" dir="rtl">
                  المربية
                </span>
              </Label>
              <Input
                id="evaluation-educator"
                name="educator_name"
                value={educator}
                onChange={(e) => setEducator(e.target.value)}
                disabled={readOnly}
              />
            </div>
          </div>
        </Card>

        {/* Légende */}
        <div className="flex flex-wrap gap-2">
          {SCORE_LEVELS.map((l) => (
            <div
              key={l.value}
              className={cn("text-xs px-3 py-1.5 rounded-full font-medium", l.color)}
            >
              {l.label_fr}{" "}
              <span className="font-ar opacity-90 ml-1" dir="rtl">
                {l.label_ar}
              </span>
            </div>
          ))}
        </div>

        {DOMAINS.map((domain) => (
          <Card key={domain.key} className="overflow-hidden">
            <div className="bg-primary-soft px-5 py-3 border-b border-border/60 flex items-center justify-between">
              <h3 className="font-bold text-primary">{domain.fr}</h3>
              <span className="font-ar text-primary text-lg" dir="rtl">
                {domain.ar}
              </span>
            </div>
            <div className="divide-y divide-border/60">
              {domain.skills.map((skill) => {
                const current = scores[skill.key];
                return (
                  <div key={skill.key} className="px-5 py-3 grid md:grid-cols-2 gap-3 items-center">
                    <div>
                      <div className="text-sm font-medium">{skill.fr}</div>
                      <div className="text-sm font-ar text-muted-foreground" dir="rtl">
                        {skill.ar}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:justify-end">
                      {SCORE_LEVELS.map((l) => {
                        const active = current === l.value;
                        return (
                          <button
                            key={l.value}
                            type="button"
                            disabled={readOnly}
                            onClick={() => setScore(skill.key, l.value)}
                            className={cn(
                              "text-xs px-2.5 py-1.5 rounded-md font-medium transition-all border",
                              active
                                ? `${l.color} border-transparent shadow-soft`
                                : "bg-card text-muted-foreground border-border hover:border-primary/40",
                              readOnly && "opacity-60 cursor-default",
                            )}
                          >
                            {l.label_fr}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}

        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="evaluation-notes">
              Observations générales —{" "}
              <span className="font-ar" dir="rtl">
                ملاحظات عامة حول أداء الطفل
              </span>
            </Label>
            <Textarea
              id="evaluation-notes"
              name="general_notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={readOnly}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="evaluation-recos">
              Recommandations mensuelles —{" "}
              <span className="font-ar" dir="rtl">
                توصيات شهرية
              </span>
            </Label>
            <Textarea
              id="evaluation-recos"
              name="recommendations"
              rows={4}
              value={recos}
              onChange={(e) => setRecos(e.target.value)}
              disabled={readOnly}
            />
          </div>
        </Card>

        {!readOnly && (
          <div className="flex justify-end gap-3 sticky bottom-4">
            <Button type="button" variant="ghost" onClick={() => navigate({ to: ".." })}>
              Annuler
            </Button>
            <Button type="submit" disabled={saving} size="lg" className="shadow-elevated">
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Enregistrer
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EvaluationForm;
