import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowLeft, Heart, Users, GraduationCap, Sparkles } from "lucide-react";
import logo from "@/assets/logo.jpg";
import cooking from "@/assets/activity-cooking.jpg";
import art from "@/assets/activity-art.jpg";
import painting from "@/assets/activity-painting.jpg";
import learning from "@/assets/activity-learning.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "وصال الرحمة — دمج الأطفال في وضعية إعاقة ذهنية" },
      {
        name: "description",
        content:
          "جمعية وصال الرحمة بطنجة: التعليم، التأهيل ودمج الأطفال في وضعية إعاقة ذهنية منذ 2011.",
      },
      { property: "og:title", content: "وصال الرحمة — للدمج والتأهيل" },
      { property: "og:description", content: "بناء مجتمع دامج للأطفال في وضعية إعاقة ذهنية." },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: "2011", label: "سنة التأسيس" },
  { value: "5", label: "مجالات التدخل" },
  { value: "+10", label: "شركاء فاعلون" },
  { value: "100%", label: "غير ربحية" },
];

const pillars = [
  {
    icon: GraduationCap,
    title: "التعليم والإدماج",
    text: "برامج تعليمية مكيفة لتعزيز الإدماج المدرسي للأطفال.",
  },
  {
    icon: Sparkles,
    title: "التأهيل والتكوين",
    text: "ورشات عملية لتنمية المهارات وتعزيز الاستقلالية.",
  },
  { icon: Users, title: "دعم الأسر", text: "توعية وتكوين الأسر حول كيفية التعامل مع أطفالهم." },
  {
    icon: Heart,
    title: "المرافعة والشراكات",
    text: "الدفاع عن الحقوق والتعاون مع المؤسسات الوطنية والدولية.",
  },
];

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-sun/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-32 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Heart className="h-3.5 w-3.5" /> منذ 2011 · طنجة، المغرب
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              فرصة متساوية لـ
              <span className="bg-gradient-hero bg-clip-text text-transparent"> كل طفل</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              تعمل جمعية وصال الرحمة على دمج وتعليم وتأهيل الأطفال في وضعية إعاقة ذهنية — التوحد،
              التثلث الصبغي 21، والتأخر الذهني.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/programmes"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:scale-105"
              >
                برامجنا <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-background/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-smooth hover:border-primary hover:bg-primary/5"
              >
                ادعمنا
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={cooking}
                  alt="ورشة الطبخ"
                  className="h-56 w-full rounded-3xl object-cover shadow-warm"
                />
                <img
                  src={art}
                  alt="ورشة الحرف"
                  className="h-40 w-full rounded-3xl object-cover shadow-soft"
                />
              </div>
              <div className="mt-10 space-y-4">
                <img
                  src={painting}
                  alt="ورشة الرسم"
                  className="h-40 w-full rounded-3xl object-cover shadow-soft"
                />
                <img
                  src={learning}
                  alt="التعلم"
                  className="h-56 w-full rounded-3xl object-cover shadow-warm"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-24 w-24 items-center justify-center rounded-2xl bg-card p-3 shadow-elegant sm:flex">
              <img src={logo} alt="الشعار" className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-primary lg:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">عملنا</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            أربعة محاور، هدف واحد
          </h2>
          <p className="mt-4 text-muted-foreground">
            منح الأطفال الأدوات اللازمة للنمو والتعلم والاندماج الكامل في المجتمع.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group rounded-3xl border border-border bg-card p-6 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-hero group-hover:text-primary-foreground">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 shadow-elegant lg:p-16">
          <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-sun/30 blur-2xl" />
          <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
                رسالتنا
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/90">
                توفير بيئة تعليمية وتأهيلية متكاملة لتنمية مهارات الأطفال في وضعية إعاقة ذهنية،
                وتعزيز استقلاليتهم، مع دعم أسرهم ونشر الوعي حول قضايا الإعاقة، وإقامة شراكات لتحسين
                جودة حياتهم وفتح آفاق مستقبلية لهم.
              </p>
            </div>
            <div className="flex items-end">
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary shadow-soft transition-smooth hover:scale-105"
              >
                المزيد <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
