import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "../app/api/contact/route";

function request(body) {
  return {
    json: async () => body,
  };
}

const bodyValido = {
  nombre: "Ana",
  email: "ana@test.com",
  mensaje: "Hola Guillermo, te escribo por una oportunidad",
};

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.RESEND_API_KEY;
  });

  it("rechaza JSON inválido con 400", async () => {
    const res = await POST({ json: async () => { throw new Error(); } });
    expect(res.status).toBe(400);
  });

  it("responde ok sin llamar a Resend si el honeypot viene lleno", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    process.env.RESEND_API_KEY = "test-key";

    const res = await POST(request({ ...bodyValido, empresa: "spam-bot inc" }));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("valida los campos y devuelve 422 si son inválidos", async () => {
    const res = await POST(request({ ...bodyValido, email: "no-es-email" }));
    expect(res.status).toBe(422);
  });

  it("devuelve 500 si falta RESEND_API_KEY", async () => {
    const res = await POST(request(bodyValido));
    expect(res.status).toBe(500);
  });

  it("envía el email vía Resend y responde ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    process.env.RESEND_API_KEY = "test-key";

    const res = await POST(request(bodyValido));

    expect(res.status).toBe(200);
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers.Authorization).toBe("Bearer test-key");
    const payload = JSON.parse(init.body);
    expect(payload.reply_to).toBe("ana@test.com");
    expect(payload.to).toContain("g.siasp@gmail.com");
    expect(payload.subject).toContain("Ana");
  });

  it("devuelve 502 si Resend falla", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    process.env.RESEND_API_KEY = "test-key";

    const res = await POST(request(bodyValido));
    expect(res.status).toBe(502);
  });
});
