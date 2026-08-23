import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import ThemeToggle from "../components/atoms/ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("muestra [dark] cuando el tema activo es claro", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("[dark]")).toBeInTheDocument();
  });

  it("alterna la clase dark en <html> y persiste la preferencia", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByText("[dark]"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    await screen.findByText("[light]");

    await user.click(screen.getByText("[light]"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    await screen.findByText("[dark]");
  });
});
