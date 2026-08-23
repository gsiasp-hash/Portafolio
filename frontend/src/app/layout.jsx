import { Analytics } from "@vercel/analytics/react";
import MainTemplate from "../components/templates/MainTemplate";
import ScrollProgress from "../components/organisms/ScrollProgress";
import "../css/style.css";

export const metadata = {
  metadataBase: new URL("https://guillermosias.dev"),
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
    url: "https://guillermosias.dev",
    siteName: "GS.portfolio",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guillermo Sias | Full Stack Developer",
    description:
      "Portafolio de Guillermo Sias - Full Stack Developer especializado en JavaScript, React y Node.js.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: "#020617",
};

const themeInitScript = `(function(){try{if(localStorage.getItem("theme")!=="light"){document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ScrollProgress />
        <div className="min-h-screen text-ink relative">
          <Analytics />
          <MainTemplate>{children}</MainTemplate>
        </div>
      </body>
    </html>
  );
}
