import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ChatWidget from "../components/organisms/ChatWidget";

describe("ChatWidget", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("no monta el iframe hasta el primer click", () => {
    render(<ChatWidget />);
    const fab = screen.getByRole("button", { name: /hablar con el asistente/i });
    expect(fab).toHaveTextContent("Habla con el asistente");
    expect(fab).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abre el panel con el iframe de entrevista-ia en modo embed", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /hablar con el asistente/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTitle("Asistente IA — Guillermo Sias")).toHaveAttribute(
      "src",
      "https://entrevista-ia-flax.vercel.app?embed=1"
    );
    expect(
      screen.getByRole("button", { name: /cerrar asistente/i })
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTitle("Abrir en pestaña nueva")).toBeInTheDocument();
  });

  it("cierra y desmonta el iframe con el toggle", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /hablar con el asistente/i }));
    await user.click(screen.getByRole("button", { name: /cerrar asistente/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /hablar con el asistente/i })
    ).toBeInTheDocument();
  });

  it("cierra con Escape mientras está abierto", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);
    await user.click(screen.getByRole("button", { name: /hablar con el asistente/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("muestra el teaser tras el delay si no fue descartado", () => {
    vi.useFakeTimers();
    render(<ChatWidget />);
    expect(screen.queryByText(/Preguntale lo que quieras/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/Preguntale lo que quieras/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /descartar mensaje/i }));
    expect(localStorage.getItem("chat_teaser_visto")).toBe("1");

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByText(/Preguntale lo que quieras/i)).not.toBeInTheDocument();
  });

  it("el CTA del teaser abre el chat y marca el teaser como visto", () => {
    vi.useFakeTimers();
    render(<ChatWidget />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByRole("button", { name: /habla con el asistente/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByText(/Preguntale lo que quieras/i)).not.toBeInTheDocument();
    expect(localStorage.getItem("chat_teaser_visto")).toBe("1");
  });

  it("no muestra el teaser si ya fue visto antes", () => {
    localStorage.setItem("chat_teaser_visto", "1");
    vi.useFakeTimers();

    render(<ChatWidget />);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByText(/Preguntale lo que quieras/i)).not.toBeInTheDocument();
  });
});
