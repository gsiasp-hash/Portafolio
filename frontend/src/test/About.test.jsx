import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "../components/About";

describe("About", () => {
  it("renders the section title", () => {
    render(<About />);
    expect(screen.getByText("//Sobre mi")).toBeInTheDocument();
  });

  it("renders the bio text", () => {
    render(<About />);
    expect(
      screen.getByText(/Ingeniero en Sonido y Desarrollador Full Stack/)
    ).toBeInTheDocument();
  });
});
