import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MainTemplate from "../../components/templates/MainTemplate";
import ScrollProgress from "../../components/organisms/ScrollProgress";
import ChatWidget from "../../components/organisms/ChatWidget";
import { notFound } from "next/navigation";
import { getDictionary } from "../../i18n/dictionaries";
import { hasLocale, locales } from "../../i18n/config";
import "../../css/style.css";

const SITE_URL = "https://portfolio-cydert.vercel.app";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: "Guillermo Sias" }],
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.ogDescription,
      siteName: "GS.portfolio",
      locale: meta.ogLocale,
      url: `/${lang}`,
      images: [
        {
          url: "/og-image.png",
          width: 1199,
          height: 693,
          alt: "Guillermo Sias — Full Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.ogDescription,
      images: ["/og-image.png"],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport = {
  themeColor: "#fdfcfc",
};

const themeInitScript = `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: "Guillermo Sias",
                  jobTitle: "Full Stack Developer",
                  url: SITE_URL,
                  email: "g.siasp@gmail.com",
                  sameAs: [
                    "https://linkedin.com/in/guillermo-sias-762775180",
                    "https://github.com/gsiasp-hash",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: `${SITE_URL}/${lang}`,
                  name: dict.meta.siteName,
                  description: dict.meta.description,
                  inLanguage: lang,
                  author: { "@id": `${SITE_URL}/#person` },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <ScrollProgress />
        <div className="min-h-screen text-ink relative">
          <Analytics />
          <SpeedInsights />
          <MainTemplate lang={lang} dict={dict}>
            {children}
          </MainTemplate>
        </div>
        <ChatWidget t={dict.chat} />
      </body>
    </html>
  );
}
