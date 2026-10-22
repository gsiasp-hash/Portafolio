import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Gallery from "../components/molecules/Gallery";
import ProjectsGrid from "../components/molecules/ProjectsGrid";
import es from "../i18n/es";

const images = [
  { src: "/a.png", alt: "uno", caption: "Primera" },
  { src: "/b.png", alt: "dos", caption: "Segunda" },
  { src: "/c.png", alt: "tres", caption: "Tercera" },
];

const openLightbox = () =>
  fireEvent.click(screen.getAllByRole("button", { name: es.projects.openLightbox })[0]);

describe("Gallery", () => {
  it("muestra la primera captura y su caption", () => {
    render(<Gallery images={images} />);
    expect(screen.getByText("Primera")).toBeInTheDocument();
    expect(screen.getByText("1 de 3")).toBeInTheDocument();
  });

  it("navega con flechas del teclado y limita en los extremos", () => {
    render(<Gallery images={images} />);
    const region = screen.getByRole("region", {
      name: es.projects.galleryLabel,
    });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByText("Segunda")).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowRight" });
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByText("Tercera")).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(screen.getByText("Segunda")).toBeInTheDocument();
  });

  it("navega con miniaturas y botones", () => {
    render(<Gallery images={images} />);
    fireEvent.click(screen.getByRole("button", { name: `${es.projects.goToShot} 3` }));
    expect(screen.getByText("Tercera")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: es.projects.nextShot })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: es.projects.prevShot }));
    expect(screen.getByText("Segunda")).toBeInTheDocument();
  });

  it("con una sola imagen no muestra controles", () => {
    render(<Gallery images={images.slice(0, 1)} />);
    expect(screen.queryByRole("button", { name: es.projects.nextShot })).toBeNull();
    expect(screen.queryByRole("group", { name: es.projects.thumbnails })).toBeNull();
  });

  it("abre el lightbox, navega con teclado y cierra con Escape", () => {
    render(<Gallery images={images} />);
    openLightbox();
    const dialog = screen.getByRole("dialog", {
      name: es.projects.lightboxLabel,
    });
    expect(within(dialog).getByRole("button", { name: /Cerrar/ })).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByAltText("dos")).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("atrapa el foco dentro del lightbox", () => {
    render(<Gallery images={images} />);
    openLightbox();
    const dialog = screen.getByRole("dialog");
    const buttons = within(dialog).getAllByRole("button");
    buttons[buttons.length - 1].focus();
    fireEvent.keyDown(dialog, { key: "Tab" });
    expect(buttons[0]).toHaveFocus();
    fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(buttons[buttons.length - 1]).toHaveFocus();
  });

  it("cierra el lightbox con el botón", () => {
    render(<Gallery images={images} />);
    openLightbox();
    fireEvent.click(screen.getByRole("button", { name: /Cerrar/ }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("ProjectsGrid", () => {
  const base = { descripcion: "d", images: [] };
  const items = [
    {
      ...base,
      slug: "a",
      nombre: "Alfa",
      imagen: "/a.png",
      tecnologias: ["React", "Node"],
    },
    { ...base, slug: "b", nombre: "Beta", imagen: "/b.png", tecnologias: ["React"] },
    { ...base, slug: "c", nombre: "Gamma", imagen: "/c.png", tecnologias: ["Node"] },
  ];

  it("filtra por tecnología y restablece con Todos", async () => {
    render(<ProjectsGrid items={items} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    const filtro = screen.getByRole("group", { name: es.projects.filterLabel });
    fireEvent.click(within(filtro).getByRole("button", { name: "Node" }));
    expect(screen.getByText("Gamma")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("Beta")).toBeNull());
    fireEvent.click(within(filtro).getByRole("button", { name: /Todos/ }));
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });
});
