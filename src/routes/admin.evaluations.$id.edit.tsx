import { createFileRoute } from "@tanstack/react-router";
import EvaluationForm from "@/components/EvaluationForm";

export const Route = createFileRoute("/admin/evaluations/$id/edit")({
  component: EvaluationForm,
});
