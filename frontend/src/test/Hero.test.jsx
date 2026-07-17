import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "../components/Hero";

describe("Hero", () => {
  it("renders the name", () => {
    render(<Hero />);
    expect(screen.getByText("GUILLERMO")).toBeInTheDocument();
    expect(screen.getByText("SIAS")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Full Stack Developer en formación/)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Ver Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Contactame")).toBeInTheDocument();
  });
});
