import { NextResponse } from "next/server";
import { EMAIL } from "../../../data/contacto";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(body) {
  const { nombre, email, mensaje } = body;
  return (
    typeof nombre === "string" &&
    nombre.trim().length >= 2 &&
    nombre.trim().length <= 80 &&
    typeof email === "string" &&
    email.length <= 120 &&
    EMAIL_RE.test(email) &&
    typeof mensaje === "string" &&
    mensaje.trim().length >= 10 &&
    mensaje.trim().length <= 2000
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof body.empresa === "string" && body.empresa.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!validar(body)) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <contacto@guillermosias.dev>",
        to: [process.env.CONTACT_TO || EMAIL],
        reply_to: body.email,
        subject: `[portfolio] mensaje de ${body.nombre}`,
        text: `${body.mensaje}\n\n— ${body.nombre} <${body.email}>`,
      }),
    });

    if (!res.ok) {
      console.error("Resend respondió error:", res.status, await res.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Fallo al llamar a Resend:", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
