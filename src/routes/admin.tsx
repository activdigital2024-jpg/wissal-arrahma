import { createFileRoute, Outlet, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth.hook";
import {
  LayoutDashboard,
  Users,
  Receipt,
  Settings,
  LogOut,
  ClipboardList,
  UserCog,
  CalendarCheck,
  UserX,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "لوحة الإدارة | جمعية وصال الرحمة" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, isSecretary, isTeacher, canAccessAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!user) navigate({ to: "/admin/login" });
  }, [user, loading, isLoginPage, navigate]);

  if (isLoginPage) return <Outlet />;

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">جارٍ التحميل...</div>;
  }

  if (!user) return null;

  if (!canAccessAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">لا تملك صلاحية الوصول</h1>
        <p className="text-muted-foreground">يجب على المسؤول منحك صلاحية للوصول إلى هذه اللوحة.</p>
        <button
          onClick={async () => {
            await signOut();
            navigate({ to: "/admin/login" });
          }}
          className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
        >
          تسجيل الخروج
        </button>
      </div>
    );
  }

  type AdminPath =
    | "/admin"
    | "/admin/students"
    | "/admin/payments"
    | "/admin/evaluations"
    | "/admin/attendance"
    | "/admin/teacher-absences"
    | "/admin/users"
    | "/admin/settings";
  const allLinks: Array<{
    to: AdminPath;
    label: string;
    icon: typeof LayoutDashboard;
    exact?: boolean;
    adminOnly?: boolean;
    hideForTeacher?: boolean;
  }> = [
    { to: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
    { to: "/admin/students", label: "الطلاب", icon: Users },
    { to: "/admin/attendance", label: "حضور الطلاب", icon: CalendarCheck },
    { to: "/admin/teacher-absences", label: "غياب الأساتذة", icon: UserX },
    { to: "/admin/payments", label: "المدفوعات", icon: Receipt, hideForTeacher: true },
    { to: "/admin/evaluations", label: "التقييمات", icon: ClipboardList },
    { to: "/admin/users", label: "المستخدمون", icon: UserCog, adminOnly: true },
    { to: "/admin/settings", label: "الإعدادات", icon: Settings, adminOnly: true },
  ];
  const links = allLinks.filter((l) => {
    if (l.adminOnly && !isAdmin) return false;
    if (l.hideForTeacher && isTeacher) return false;
    return true;
  });
  void isSecretary;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 border-l bg-card md:block">
        <div className="border-b p-6">
          <h2 className="font-bold">لوحة الإدارة</h2>
          <p className="mt-1 truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              activeOptions={{ exact: l.exact }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/admin/login" });
            }}
            className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </button>
          <Link
            to="/"
            className="mt-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent"
          >
            ← العودة للموقع
          </Link>
        </nav>
      </aside>

      <div className="flex w-full flex-col">
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
          <h2 className="font-bold">الإدارة</h2>
          <div className="flex gap-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                activeOptions={{ exact: l.exact }}
                className="rounded p-2 hover:bg-accent"
              >
                <l.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
