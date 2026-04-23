// Server-only. Imported from /api/lead.ts — Astro strips this from client bundles.

export interface TelegramMessage {
  text: string;
}

export async function sendToTelegram(text: string): Promise<void> {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Telegram credentials are not configured");

  const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!r.ok) throw new Error(`Telegram API error ${r.status}`);
}
