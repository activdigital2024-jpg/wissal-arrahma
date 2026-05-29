import { createFileRoute, Outlet } from "@tanstack/react-router";
import Evaluations from "@/components/Evaluations";

export const Route = createFileRoute("/admin/evaluations")({
  component: () => (
    <>
      <Evaluations />
      <Outlet />
    </>
  ),
});
