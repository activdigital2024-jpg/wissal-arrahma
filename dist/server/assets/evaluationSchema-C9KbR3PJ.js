const SCORE_LEVELS = [
  {
    value: "not_observed",
    label_fr: "Non observé",
    label_ar: "غير ملاحظ",
    color: "bg-red-50 text-red-700"
  },
  {
    value: "emerging",
    label_fr: "Émergent",
    label_ar: "ناشئ",
    color: "bg-orange-50 text-orange-700"
  },
  {
    value: "developing",
    label_fr: "En développement",
    label_ar: "في التطور",
    color: "bg-yellow-50 text-yellow-700"
  },
  {
    value: "proficient",
    label_fr: "Compétent",
    label_ar: "مختص",
    color: "bg-green-50 text-green-700"
  },
  {
    value: "advanced",
    label_fr: "Avancé",
    label_ar: "متقدم",
    color: "bg-blue-50 text-blue-700"
  }
];
const DOMAINS = [
  {
    key: "physical_development",
    fr: "Développement physique",
    ar: "التطور البدني",
    skills: [
      { key: "pd_gross_motor", fr: "Motricité globale", ar: "المهارات الحركية الكبرى" },
      { key: "pd_fine_motor", fr: "Motricité fine", ar: "المهارات الحركية الدقيقة" },
      { key: "pd_health", fr: "Santé et hygiène", ar: "الصحة والنظافة" }
    ]
  },
  {
    key: "emotional_social",
    fr: "Développement émotionnel et social",
    ar: "التطور العاطفي والاجتماعي",
    skills: [
      { key: "es_emotions", fr: "Reconnaissance des émotions", ar: "التعرف على المشاعر" },
      { key: "es_cooperation", fr: "Coopération", ar: "التعاون" },
      { key: "es_relationships", fr: "Relations interpersonnelles", ar: "العلاقات الشخصية" }
    ]
  },
  {
    key: "cognitive",
    fr: "Développement cognitif",
    ar: "التطور المعرفي",
    skills: [
      { key: "cog_memory", fr: "Mémoire", ar: "الذاكرة" },
      { key: "cog_problem_solving", fr: "Résolution de problèmes", ar: "حل المشاكل" },
      { key: "cog_learning", fr: "Capacité d'apprentissage", ar: "القدرة على التعلم" }
    ]
  },
  {
    key: "language",
    fr: "Développement langagier",
    ar: "التطور اللغوي",
    skills: [
      { key: "lang_comprehension", fr: "Compréhension", ar: "الفهم" },
      { key: "lang_expression", fr: "Expression", ar: "التعبير" },
      { key: "lang_vocabulary", fr: "Vocabulaire", ar: "المفردات" }
    ]
  }
];
const ALL_SKILLS = DOMAINS.flatMap((d) => d.skills);
export {
  ALL_SKILLS as A,
  DOMAINS as D,
  SCORE_LEVELS as S
};
