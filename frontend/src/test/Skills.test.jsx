import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skills from "../pages/Skills";

describe("Skills", () => {
  it("renders the section title", () => {
    render(<Skills />);
    expect(screen.getByText("//Skills")).toBeInTheDocument();
  });

  it("renders skill categories", () => {
    render(<Skills />);
    expect(screen.getByText("Lenguajes")).toBeInTheDocument();
    expect(screen.getByText("Frameworks y librerías")).toBeInTheDocument();
    expect(screen.getByText("Plataformas")).toBeInTheDocument();
  });

  it("renders individual skills", () => {
    render(<Skills />);
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });
});
