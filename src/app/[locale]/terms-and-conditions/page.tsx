import { useTranslations } from "next-intl";

export default function TermsAndConditions() {
  const t = useTranslations("TermsPage");

  return (
    <main className="container py-24 flex-1">
      <h1 className="text-3xl mb-3 opacity-80">{t("title")}</h1>
      <p className="mb-20 opacity-60">{t("desc")}</p>
      <ul className="space-y-2">
        {t
          .raw("sections")
          .map((section: { title: string; desc: string }, index: number) => (
            <li key={index} className="">
              <h3 className="text-xl opacity-80">{section.title}</h3>
              <p className="mb-10 opacity-60">{section.desc}</p>
            </li>
          ))}
      </ul>
      <p className="text-lg opacity-50">{t("end")}</p>
    </main>
  );
}
