import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, MapPin, Phone, Facebook, Globe } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "اتصل بنا — وصال الرحمة" },
      {
        name: "description",
        content:
          "تواصل مع جمعية وصال الرحمة بطنجة: العنوان، الهواتف، البريد الإلكتروني وشبكات التواصل.",
      },
      { property: "og:title", content: "اتصل بنا — وصال الرحمة" },
      {
        property: "og:description",
        content: "برانص 1، زنقة Z رقم 03، طنجة. هاتف، بريد إلكتروني وشبكات اجتماعية.",
      },
    ],
  }),
  component: ContactPage,
});

const contacts = [
  {
    icon: MapPin,
    label: "العنوان",
    value: "برانص 1، زنقة Z رقم 03، طنجة",
    href: "https://maps.google.com/?q=Branes+1+Tanger",
    ltr: false,
  },
  {
    icon: Phone,
    label: "الهاتف",
    value: "+212 6 74 16 46 77",
    href: "tel:+212674164677",
    extra: ["+212 6 63 17 70 13", "+212 5 39 33 15 52"],
    ltr: true,
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "wissal.arrahma@gmail.com",
    href: "mailto:wissal.arrahma@gmail.com",
    ltr: true,
  },
  {
    icon: Globe,
    label: "الموقع الإلكتروني",
    value: "www.wissalarrahma.com",
    href: "https://www.wissalarrahma.com",
    ltr: true,
  },
  {
    icon: Facebook,
    label: "فيسبوك",
    value: "Association.wissal.arrahma",
    href: "https://facebook.com/Association.wissal.arrahma",
    ltr: true,
  },
];

function ContactPage() {
  return (
    <Layout>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-primary">لنبقى على تواصل</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl">
            اتصل بنا
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            هل لديك سؤال أو مشروع شراكة أو ترغب في دعم أنشطتنا؟ فريقنا في خدمتك.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group rounded-2xl border border-border bg-card p-6 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-medium text-foreground" dir={c.ltr ? "ltr" : undefined}>
                  {c.value}
                </div>
                {c.extra && (
                  <div className="mt-2 space-y-0.5 text-sm text-muted-foreground" dir="ltr">
                    {c.extra.map((e) => (
                      <div key={e}>{e}</div>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-elegant">
            <h2 className="font-display text-2xl font-bold">ادعم رسالتنا</h2>
            <p className="mt-3 text-primary-foreground/90">
              كل مساهمة لها قيمتها: تبرع، تطوع، رعاية ورشة، أو مجرد مشاركة عملنا على شبكات التواصل.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" /> تقديم تبرع مالي
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" /> الانخراط كمتطوع
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" /> رعاية ورشة
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" /> اقتراح شراكة
              </li>
            </ul>
            <a
              href="mailto:wissal.arrahma@gmail.com"
              className="mt-6 inline-flex rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-smooth hover:scale-105"
            >
              راسلنا
            </a>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
