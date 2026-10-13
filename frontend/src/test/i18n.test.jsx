import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import es from "../i18n/es";
import en from "../i18n/en";
import Hero from "../components/organisms/Hero";
import Skills from "../components/organisms/Skills";
import { getProyectoPorSlug } from "../data/proyectos";

function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? keys(v, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  );
}

describe("i18n", () => {
  it("es y en tienen las mismas claves", () => {
    expect(keys(en).sort()).toEqual(keys(es).sort());
  });

  it("renderiza el Hero en inglés", () => {
    render(<Hero t={en.hero} />);
    expect(screen.getByText("View Projects")).toBeInTheDocument();
    expect(screen.getByText("Contact me")).toBeInTheDocument();
  });

  it("traduce los grupos de skills", () => {
    render(<Skills t={en.skills} />);
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText(/Agentic programming/)).toBeInTheDocument();
  });

  it("localiza los textos de proyectos", () => {
    expect(getProyectoPorSlug("pizzeria", "en").descripcion).toMatch(/pizza ordering/);
    expect(getProyectoPorSlug("pizzeria", "es").descripcion).toMatch(/pedidos de pizza/);
  });
});
