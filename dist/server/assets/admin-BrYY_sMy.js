import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation, Outlet, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { u as useAuth } from "./useAuth.hook-D6Sd3qL-.js";
import { LayoutDashboard, Users, CalendarCheck, UserX, Receipt, ClipboardList, UserCog, Settings, LogOut } from "lucide-react";
import "./router-CprX-nqu.js";
import "sonner";
function AdminLayout() {
  const {
    user,
    isAdmin,
    isSecretary,
    isTeacher,
    canAccessAdmin,
    loading,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";
  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!user) navigate({
      to: "/admin/login"
    });
  }, [user, loading, isLoginPage, navigate]);
  if (isLoginPage) return /* @__PURE__ */ jsx(Outlet, {});
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center", children: "جارٍ التحميل..." });
  }
  if (!user) return null;
  if (!canAccessAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "لا تملك صلاحية الوصول" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "يجب على المسؤول منحك صلاحية للوصول إلى هذه اللوحة." }),
      /* @__PURE__ */ jsx("button", { onClick: async () => {
        await signOut();
        navigate({
          to: "/admin/login"
        });
      }, className: "rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground", children: "تسجيل الخروج" })
    ] });
  }
  const allLinks = [{
    to: "/admin",
    label: "الرئيسية",
    icon: LayoutDashboard,
    exact: true
  }, {
    to: "/admin/students",
    label: "الطلاب",
    icon: Users
  }, {
    to: "/admin/attendance",
    label: "حضور الطلاب",
    icon: CalendarCheck
  }, {
    to: "/admin/teacher-absences",
    label: "غياب الأساتذة",
    icon: UserX
  }, {
    to: "/admin/payments",
    label: "المدفوعات",
    icon: Receipt,
    hideForTeacher: true
  }, {
    to: "/admin/evaluations",
    label: "التقييمات",
    icon: ClipboardList
  }, {
    to: "/admin/users",
    label: "المستخدمون",
    icon: UserCog,
    adminOnly: true
  }, {
    to: "/admin/settings",
    label: "الإعدادات",
    icon: Settings,
    adminOnly: true
  }];
  const links = allLinks.filter((l) => {
    if (l.adminOnly && !isAdmin) return false;
    if (l.hideForTeacher && isTeacher) return false;
    return true;
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden w-64 shrink-0 border-l bg-card md:block", children: [
      /* @__PURE__ */ jsxs("div", { className: "border-b p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "لوحة الإدارة" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 truncate text-xs text-muted-foreground", children: user.email })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-1 p-3", children: [
        links.map((l) => /* @__PURE__ */ jsxs(Link, { to: l.to, activeProps: {
          className: "bg-primary text-primary-foreground"
        }, activeOptions: {
          exact: l.exact
        }, className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent", children: [
          /* @__PURE__ */ jsx(l.icon, { className: "h-4 w-4" }),
          l.label
        ] }, l.to)),
        /* @__PURE__ */ jsxs("button", { onClick: async () => {
          await signOut();
          navigate({
            to: "/admin/login"
          });
        }, className: "mt-4 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10", children: [
          /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
          "تسجيل الخروج"
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-accent", children: "← العودة للموقع" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b bg-card px-4 py-3 md:hidden", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "الإدارة" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: links.map((l) => /* @__PURE__ */ jsx(Link, { to: l.to, activeProps: {
          className: "bg-primary text-primary-foreground"
        }, activeOptions: {
          exact: l.exact
        }, className: "rounded p-2 hover:bg-accent", children: /* @__PURE__ */ jsx(l.icon, { className: "h-4 w-4" }) }, l.to)) })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  AdminLayout as component
};
