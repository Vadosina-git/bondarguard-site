import { site } from "@data/site";
import { url } from "@lib/url";

export interface LeadPayload {
  name: string;
  phone: string;
  consent: boolean;
  source?: string;
}

export interface LeadResult {
  ok: boolean;
  error?: string;
}

async function delay(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export async function submitLead(data: LeadPayload): Promise<LeadResult> {
  const mode = site.contactReceiver;

  if (mode === "mock") {
    // GitHub Pages / debug mode. Log and return success after short delay.
    // eslint-disable-next-line no-console
    console.log("[lead:mock]", data);
    await delay(600);
    return { ok: true };
  }

  if (mode === "formspree") {
    if (!site.formspreeEndpoint) return { ok: false, error: "Formspree endpoint is not configured" };
    try {
      const r = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      return { ok: r.ok, error: r.ok ? undefined : `HTTP ${r.status}` };
    } catch (e) {
      return { ok: false, error: (e as Error).message };
    }
  }

  // mode === "api" — serverless (Vercel/Netlify).
  try {
    const r = await fetch(url("api/lead"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { ok: r.ok, error: r.ok ? undefined : `HTTP ${r.status}` };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
