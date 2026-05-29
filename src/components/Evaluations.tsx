import { useEffect, useState } from "react";
import { isDemoMode } from "@/lib/demoConfig";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/localdb/client";
import { useAuth } from "@/hooks/useAuth.hook";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Loader2, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface EvalRow {
  id: string;
  eval_date: string;
  educator_name: string | null;
  student_id: string;
  students: { full_name: string } | null;
}

const Evaluations = () => {
  const { roles } = useAuth();
  const navigate = useNavigate();
  const isStaff =
    roles.includes("admin") || roles.includes("secretary") || roles.includes("teacher");
  const [items, setItems] = useState<EvalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let data: EvalRow[] = [];
      if (isDemoMode) {
        // Mock empty list in demo mode
        data = [];
      } else {
        const { data: realData } = await supabase
          .from("evaluations")
          .select("id, eval_date, educator_name, student_id, students(full_name)")
          .order("eval_date", { ascending: false });
        data = (realData as unknown as EvalRow[]) ?? [];
      }
      setItems(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Évaluations</h1>
          <p className="text-muted-foreground mt-1">
            {items.length} évaluation{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        {isStaff && (
          <Button onClick={() => navigate({ to: "/admin/evaluations/new" })}>
            <Plus className="h-4 w-4 mr-2" /> Nouvelle
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center">
          <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Aucune évaluation encore.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((e) => (
            <Card key={e.id} className="p-4 hover:shadow-elevated transition-all">
              <Link
                to={`/admin/evaluations/$id`}
                params={{ id: e.id }}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-bold">{e.students?.full_name ?? "—"}</div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {format(new Date(e.eval_date), "MMMM yyyy", { locale: fr })}
                    {e.educator_name && ` • ${e.educator_name}`}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Voir
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Evaluations;
