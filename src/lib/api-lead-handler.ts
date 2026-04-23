// Lead handler stub kept outside src/pages so the static GitHub Pages
// build does not try to prerender it. When migrating to Vercel/Netlify
// (Phase 10B), move this file to `src/pages/api/lead.ts` and add
// `export const prerender = false;` + a server adapter in astro.config.

import type { APIRoute } from "astro";
import { leadSchema } from "@lib/validation";
import { sendToTelegram } from "@lib/telegram";

const recent = new Map<string, number>();

function getIp(request: Request): string {
  const h = request.headers;
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "unknown"
  );
}

export const POST: APIRoute = async ({ request }) => {
  const ip = getIp(request);
  const now = Date.now();
  const last = recent.get(ip) ?? 0;
  if (now - last < 10_000) {
    return new Response(JSON.stringify({ ok: false, error: "Rate limited" }), { status: 429 });
  }
  recent.set(ip, now);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ ok: false, error: "Validation failed" }), { status: 400 });
  }

  const { name, phone, source } = parsed.data;
  const text = [
    "<b>Новая заявка</b>",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Источник: ${source ?? "unknown"}`,
    `IP: ${ip}`,
  ].join("\n");

  try {
    await sendToTelegram(text);
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
};
