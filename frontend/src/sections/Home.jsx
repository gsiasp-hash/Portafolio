import AnimatedSection from "../components/templates/AnimatedSection";
import Hero from "../components/organisms/Hero";
import About from "../components/organisms/About";
import Skills from "../components/organisms/Skills";
import Projects from "../components/organisms/Projects";
import Contact from "../components/organisms/Contact";
import ScrollToTop from "../components/organisms/ScrollToTop";

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
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
      <ScrollToTop />
    </div>
  );
}
