import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Building2, Globe2, HeartHandshake } from "lucide-react";

import ads from "@/assets/partners/ads.jpg";
import regionTTA from "@/assets/partners/region-tta.jpg";
import provinceTanger from "@/assets/partners/province-tanger.jpg";
import communeTanger from "@/assets/partners/commune-tanger.jpg";
import wilayaTanger from "@/assets/partners/wilaya-tanger.jpg";
import mokataaSouani from "@/assets/partners/mokataa-souani.jpg";
import maagdenhuis from "@/assets/partners/maagdenhuis.jpg";
import fondationFrance from "@/assets/partners/fondation-france.jpg";
import fairmont from "@/assets/partners/fairmont.jpg";
import araCora from "@/assets/partners/ara-cora.jpg";
import unionHandicap from "@/assets/partners/union-handicap.jpg";
import collectifAutisme from "@/assets/partners/collectif-autisme.jpg";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: "شركاؤنا — وصال الرحمة" },
      {
        name: "description",
        content: "المؤسسات والمؤسسات المانحة والجمعيات التي تدعم عمل وصال الرحمة بطنجة.",
      },
      { property: "og:title", content: "شركاء جمعية وصال الرحمة" },
      { property: "og:description", content: "معًا من أجل الأطفال في وضعية إعاقة ذهنية." },
    ],
  }),
  component: PartnersPage,
});

type Partner = { name: string; logo: string };

const institutional: Partner[] = [
  { name: "وكالة التنمية الاجتماعية", logo: ads },
  { name: "جهة طنجة-تطوان-الحسيمة", logo: regionTTA },
  { name: "عمالة طنجة-أصيلة", logo: provinceTanger },
  { name: "الجماعة الحضرية لطنجة", logo: communeTanger },
  { name: "ولاية طنجة", logo: wilayaTanger },
  { name: "مقاطعة السواني", logo: mokataaSouani },
];

const foundations: Partner[] = [
  { name: "Stichting Het R.C. Maagdenhuis", logo: maagdenhuis },
  { name: "Fondation de France", logo: fondationFrance },
  { name: "Fairmont Tazi Palace Tangier", logo: fairmont },
  { name: "ARA CORA", logo: araCora },
];

const networks: Partner[] = [
  { name: "اتحاد الجمعيات العاملة في مجال الإعاقة بولاية طنجة", logo: unionHandicap },
  {
    name: "التحالف الجهوي للجمعيات العاملة في مجال التوحد — طنجة-تطوان-الحسيمة",
    logo: collectifAutisme,
  },
];

function LogoCard({ p }: { p: Partner }) {
  return (
    <div className="group flex flex-col items-center justify-between rounded-2xl border border-border bg-card p-5 transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant">
      <div className="flex h-24 w-full items-center justify-center">
        <img
          src={p.logo}
          alt={p.name}
          loading="lazy"
          className="max-h-20 w-auto max-w-[85%] object-contain transition-smooth group-hover:scale-105"
        />
      </div>
      <p className="mt-4 text-center text-xs font-medium leading-snug text-muted-foreground">
        {p.name}
      </p>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  subtitle,
  items,
  accent,
}: {
  icon: typeof Building2;
  title: string;
  subtitle: string;
  items: Partner[];
  accent: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {items.map((p) => (
          <LogoCard key={p.name} p={p} />
        ))}
      </div>
    </div>
  );
}

function PartnersPage() {
  return (
    <Layout>
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="text-sm font-semibold text-primary">معًا</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-foreground sm:text-5xl">
            شركاؤنا
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            شبكة من المؤسسات العمومية والمؤسسات المانحة والجمعيات التي تجعل عملنا ممكنًا وتعزز أثرنا
            في حياة الأطفال وأسرهم.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <Section
          icon={Building2}
          title="المؤسسات العمومية"
          subtitle="فاعلون عموميون وجماعات ترابية"
          items={institutional}
          accent="bg-primary/10 text-primary"
        />
        <Section
          icon={Globe2}
          title="المؤسسات المانحة والداعمون"
          subtitle="دعم مالي وطني ودولي"
          items={foundations}
          accent="bg-sun/30 text-sun-foreground"
        />
        <Section
          icon={HeartHandshake}
          title="الشبكات الجمعوية"
          subtitle="تجمعات واتحادات جمعوية شريكة"
          items={networks}
          accent="bg-earth/15 text-earth"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">كن شريكًا</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            هل تمثل مؤسسة أو شركة أو هيئة مانحة وترغب في دعم دمج الأطفال في وضعية إعاقة ذهنية؟ تواصل
            معنا.
          </p>
          <a
            href="mailto:wissal.arrahma@gmail.com"
            className="mt-6 inline-flex rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:scale-105"
            dir="ltr"
          >
            wissal.arrahma@gmail.com
          </a>
        </div>
      </section>
    </Layout>
  );
}
