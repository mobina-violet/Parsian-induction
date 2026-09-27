'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { reviewSchema, type ReviewFormInput } from '@/lib/validations/review'

export async function submitReview(data: Partial<ReviewFormInput>, path?: string) {
  const parsed = reviewSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message }
  }

  try {
    await prisma.review.create({
      data: {
        productId: parsed.data.productId,
        name: parsed.data.name || null,
        email: parsed.data.email,
        rating: parsed.data.rating,
        message: parsed.data.message,
      },
    })

    if (path) revalidatePath(path)

    return { success: true }
  } catch (err) {
    console.error('submitReview failed:', err)
    return { success: false, error: 'مشکلی در ثبت نظر پیش آمد' }
  }
}