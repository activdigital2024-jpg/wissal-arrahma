import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { initializeDemoData } from "@/lib/demoData";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "جمعية وصال الرحمة" },
      {
        name: "description",
        content: "جمعية وصال الرحمة لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية — طنجة",
      },
      { name: "author", content: "Association Wissal Arrahma" },
      { property: "og:title", content: "جمعية وصال الرحمة" },
      {
        property: "og:description",
        content: "جمعية وصال الرحمة لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية — طنجة",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "جمعية وصال الرحمة" },
      {
        name: "twitter:description",
        content: "جمعية وصال الرحمة لدمج وتأهيل الأطفال في وضعية إعاقة ذهنية — طنجة",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/36be52b0-84ba-42ba-8bda-9144bbb21ec5/id-preview-ad237cf2--1cef1ed3-9f7c-495b-bc08-b6375cc1c05a.lovable.app-1778665332717.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/36be52b0-84ba-42ba-8bda-9144bbb21ec5/id-preview-ad237cf2--1cef1ed3-9f7c-495b-bc08-b6375cc1c05a.lovable.app-1778665332717.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/sonner";

function RootComponent() {
  useEffect(() => {
    initializeDemoData();
  }, []);

  return (
    <AuthProvider>
      <Outlet />
      <Toaster richColors position="top-center" />
    </AuthProvider>
  );
}
