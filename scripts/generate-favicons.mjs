// Generates favicon + apple-touch-icon + og-default from logo-mark.svg.
// Run after installing deps: `npm run favicons`.

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const markPath = path.join(root, "public/images/logos/logo-mark.svg");
const publicDir = path.join(root, "public");
const ogDir = path.join(root, "public/images/og");

await fs.mkdir(ogDir, { recursive: true });

const markSvg = await fs.readFile(markPath);

// favicon.svg — just copy the mark
await fs.copyFile(markPath, path.join(publicDir, "favicon.svg"));

// apple-touch-icon 180x180 with padded background
await sharp({
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: { r: 11, g: 15, b: 23, alpha: 1 },
  },
})
  .composite([
    {
      input: await sharp(markSvg).resize(132, 132).png().toBuffer(),
      gravity: "center",
    },
  ])
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

// favicon.ico (32x32) via PNG output — most browsers accept .png named .ico
// but for true .ico we'd need a separate lib; PNG works for modern browsers.
await sharp(markSvg)
  .resize(32, 32)
  .png()
  .toFile(path.join(publicDir, "favicon-32.png"));

// OG default image (1200x630)
const ogBg = {
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: { r: 11, g: 15, b: 23, alpha: 1 },
  },
};

const ogSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#00D4AA" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00D4AA" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0B0F17"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(480 170)" fill="none" stroke="#00D4AA" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M120 8 L226 40 V110 C226 170 177 216 120 230 C63 216 14 170 14 110 V40 Z"/>
    <path d="M68 118 L104 154 L174 84"/>
  </g>
  <text x="600" y="470" text-anchor="middle" font-family="Unbounded, system-ui, sans-serif" font-weight="700" font-size="62" letter-spacing="2" fill="#F2F4F8">BONDAR’ GUARD</text>
  <text x="600" y="525" text-anchor="middle" font-family="Manrope, system-ui, sans-serif" font-weight="500" font-size="26" fill="#9AA3B2">Пультовая охрана домов, коттеджей и бизнеса</text>
</svg>
`);

await sharp(ogSvg).jpeg({ quality: 88 }).toFile(path.join(ogDir, "default.jpg"));

console.log("✓ favicons and og-default generated");
