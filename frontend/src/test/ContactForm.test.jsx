import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import ContactForm from "../components/molecules/ContactForm";

async function llenarYEnviar(user) {
  await user.type(screen.getByLabelText(/\[nombre\]/), "Ana");
  await user.type(screen.getByLabelText(/\[email\]/), "ana@test.com");
  await user.type(
    screen.getByLabelText(/\[mensaje\]/),
    "Hola, te escribo por una oportunidad laboral"
  );
  await user.click(screen.getByRole("button", { name: /enviar/i }));
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("envía los datos y muestra feedback de éxito", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);
    await llenarYEnviar(user);

    expect(await screen.findByText(/\[ok\] mensaje enviado/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("muestra feedback de error cuando el envío falla", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(<ContactForm />);
    await llenarYEnviar(user);

    expect(await screen.findByText(/\[error\]/)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("deshabilita el botón mientras está enviando", async () => {
    const user = userEvent.setup();
    let resolverFetch;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolverFetch = resolve;
          })
      )
    );

    render(<ContactForm />);
    await llenarYEnviar(user);

    const enviando = screen.getByRole("button", { name: /\[enviando...\]/i });
    expect(enviando).toBeDisabled();

    resolverFetch({ ok: true });
    expect(await screen.findByText(/\[ok\]/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar mensaje/i })).toBeEnabled();
  });

  it("limpia los campos tras un envío exitoso", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    render(<ContactForm />);
    const nombre = screen.getByLabelText(/\[nombre\]/);
    await llenarYEnviar(user);

    await screen.findByText(/\[ok\]/);
    expect(nombre).toHaveValue("");
  });
});
