import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getProyectos } from "../data/proyectos";
import { getGaleria } from "../data/galeria";

describe("galerías de proyectos", () => {
  it("cada imagen existe en public y tiene alt y caption en ambos idiomas", () => {
    for (const { slug } of getProyectos()) {
      for (const lang of ["es", "en"]) {
        for (const { src, alt, caption } of getGaleria(slug, lang)) {
          expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
          expect(alt).toBeTruthy();
          expect(caption).toBeTruthy();
        }
      }
    }
  });
});
