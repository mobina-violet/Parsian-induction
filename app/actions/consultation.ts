'use server'

import { prisma } from '@/lib/prisma'
import { consultationSchema, type ConsultationFormData } from '@/lib/validations/consultation'

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
        message: parsed.data.message || null,
        source: parsed.data.source,
        productId: parsed.data.productId || null,
      },
    })
    return { success: true }
  } catch (err) {
    return { success: false, error: 'مشکلی در ثبت درخواست پیش آمد' }
  }
}