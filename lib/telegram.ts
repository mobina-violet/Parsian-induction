// متن کاربر رو escape می‌کنیم تا با parse_mode: HTML پیام خراب نشه
export function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('متغیرهای تلگرام تنظیم نشدن؛ اطلاع‌رسانی رد شد')
    return
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000), // اگه تلگرام در دسترس نبود، فرم گیر نکنه
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })
  } catch (err) {
    console.error('ارسال پیام تلگرام ناموفق بود:', err)
  }
}