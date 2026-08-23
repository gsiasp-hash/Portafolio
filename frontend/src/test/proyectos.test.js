import { describe, expect, it } from "vitest";
import { getProyectoPorSlug, getProyectos } from "../data/proyectos";

describe("capa de datos de proyectos", () => {
  it("retorna la lista completa de proyectos", () => {
    const proyectos = getProyectos();
    expect(proyectos.length).toBeGreaterThanOrEqual(4);
  });

  it("cada proyecto tiene slug único y datos completos", () => {
    const proyectos = getProyectos();
    const slugs = proyectos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const proyecto of proyectos) {
      expect(proyecto.nombre).toBeTruthy();
      expect(proyecto.descripcion).toBeTruthy();
      expect(proyecto.resumen.length).toBeGreaterThanOrEqual(1);
      expect(proyecto.imagen).toMatch(/^https?:\/\//);
      expect(proyecto.repoUrl).toMatch(/^https?:\/\//);
    }
  });

  it("encuentra un proyecto por slug y retorna undefined si no existe", () => {
    const pizzeria = getProyectoPorSlug("pizzeria");
    expect(pizzeria.nombre).toBe("Pizzeria");

    expect(getProyectoPorSlug("no-existe")).toBeUndefined();
  });
});
