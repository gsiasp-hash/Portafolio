import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MainTemplate from "../components/templates/MainTemplate";
import ScrollProgress from "../components/organisms/ScrollProgress";
import ChatWidget from "../components/organisms/ChatWidget";
import "../css/style.css";

export const metadata = {
  metadataBase: new URL("https://portfolio-cydert.vercel.app"),
  title: "Guillermo Sias | Full Stack Developer",
  description:
    "Portafolio de Guillermo Sias - Full Stack Developer especializado en JavaScript, React y Node.js. Ingeniero en Sonido con 10+ años en tecnología.",
  keywords: [
    "Guillermo Sias",
    "Full Stack Developer",
    "JavaScript",
    "React",
    "Node.js",
    "Tailwind",
    "portafolio",
    "developer",
  ],
  authors: [{ name: "Guillermo Sias" }],
  openGraph: {
    type: "website",
    title: "Guillermo Sias | Full Stack Developer",
    description:
      "Portafolio de Guillermo Sias - Full Stack Developer especializado en JavaScript, React y Node.js.",
    siteName: "GS.portfolio",
    locale: "es_AR",
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
    title: "Guillermo Sias | Full Stack Developer",
    description:
      "Portafolio de Guillermo Sias - Full Stack Developer especializado en JavaScript, React y Node.js.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#fdfcfc",
};

const themeInitScript = `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
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
                  "@id": "https://portfolio-cydert.vercel.app/#person",
                  name: "Guillermo Sias",
                  jobTitle: "Full Stack Developer",
                  url: "https://portfolio-cydert.vercel.app",
                  email: "g.siasp@gmail.com",
                  sameAs: [
                    "https://linkedin.com/in/guillermo-sias-762775180",
                    "https://github.com/gsiasp-hash",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://portfolio-cydert.vercel.app/#website",
                  url: "https://portfolio-cydert.vercel.app",
                  name: "Guillermo Sias — Portafolio",
                  description:
                    "Portafolio de Guillermo Sias - Full Stack Developer especializado en JavaScript, React y Node.js. Ingeniero en Sonido con 10+ años en tecnología.",
                  author: { "@id": "https://portfolio-cydert.vercel.app/#person" },
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
          <MainTemplate>{children}</MainTemplate>
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
