import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import About from "../components/organisms/About";
import Skills from "../components/organisms/Skills";
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";
import ContactCard from "../components/molecules/ContactCard";
import ContactForm from "../components/molecules/ContactForm";
import MobileMenu from "../components/molecules/MobileMenu";
import AnimatedSection from "../components/templates/AnimatedSection";
import en from "../i18n/en";

describe("About", () => {
  it("muestra cifras, trayectoria y tarjetas", () => {
    render(<About />);
    expect(screen.getByLabelText("10+")).toBeInTheDocument();
    expect(screen.getByText("años en audio y producción en vivo")).toBeInTheDocument();
    expect(screen.getByText(/Trayectoria/)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText("Titulado Front End")).toBeInTheDocument();
  });

  it("renderiza en inglés", () => {
    render(<About t={en.about} />);
    expect(screen.getByText(/Journey/)).toBeInTheDocument();
    expect(screen.getByText("Audio and live production")).toBeInTheDocument();
  });
});

describe("Skills", () => {
  it("expone la cinta de tecnologías con etiqueta accesible", () => {
    render(<Skills />);
    expect(screen.getByRole("img", { name: /^Tecnologías: HTML/ })).toBeInTheDocument();
  });
});

describe("ContactForm validación", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("muestra pistas de validación y no envía datos inválidos", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /enviar mensaje/i }));
    expect(await screen.findByText("mínimo 2 caracteres")).toBeInTheDocument();
    expect(screen.getByText("revisa el formato del email")).toBeInTheDocument();
    expect(screen.getByText("mínimo 10 caracteres")).toBeInTheDocument();
    expect(screen.getByLabelText(/\[nombre\]/)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("cuenta los caracteres del mensaje", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/\[mensaje\]/), "hola");
    expect(screen.getByText("4/2000")).toBeInTheDocument();
  });
});

describe("ContactCard", () => {
  it("copia el valor y confirma", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(<ContactCard copy label="Email" value="a@b.cl" />);
    await user.click(screen.getByRole("button", { name: /copiar email/i }));
    expect(writeText).toHaveBeenCalledWith("a@b.cl");
    expect(await screen.findByText("[copiado]")).toBeInTheDocument();
  });
});

describe("Navbar y MobileMenu", () => {
  it("renderiza enlaces y abre el menú móvil", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: "Skills" }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link", { name: "Sobre mi", hidden: true })).toBeTruthy();
    const toggle = screen.getByRole("button", { name: "Abrir menú" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("link", { name: "Proyectos" })).toHaveLength(2);
  });

  it("marca el enlace activo con aria-current", () => {
    const links = [{ id: "skills", label: "Skills", href: "/es#skills" }];
    render(<MobileMenu open links={links} activeId="skills" onClose={() => {}} />);
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
      "aria-current",
      "location"
    );
  });

  it("no monta el menú cuando está cerrado", () => {
    const links = [{ id: "skills", label: "Skills", href: "/es#skills" }];
    render(<MobileMenu open={false} links={links} onClose={() => {}} />);
    expect(screen.queryByRole("link", { name: "Skills" })).not.toBeInTheDocument();
  });
});

describe("Footer y AnimatedSection", () => {
  it("renderiza los enlaces del footer", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: "Enlaces" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
  });

  it("renderiza hijos con cada variante", () => {
    for (const variant of ["fade", "up", "left", "right", "scale"]) {
      const { unmount } = render(
        <AnimatedSection variant={variant}>
          <p>{variant}</p>
        </AnimatedSection>
      );
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    }
  });
});
