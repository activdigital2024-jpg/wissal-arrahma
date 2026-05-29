/**
 * Demo data initialization for testing without a database
 */
import { Child } from "@/components/Children";

export const DEMO_CHILDREN: Child[] = [
  {
    id: "demo-1",
    full_name: "أحمد محمد",
    educator_name: "فاطمة علي",
    status: "active",
    enrollment_date: "2024-01-15",
  },
  {
    id: "demo-2",
    full_name: "ليلى عبد الرحمن",
    educator_name: "مريم حسن",
    status: "active",
    enrollment_date: "2024-02-10",
  },
  {
    id: "demo-3",
    full_name: "علي محمود",
    educator_name: "نور سارة",
    status: "active",
    enrollment_date: "2024-03-01",
  },
];

export function initializeDemoData() {
  const mockKidsStr = localStorage.getItem("mock_children");
  if (!mockKidsStr) {
    localStorage.setItem("mock_children", JSON.stringify(DEMO_CHILDREN));
  }
}
