import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import TerminalRole from "../components/rb/TerminalRole";
import CountUp from "../components/rb/CountUp";
import Magnetic from "../components/rb/Magnetic";
import Button from "../components/atoms/Button";
import Hero from "../components/organisms/Hero";
import es from "../i18n/es";

function mockMotion(reduced) {
  window.matchMedia = (query) => ({
    matches: reduced && query.includes("reduce"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  });
}

describe("Hero interactivo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockMotion(false);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("TerminalRole escribe el primer rol y expone la lista completa", () => {
    render(<TerminalRole roles={["React", "Node.js"]} prompt="stack" />);
    expect(screen.getByText("React, Node.js")).toBeInTheDocument();
    for (let i = 0; i < 6; i++) {
      act(() => {
        vi.advanceTimersByTime(70);
      });
    }
    expect(
      screen.getByText("React", { selector: "span.text-accent" })
    ).toBeInTheDocument();
  });

  it("TerminalRole con reduced-motion muestra todos los roles", () => {
    mockMotion(true);
    render(<TerminalRole roles={["React", "Node.js"]} />);
    act(() => {
      vi.advanceTimersByTime(5);
    });
    expect(screen.getByText("React · Node.js")).toBeInTheDocument();
  });

  it("CountUp llega al valor final", () => {
    render(<CountUp to={10} suffix="+" delay={0} duration={100} />);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText("10+")).toBeInTheDocument();
  });

  it("Magnetic mueve y restablece el contenido", () => {
    const { container } = render(
      <Magnetic>
        <button>x</button>
      </Magnetic>
    );
    const el = container.firstChild;
    fireEvent.pointerMove(el, { pointerType: "mouse", clientX: 50, clientY: 50 });
    expect(el.style.transform).toContain("translate");
    fireEvent.pointerLeave(el);
    expect(el.style.transform).toBe("");
  });

  it("Button muestra la flecha solo con arrow", () => {
    const { rerender } = render(<Button href="#a">Ir</Button>);
    expect(screen.queryByText("→")).toBeNull();
    rerender(
      <Button href="#a" arrow>
        Ir
      </Button>
    );
    expect(screen.getByText("→")).toHaveAttribute("aria-hidden", "true");
  });

  it("Hero incluye indicador de scroll y métricas", () => {
    render(<Hero t={es.hero} />);
    expect(screen.getByRole("link", { name: es.hero.scroll })).toHaveAttribute(
      "href",
      "#sobre-mi"
    );
    expect(screen.getByText(es.hero.stats.years)).toBeInTheDocument();
  });
});
