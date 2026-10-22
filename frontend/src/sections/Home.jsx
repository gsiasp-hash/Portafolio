import AnimatedSection from "../components/templates/AnimatedSection";
import Hero from "../components/organisms/Hero";
import About from "../components/organisms/About";
import Skills from "../components/organisms/Skills";
import Projects from "../components/organisms/Projects";
import Contact from "../components/organisms/Contact";
import ScrollToTop from "../components/organisms/ScrollToTop";

export default function Home({ lang, dict }) {
  return (
    <div className="min-h-screen flex flex-col font-mono">
      <Hero t={dict.hero} />
      <AnimatedSection variant="left">
        <About t={dict.about} />
      </AnimatedSection>
      <AnimatedSection variant="up">
        <Skills t={dict.skills} />
      </AnimatedSection>
      <AnimatedSection>
        <Projects lang={lang} t={dict.projects} />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <Contact t={dict.contact} />
      </AnimatedSection>
      <ScrollToTop label={dict.scrollTop} />
    </div>
  );
}
