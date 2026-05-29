import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { s as supabase } from "./router-CprX-nqu.js";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { c as cn, B as Button, C as Card } from "./card-C7mc0XoI.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, Check, ChevronUp, Loader2, ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { S as SCORE_LEVELS, D as DOMAINS } from "./evaluationSchema-C9KbR3PJ.js";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const EvaluationForm = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams({ strict: false });
  const { user, roles } = useAuth();
  const isStaff = roles.includes("admin") || roles.includes("secretary") || roles.includes("teacher");
  const readOnly = !isStaff;
  const [children, setChildren] = useState([]);
  const [childId, setChildId] = useState("");
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [educator, setEducator] = useState("");
  const [scores, setScores] = useState({});
  const [notes, setNotes] = useState("");
  const [recos, setRecos] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const load = async () => {
      let kids;
      {
        const { data: realKids, error: kidsError } = await supabase.from("students").select("id, full_name, educator_name").order("full_name");
        if (kidsError) {
          console.error("Failed to load students:", kidsError);
        }
        kids = realKids ?? [];
      }
      setChildren(kids ?? []);
      if (editId) {
        let ev = null;
        {
          const realResult = await supabase.from("evaluations").select("*").eq("id", editId).maybeSingle();
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
  const setScore = (key, level) => {
    setScores((s) => ({ ...s, [key]: level }));
  };
  const submit = async (e) => {
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
      year: new Date(date).getFullYear()
    };
    let error = null;
    let data = null;
    {
      const result = await (editId ? supabase.from("evaluations").update(payload).eq("id", editId).select("id").maybeSingle() : supabase.from("evaluations").insert(payload).select("id").maybeSingle());
      error = result.error;
      data = result.data;
    }
    setSaving(false);
    if (error) {
      const isPermissionError = error.message?.includes("policy") || error.message?.includes("permission") || error.message?.includes("denied");
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
    const successMessage = editId ? "Évaluation enregistrée — تم حفظ التقييم" : "Évaluation créée — تم إنشاء التقييم";
    toast.success(successMessage);
    navigate({ to: `/admin/evaluations/${savedId}` });
  };
  if (loading)
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate({ to: ".." }), children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
      " Retour"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-baseline justify-between flex-wrap gap-2", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: readOnly ? "Évaluation" : editId ? "Modifier l'évaluation" : "Nouvelle évaluation" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground font-ar mt-1", dir: "rtl", children: "تقييم شهري" })
    ] }) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
      /* @__PURE__ */ jsx(Card, { className: "p-6 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "evaluation-child", children: [
            "Enfant —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-ar", dir: "rtl", children: "اسم الطفل *" })
          ] }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              name: "student_id",
              value: childId,
              onValueChange: setChildId,
              disabled: readOnly || !!editId,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { id: "evaluation-child", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choisir un enfant" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: children.length > 0 ? children.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id, children: c.full_name }, c.id)) : /* @__PURE__ */ jsx("div", { className: "p-2 text-sm text-muted-foreground", children: "Aucun enfant disponible" }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "evaluation-date", children: [
            "Date —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-ar", dir: "rtl", children: "التاريخ" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "evaluation-date",
              name: "eval_date",
              type: "date",
              value: date,
              onChange: (e) => setDate(e.target.value),
              disabled: readOnly
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "evaluation-educator", children: [
            "Éducatrice —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-ar", dir: "rtl", children: "المربية" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "evaluation-educator",
              name: "educator_name",
              value: educator,
              onChange: (e) => setEducator(e.target.value),
              disabled: readOnly
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: SCORE_LEVELS.map((l) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn("text-xs px-3 py-1.5 rounded-full font-medium", l.color),
          children: [
            l.label_fr,
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-ar opacity-90 ml-1", dir: "rtl", children: l.label_ar })
          ]
        },
        l.value
      )) }),
      DOMAINS.map((domain) => /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-primary-soft px-5 py-3 border-b border-border/60 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-primary", children: domain.fr }),
          /* @__PURE__ */ jsx("span", { className: "font-ar text-primary text-lg", dir: "rtl", children: domain.ar })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "divide-y divide-border/60", children: domain.skills.map((skill) => {
          const current = scores[skill.key];
          return /* @__PURE__ */ jsxs("div", { className: "px-5 py-3 grid md:grid-cols-2 gap-3 items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: skill.fr }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-ar text-muted-foreground", dir: "rtl", children: skill.ar })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 md:justify-end", children: SCORE_LEVELS.map((l) => {
              const active = current === l.value;
              return /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  disabled: readOnly,
                  onClick: () => setScore(skill.key, l.value),
                  className: cn(
                    "text-xs px-2.5 py-1.5 rounded-md font-medium transition-all border",
                    active ? `${l.color} border-transparent shadow-soft` : "bg-card text-muted-foreground border-border hover:border-primary/40",
                    readOnly && "opacity-60 cursor-default"
                  ),
                  children: l.label_fr
                },
                l.value
              );
            }) })
          ] }, skill.key);
        }) })
      ] }, domain.key)),
      /* @__PURE__ */ jsxs(Card, { className: "p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "evaluation-notes", children: [
            "Observations générales —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-ar", dir: "rtl", children: "ملاحظات عامة حول أداء الطفل" })
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "evaluation-notes",
              name: "general_notes",
              rows: 4,
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              disabled: readOnly
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "evaluation-recos", children: [
            "Recommandations mensuelles —",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-ar", dir: "rtl", children: "توصيات شهرية" })
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "evaluation-recos",
              name: "recommendations",
              rows: 4,
              value: recos,
              onChange: (e) => setRecos(e.target.value),
              disabled: readOnly
            }
          )
        ] })
      ] }),
      !readOnly && /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-3 sticky bottom-4", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => navigate({ to: ".." }), children: "Annuler" }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", disabled: saving, size: "lg", className: "shadow-elevated", children: [
          saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4 mr-2" }),
          "Enregistrer"
        ] })
      ] })
    ] })
  ] });
};
export {
  EvaluationForm as E
};
