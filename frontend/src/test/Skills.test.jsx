import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skills from "../components/organisms/Skills";

describe("Skills", () => {
  it("renders the section title", () => {
    render(<Skills />);
    expect(screen.getByLabelText("Skills")).toBeInTheDocument();
  });

  it("expone todas las tecnologías en la cinta", () => {
    render(<Skills />);
    const cinta = screen.getByRole("img", { name: /^Tecnologías:/ });
    for (const skill of [
      "JavaScript",
      "React",
      "React Router",
      "Tailwind CSS",
      "Shopify",
    ]) {
      expect(cinta.getAttribute("aria-label")).toContain(skill);
    }
  });

  it("no renderiza grupos de categorías", () => {
    render(<Skills />);
    expect(screen.queryByText("Lenguajes")).not.toBeInTheDocument();
    expect(screen.queryByRole("group")).not.toBeInTheDocument();
  });
});
