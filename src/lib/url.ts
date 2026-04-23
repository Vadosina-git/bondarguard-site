// Helpers to build URLs that honor Astro `base` on GitHub Pages.
// Always use these instead of hardcoding "/" paths in href/src.

const BASE = import.meta.env.BASE_URL;

function normalizeBase(): string {
  return BASE.endsWith("/") ? BASE : BASE + "/";
}

function stripLeadingSlash(p: string): string {
  return p.startsWith("/") ? p.slice(1) : p;
}

export function url(path: string = ""): string {
  if (!path || path === "/") return normalizeBase();
  if (/^[a-z]+:\/\//i.test(path) || path.startsWith("#") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  return normalizeBase() + stripLeadingSlash(path);
}

export function asset(path: string): string {
  return url(path);
}

export function absoluteUrl(path: string = ""): string {
  const origin = import.meta.env.SITE ?? "";
  return origin.replace(/\/$/, "") + url(path);
}
