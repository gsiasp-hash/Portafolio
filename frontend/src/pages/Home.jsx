import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "./Skills";
import Proyectos from "./Proyectos";
import Contacto from "./Contacto";
import ScrollToTop from "../components/ScrollToTop";
import AnimatedSection from "../components/AnimatedSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-mono">
      <Hero />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Proyectos />
      </AnimatedSection>
      <AnimatedSection>
        <Contacto />
      </AnimatedSection>
      <ScrollToTop />
    </div>
  );
}
