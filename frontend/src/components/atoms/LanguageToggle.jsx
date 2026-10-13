"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, locales } from "../../i18n/config";

export default function LanguageToggle({ lang, t, className = "" }) {
  const pathname = usePathname() || `/${lang}`;
  const next = locales.find((locale) => locale !== lang);
  const segments = pathname.split("/");
  segments[1] = next;
  const href = segments.join("/") || `/${next}`;

  const remember = () => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <Link
      href={href}
      hrefLang={next}
      lang={next}
      onClick={remember}
      aria-label={t.switchLanguage}
      className={`text-xs text-mute hover:text-accent transition-colors duration-200 cursor-pointer select-none ${className}`}
    >
      {t.languageLabel}
    </Link>
  );
}
