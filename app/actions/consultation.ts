'use server'

import { prisma } from '@/lib/prisma'
import { consultationSchema, type ConsultationFormData } from '@/lib/validations/consultation'
import { sendTelegramMessage } from '@/lib/telegram'

const sourceLabels: Record<string, string> = {
  HEADER_BUTTON: 'دکمه هدر',
  HERO_WIDGET: 'صفحه اصلی',
  PRODUCT_PAGE: 'صفحه محصول',
  PROJECT_PAGE: 'صفحه پروژه',
  CONTACT_PAGE: 'صفحه تماس',
}

export async function submitConsultationRequest(data: Partial<ConsultationFormData>) {
  const parsed = consultationSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.consultationRequest.create({
      data: {
        fullName: parsed.data.fullName || null,
        phoneNumber: parsed.data.phoneNumber || null,
        email: parsed.data.email || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message || null,
        source: parsed.data.source,
        productId: parsed.data.productId || null,
      },
    })

    const lines = [
      '📩 <b>درخواست مشاوره جدید</b>',
      parsed.data.fullName ? `👤 نام: ${parsed.data.fullName}` : null,
      parsed.data.phoneNumber ? `📱 موبایل: ${parsed.data.phoneNumber}` : null,
      parsed.data.email ? `✉️ ایمیل: ${parsed.data.email}` : null,
      parsed.data.subject ? `📌 موضوع: ${parsed.data.subject}` : null,
      parsed.data.message ? `💬 پیام: ${parsed.data.message}` : null,
      `🔗 منبع: ${sourceLabels[parsed.data.source] ?? parsed.data.source}`,
    ].filter(Boolean)

    // اگه تلگرام هم خطا بده، خودِ ثبت درخواست بی‌اثر نمی‌مونه
    await sendTelegramMessage(lines.join('\n'))

    return { success: true }
  } catch (err) {
    console.error('submitConsultationRequest failed:', err)
    return { success: false, error: 'مشکلی در ثبت درخواست پیش آمد' }
  }
}