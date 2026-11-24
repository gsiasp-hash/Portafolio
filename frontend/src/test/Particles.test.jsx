import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("ogl", () => ({
  Renderer: class {
    constructor() {
      throw new Error("unable to create webgl context");
    }
  },
  Camera: class {},
  Geometry: class {},
  Program: class {},
  Mesh: class {},
}));

import Particles from "../components/rb/Particles";

describe("Particles", () => {
  it("no rompe la app si no se puede crear el contexto WebGL", () => {
    expect(() => render(<Particles />)).not.toThrow();
  });
});
