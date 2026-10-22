import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CommandPalette from "../components/organisms/CommandPalette";
import PaletteHint from "../components/atoms/PaletteHint";
import en from "../i18n/en";

const push = vi.fn();
let pathname = "/es";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => pathname,
}));

function Harness(props) {
  return (
    <>
      <button>antes</button>
      <PaletteHint />
      <CommandPalette {...props} />
    </>
  );
}

async function abrir(user) {
  await user.keyboard("{Control>}k{/Control}");
  return screen.findByRole("dialog");
}

describe("CommandPalette", () => {
  beforeEach(() => {
    push.mockClear();
    pathname = "/es";
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("abre con Ctrl+K, enfoca el input y cierra con Esc devolviendo el foco", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    screen.getByText("antes").focus();

    const dialog = await abrir(user);
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("combobox")).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByText("antes")).toHaveFocus();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("abre con / fuera de inputs y con la pista del navbar", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.keyboard("/");
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: "Abrir paleta de comandos" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("cierra al hacer clic fuera", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const dialog = await abrir(user);
    await user.click(dialog.parentElement);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("agrupa acciones y filtra por texto", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    expect(screen.getByText("[+] navegar")).toBeInTheDocument();
    expect(screen.getByText("[+] proyectos")).toBeInTheDocument();
    expect(screen.getByText("[+] acciones")).toBeInTheDocument();
    expect(screen.getByText("[+] enlaces")).toBeInTheDocument();

    await user.type(screen.getByRole("combobox"), "linkedin");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.getByRole("option")).toHaveTextContent("abrir LinkedIn");
  });

  it("navega con flechas y ejecuta con Enter", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    const input = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveAttribute("aria-selected", "true");
    expect(input).toHaveAttribute("aria-activedescendant", options[0].id);

    await user.keyboard("{ArrowDown}");
    expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(screen.getAllByRole("option").at(-1)).toHaveAttribute("aria-selected", "true");

    await user.clear(input);
    await user.type(input, "skills");
    pathname = "/es/proyectos/x";
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledWith("/es#skills");
  });

  it("abre un proyecto con su ruta", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "promusic academia");
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledWith("/es/proyectos/promusic-academia");
  });

  it("cambia el tema y persiste la preferencia", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "tema");
    await user.click(screen.getByRole("option", { name: /cambiar a tema oscuro/ }));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(
      await screen.findByRole("option", { name: /cambiar a tema claro/ })
    ).toBeInTheDocument();
  });

  it("copia el email y confirma", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "copiar");
    await user.keyboard("{Enter}");
    expect(writeText).toHaveBeenCalledWith("contacto@guillermosias.dev");
    expect(await screen.findAllByText("[copiado]")).not.toHaveLength(0);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("cambia de idioma conservando la ruta", async () => {
    const user = userEvent.setup();
    pathname = "/es/proyectos/promusic-chat";
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "ingles");
    await user.keyboard("{Enter}");
    expect(push).toHaveBeenCalledWith("/en/proyectos/promusic-chat");
    expect(document.cookie).toContain("NEXT_LOCALE=en");
  });

  it("emite open-chat para el asistente", async () => {
    const user = userEvent.setup();
    const onChat = vi.fn();
    window.addEventListener("open-chat", onChat);
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "hablar con");
    await user.keyboard("{Enter}");
    expect(onChat).toHaveBeenCalledTimes(1);
    window.removeEventListener("open-chat", onChat);
  });

  it("muestra command not found sin resultados", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "xyzq");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    expect(screen.getByText(/command not found:/)).toBeInTheDocument();
    expect(screen.getByText("xyzq")).toBeInTheDocument();
    expect(screen.getByText("0 resultados")).toBeInTheDocument();
  });

  it("atrapa el foco con Tab", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Cerrar paleta de comandos" })
    ).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("responde al easter egg y lleva al contacto", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await abrir(user);
    await user.type(screen.getByRole("combobox"), "sudo hire guillermo");
    await user.keyboard("{Enter}");
    expect(await screen.findByText(/acceso concedido/)).toBeInTheDocument();
    await waitFor(() => expect(push).toHaveBeenCalledWith("/es#contacto"), {
      timeout: 3000,
    });
  });

  it("renderiza en inglés", async () => {
    const user = userEvent.setup();
    render(<Harness lang="en" t={en.palette} />);
    await abrir(user);
    expect(screen.getByText("[+] navigate")).toBeInTheDocument();
    expect(screen.getByText("↑↓ navigate · ↵ run · esc close")).toBeInTheDocument();
  });
});
