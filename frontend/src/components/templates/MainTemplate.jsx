import ThemedParticles from "../rb/ThemedParticles";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import CommandPalette from "../organisms/CommandPalette";

export default function MainTemplate({ lang = "es", dict, children }) {
  return (
    <div className="min-h-screen text-ink relative">
      <ThemedParticles />
      <div className="relative z-10">
        <Navbar lang={lang} t={dict?.nav} themeT={dict?.theme} paletteT={dict?.palette} />
        <main>{children}</main>
        <Footer t={dict?.footer} />
        <CommandPalette lang={lang} t={dict?.palette} />
      </div>
    </div>
  );
}
