import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Eye, Target, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo.jpg";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "من نحن — جمعية وصال الرحمة" },
      {
        name: "description",
        content: "اكتشف رؤية ورسالة وأهداف جمعية وصال الرحمة، التي تأسست سنة 2011 بطنجة.",
      },
      { property: "og:title", content: "من نحن — وصال الرحمة" },
      {
        property: "og:description",
        content: "رؤيتنا ورسالتنا وأهدافنا لدمج الأطفال في وضعية إعاقة ذهنية.",
      },
    ],
  }),
  component: AboutPage,
});

const objectives = [
  "تقديم برامج تعليمية وتأهيلية للأطفال في وضعية إعاقة ذهنية.",
  "دعم الأسر وتقديم التوعية والتكوين حول كيفية التعامل مع أطفالهم.",
  "تعزيز الإدماج الاجتماعي والاقتصادي للأطفال ذوي الإعاقات الذهنية.",
  "السعي إلى إنشاء مركز شامل يقدم خدمات متكاملة للأطفال وأسرهم.",
  "التعاون مع المؤسسات الوطنية والدولية لتعزيز حقوق الأطفال في وضعية إعاقة.",
];

function AboutPage() {
  return (
    <Layout>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-primary">من نحن</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl">
            جمعية ملتزمة منذ سنة 2011
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            جمعية وصال الرحمة منظمة غير ربحية تأسست في 8 أكتوبر 2011، تعنى بدمج وتأهيل الأطفال في
            وضعية إعاقة ذهنية، بما في ذلك طيف التوحد، التثلث الصبغي 21، والتأخر الذهني. نعمل على
            تقديم برامج تعليمية وتأهيلية متكاملة لدعم الأطفال وتمكينهم من الاندماج في المجتمع.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft lg:p-10">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-hero text-primary-foreground">
              <Eye className="h-7 w-7" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">رؤيتنا</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              نطمح إلى بناء مجتمع دامج يُتيح للأطفال في وضعية إعاقة ذهنية فرصًا متساوية للتعلّم،
              التأهيل، والاندماج الاجتماعي والاقتصادي.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft lg:p-10">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-warm text-earth-foreground">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">رسالتنا</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              توفير بيئة تعليمية وتأهيلية متكاملة لتنمية مهارات الأطفال في وضعية إعاقة ذهنية، وتعزيز
              استقلاليتهم، مع دعم أسرهم ونشر الوعي حول قضايا الإعاقة، وإقامة شراكات لتحسين جودة
              حياتهم.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-3xl bg-gradient-hero p-8 shadow-elegant">
              <img
                src={logo}
                alt="الشعار"
                className="mx-auto h-32 w-32 rounded-full bg-background object-contain p-2"
              />
              <p className="mt-6 text-center font-display text-xl font-bold text-primary-foreground">
                وصال الرحمة
              </p>
              <p className="mt-1 text-center text-sm text-primary-foreground/80">
                جمعية وصال الرحمة
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-bold text-foreground">أهدافنا</h2>
            <ul className="mt-6 space-y-4">
              {objectives.map((obj, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-smooth hover:border-primary/40"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-foreground/90">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
