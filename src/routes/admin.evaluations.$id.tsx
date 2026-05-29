import { createFileRoute, Outlet } from "@tanstack/react-router";
import EvaluationView from "@/components/EvaluationView";

export const Route = createFileRoute("/admin/evaluations/$id")({
  component: () => (
    <>
      <EvaluationView />
      <Outlet />
    </>
  ),
});
