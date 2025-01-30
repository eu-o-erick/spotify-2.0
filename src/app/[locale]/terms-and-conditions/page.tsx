import { useTranslations } from "next-intl";

export default function TermsAndConditionsPage() {
  const t = useTranslations("TermsPage");

  return (
    <main className="container py-24 flex-1 max-sm:py-12">
      <h1 className="text-3xl mb-3 opacity-80 max-sm:text-xl">{t("title")}</h1>
      <p className="mb-20 opacity-60 max-sm:mb-16 max-sm:text-sm">
        {t("desc")}
      </p>
      <ul>
        {t
          .raw("sections")
          .map((section: { title: string; desc: string }, index: number) => (
            <li key={index}>
              <h3 className="text-xl opacity-80 max-sm:text-base">
                {section.title}
              </h3>
              <p className="mb-10 opacity-60 max-sm:text-xs">{section.desc}</p>
            </li>
          ))}
      </ul>
      <p className="text-lg opacity-50 max-sm:text-sm">{t("end")}</p>
    </main>
  );
}
