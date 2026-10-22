import ThemedParticles from "../rb/ThemedParticles";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function MainTemplate({ lang = "es", dict, children }) {
  return (
    <div className="min-h-screen text-ink relative">
      <ThemedParticles />
      <div className="relative z-10">
        <Navbar lang={lang} t={dict?.nav} themeT={dict?.theme} />
        <main>{children}</main>
        <Footer t={dict?.footer} />
      </div>
    </div>
  );
}
