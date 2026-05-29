import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/a-propos", label: "من نحن" },
  { to: "/programmes", label: "برامجنا" },
  { to: "/partenaires", label: "شركاؤنا" },
  { to: "/contact", label: "اتصل بنا" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="شعار جمعية وصال الرحمة"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-foreground sm:text-lg">
              وصال الرحمة
            </div>
            <div className="text-xs text-muted-foreground">للدمج والتأهيل</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary bg-primary/10" }}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-smooth hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="ms-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-accent"
          >
            الإدارة
          </Link>
          <Link
            to="/contact"
            className="ms-2 rounded-full bg-gradient-hero px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-smooth hover:scale-105"
          >
            ادعمنا
          </Link>
        </nav>

        <button
          aria-label="القائمة"
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-foreground hover:bg-accent md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary bg-primary/10" }}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
