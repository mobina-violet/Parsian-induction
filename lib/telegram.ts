// متن کاربر رو escape می‌کنیم تا با parse_mode: HTML پیام خراب نشه
export function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()

  if (!token || !chatId) {
    console.warn(
      'تلگرام: TELEGRAM_BOT_TOKEN یا TELEGRAM_CHAT_ID روی سرور تنظیم نشده؛ اطلاع‌رسانی رد شد',
      { hasToken: Boolean(token), hasChatId: Boolean(chatId) },
    )
    return
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8000), // اگه تلگرام در دسترس نبود، فرم گیر نکنه
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })

    // fetch با خطای ۴۰۰/۴۰۱/۴۰۳ خطا پرت نمی‌کند؛ باید خودمان جواب را بخوانیم و لاگ کنیم
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { description?: string } | null
      console.error('تلگرام: ارسال پیام رد شد', {
        status: res.status,
        description: body?.description ?? 'نامشخص',
      })
    }
  } catch (err) {
    console.error('تلگرام: ارتباط با api.telegram.org برقرار نشد:', err)
  }
}
