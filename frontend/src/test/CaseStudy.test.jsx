import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import FeaturedProjects from "../components/molecules/FeaturedProjects";
import en from "../i18n/en";

const images = [
  { src: "/a.png", alt: "alt a", caption: "caption a" },
  { src: "/b.png", alt: "alt b", caption: "caption b" },
  { src: "/c.png", alt: "alt c", caption: "caption c" },
];

const items = [
  {
    slug: "uno",
    nombre: "Proyecto Uno",
    descripcion: "desc uno",
    tecnologias: ["React", "Next.js"],
    demoUrl: "https://uno.example.com/",
    repoUrl: "https://github.com/x/uno",
    screenshot: "/projects/uno.png",
    images,
  },
  {
    slug: "dos",
    nombre: "Proyecto Dos",
    descripcion: "desc dos",
    tecnologias: ["Node.js"],
    demoUrl: "https://dos.example.com/",
    screenshot: "/projects/dos.png",
    images: [],
  },
];

beforeEach(() => {
  window.scrollTo = () => {};
});

describe("FeaturedProjects", () => {
  it("renderiza un caso por proyecto con numeración y enlaces", () => {
    render(<FeaturedProjects lang="es" items={items} />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Proyecto Uno" })).toBeInTheDocument();
    expect(screen.getByText("[01]")).toBeInTheDocument();
    expect(screen.getByText("[02]")).toBeInTheDocument();
    const demos = screen.getAllByRole("link", { name: /Ver demo/ });
    expect(demos[0]).toHaveAttribute("href", "https://uno.example.com/");
    const detalles = screen.getAllByRole("link", { name: "ver detalle" });
    expect(detalles[1]).toHaveAttribute("href", "/es/proyectos/dos");
  });

  it("muestra el repositorio solo si existe", () => {
    render(<FeaturedProjects lang="es" items={items} />);
    const repos = screen.getAllByRole("link", { name: "Repositorio" });
    expect(repos).toHaveLength(1);
    expect(repos[0]).toHaveAttribute("href", "https://github.com/x/uno");
  });

  it("usa screenshot como fallback si images está vacía", () => {
    render(<FeaturedProjects lang="es" items={[items[1]]} />);
    const imgs = screen.getAllByRole("img", { hidden: true });
    expect(imgs[0].getAttribute("src")).toContain(
      encodeURIComponent("/projects/dos.png")
    );
  });

  it("cambia la captura activa con el indicador", async () => {
    const user = userEvent.setup();
    render(<FeaturedProjects lang="en" t={en.projects} items={[items[0]]} />);
    const progress = screen.getByRole("list", { name: en.projects.caseProgress });
    const botones = within(progress).getAllByRole("button");
    expect(botones).toHaveLength(3);
    expect(botones[0]).toHaveAttribute("aria-current", "true");
    await user.click(botones[2]);
    expect(botones[2]).toHaveAttribute("aria-current", "true");
    expect(botones[0]).not.toHaveAttribute("aria-current");
    expect(screen.getAllByText("caption c").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "view details" })).toHaveAttribute(
      "href",
      "/en/proyectos/uno"
    );
  });

  it("abre el lightbox al hacer clic en la captura", async () => {
    const user = userEvent.setup();
    render(<FeaturedProjects lang="es" items={[items[0]]} />);
    await user.click(screen.getAllByRole("button", { name: "Ampliar captura" })[0]);
    expect(screen.getByRole("dialog", { name: "Captura ampliada" })).toBeInTheDocument();
  });
});
