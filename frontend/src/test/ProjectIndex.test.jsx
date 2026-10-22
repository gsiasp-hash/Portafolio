import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProjectIndex from "../components/molecules/ProjectIndex";
import es from "../i18n/es";

const items = [
  {
    slug: "uno",
    nombre: "Proyecto Uno",
    descripcion: "Descripción uno",
    tecnologias: ["React", "Node.js"],
    demoUrl: "https://uno.example.com",
    repoUrl: "https://github.com/x/uno",
    screenshot: "/projects/uno.png",
    images: [
      { src: "/projects/uno/a.png", alt: "A", caption: "a" },
      { src: "/projects/uno/b.png", alt: "B", caption: "b" },
    ],
  },
  {
    slug: "dos",
    nombre: "Proyecto Dos",
    descripcion: "Descripción dos",
    tecnologias: ["HTML"],
    demoUrl: "https://dos.example.com",
    screenshot: "/projects/dos.png",
    images: [],
  },
];

const setHover = (matches) => {
  window.matchMedia = (query) => ({
    matches,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  });
};

const forceFocusVisible = () => {
  const matches = Element.prototype.matches;
  vi.spyOn(Element.prototype, "matches").mockImplementation(function (selector) {
    return selector === ":focus-visible" ? true : matches.call(this, selector);
  });
};

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

describe("ProjectIndex", () => {
  it("no renderiza nada sin items", () => {
    const { container } = render(<ProjectIndex items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  describe("con hover (escritorio)", () => {
    it("lista filas con enlace al detalle y repo opcional", () => {
      setHover(true);
      render(<ProjectIndex lang="en" t={es.projects} items={items} />);
      expect(
        screen.getByRole("list", { name: es.projects.indexListLabel })
      ).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
      expect(screen.getByRole("link", { name: /Proyecto Uno/ })).toHaveAttribute(
        "href",
        "/en/proyectos/uno"
      );
      expect(screen.getAllByRole("link", { name: /Código/ })).toHaveLength(1);
      expect(screen.getAllByRole("link", { name: /Ver demo/ })).toHaveLength(2);
    });

    it("muestra la vista previa con el foco de teclado y la oculta al salir", () => {
      setHover(true);
      forceFocusVisible();
      render(<ProjectIndex items={items} />);
      const preview = screen.getByTestId("cursor-preview");
      expect(preview).toHaveAttribute("data-visible", "false");
      const link = screen.getByRole("link", { name: /Proyecto Uno/ });
      act(() => link.focus());
      expect(preview).toHaveAttribute("data-visible", "true");
      expect(preview.querySelectorAll("img")).toHaveLength(3);
      expect(preview.querySelector("img[alt=A]")).toHaveClass("opacity-100");
      act(() => link.blur());
      expect(preview).toHaveAttribute("data-visible", "false");
    });

    it("usa el screenshot cuando no hay galería", () => {
      setHover(true);
      forceFocusVisible();
      render(<ProjectIndex items={items} />);
      act(() => screen.getByRole("link", { name: /Proyecto Dos/ }).focus());
      const imgs = screen.getByTestId("cursor-preview").querySelectorAll("img");
      expect(imgs[2]).toHaveClass("opacity-100");
      expect(imgs[0]).toHaveClass("opacity-0");
    });
  });

  describe("sin hover (táctil)", () => {
    it("expande y colapsa la fila al tocar", () => {
      setHover(false);
      render(<ProjectIndex items={items} />);
      expect(screen.queryByTestId("cursor-preview")).not.toBeInTheDocument();
      const toggle = screen.getByRole("button", { name: /Proyecto Uno/ });
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      expect(screen.getAllByRole("link", { name: /ver detalle/ })[0]).toHaveAttribute(
        "href",
        "/es/proyectos/uno"
      );
      fireEvent.click(screen.getByRole("button", { name: /Proyecto Dos/ }));
      expect(toggle).toHaveAttribute("aria-expanded", "false");
    });
  });
});
