import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { s as supabase } from "./router-CprX-nqu.js";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { B as Button, C as Card } from "./card-C7mc0XoI.js";
import { Plus, Loader2, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const Evaluations = () => {
  const { roles } = useAuth();
  const navigate = useNavigate();
  const isStaff = roles.includes("admin") || roles.includes("secretary") || roles.includes("teacher");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let data = [];
      {
        const { data: realData } = await supabase.from("evaluations").select("id, eval_date, educator_name, student_id, students(full_name)").order("eval_date", { ascending: false });
        data = realData ?? [];
      }
      setItems(data);
      setLoading(false);
    })();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Évaluations" }),
        /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
          items.length,
          " évaluation",
          items.length !== 1 ? "s" : ""
        ] })
      ] }),
      isStaff && /* @__PURE__ */ jsxs(Button, { onClick: () => navigate({ to: "/admin/evaluations/new" }), children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-2" }),
        " Nouvelle"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }) }) : items.length === 0 ? /* @__PURE__ */ jsxs(Card, { className: "p-12 text-center", children: [
      /* @__PURE__ */ jsx(ClipboardList, { className: "h-12 w-12 mx-auto text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Aucune évaluation encore." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((e) => /* @__PURE__ */ jsx(Card, { className: "p-4 hover:shadow-elevated transition-all", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/admin/evaluations/$id`,
        params: { id: e.id },
        className: "flex items-center justify-between gap-4",
        children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold", children: e.students?.full_name ?? "—" }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground capitalize", children: [
              format(new Date(e.eval_date), "MMMM yyyy", { locale: fr }),
              e.educator_name && ` • ${e.educator_name}`
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", children: "Voir" })
        ]
      }
    ) }, e.id)) })
  ] });
};
const SplitComponent = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Evaluations, {}),
  /* @__PURE__ */ jsx(Outlet, {})
] });
export {
  SplitComponent as component
};
