import { notFound } from "next/navigation";
import Home from "../../sections/Home";
import { getDictionary } from "../../i18n/dictionaries";
import { hasLocale } from "../../i18n/config";

export default async function Page({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Home lang={lang} dict={getDictionary(lang)} />;
}
