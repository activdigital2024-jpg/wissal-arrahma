import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { GraduationCap, Sparkles, Users, Megaphone, Briefcase } from "lucide-react";
import cooking from "@/assets/activity-cooking.jpg";
import art from "@/assets/activity-art.jpg";
import painting from "@/assets/activity-painting.jpg";
import learning from "@/assets/activity-learning.jpg";

export const Route = createFileRoute("/programmes")({
  head: () => ({
    meta: [
      { title: "برامجنا — وصال الرحمة" },
      {
        name: "description",
        content: "التعليم، التأهيل، دعم الأسر والمرافعة: اكتشف مجالات تدخل جمعية وصال الرحمة.",
      },
      { property: "og:title", content: "البرامج ومجالات التدخل" },
      {
        property: "og:description",
        content: "خمسة محاور للعمل من أجل دمج الأطفال في وضعية إعاقة ذهنية.",
      },
    ],
  }),
  component: ProgramsPage,
});

const domains = [
  {
    icon: GraduationCap,
    title: "التعليم والإدماج المدرسي",
    text: "برامج تعليمية مكيفة ومواكبة للأطفال نحو الإدماج المدرسي.",
  },
  {
    icon: Sparkles,
    title: "التأهيل والتكوين",
    text: "ورشات عملية (طبخ، رسم، حرف يدوية) لتنمية الاستقلالية والمهارات.",
  },
  {
    icon: Users,
    title: "الدعم الأسري والتوعية المجتمعية",
    text: "توعية وتكوين الأسر للتكفل بأطفالهم بشكل أفضل.",
  },
  {
    icon: Megaphone,
    title: "المرافعة والشراكات",
    text: "الدفاع عن الحقوق والتعاون مع المؤسسات الوطنية والدولية.",
  },
  {
    icon: Briefcase,
    title: "الإدماج الاجتماعي والاقتصادي",
    text: "إعداد الأطفال لحياة مستقلة وتيسير اندماجهم الاقتصادي.",
  },
];

const activities = [
  {
    img: cooking,
    title: "ورشة الطبخ — Chef Fadoua",
    text: "تعلم أساسيات فن الطبخ بإشراف من شيف محترف.",
  },
  {
    img: art,
    title: "ورشة الحرف اليدوية",
    text: "العمل اليدوي والإبداعي لتحفيز المهارات الحركية الدقيقة والتركيز.",
  },
  { img: painting, title: "ورشة الرسم", text: "التعبير الفني وتنمية الإبداع." },
  { img: learning, title: "تعلم فردي", text: "متابعة بيداغوجية مكيفة مع إيقاع كل طفل." },
];

function ProgramsPage() {
  return (
    <Layout>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-primary">برامجنا</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl">
            خمسة مجالات للتدخل
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            مقاربة شاملة تجمع بين التعليم والتأهيل ودعم الأسر لتغيير حياة الأطفال بشكل دائم.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <div
              key={d.title}
              className={`rounded-3xl border border-border bg-card p-7 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant ${i === 0 ? "lg:row-span-2 lg:bg-gradient-hero lg:text-primary-foreground" : ""}`}
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? "lg:bg-background/20 lg:text-primary-foreground" : "bg-primary/10 text-primary"}`}
              >
                <d.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">{d.title}</h3>
              <p
                className={`mt-3 ${i === 0 ? "lg:text-primary-foreground/90" : "text-muted-foreground"}`}
              >
                {d.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          ورشاتنا في صور
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          لمحة عن الحياة اليومية والأنشطة العملية المقدمة للمستفيدين.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {activities.map((a) => (
            <article
              key={a.title}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-smooth hover:shadow-elegant"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={a.img}
                  alt={a.title}
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
