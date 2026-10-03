'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/admin-auth'

const VALID_STATUSES = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST'] as const
type LeadStatusValue = (typeof VALID_STATUSES)[number]

export async function updateLeadStatus(id: string, status: string) {
  if (!(await requireAdmin())) return { success: false, error: 'دسترسی ندارید' }

  if (!VALID_STATUSES.includes(status as LeadStatusValue)) {
    return { success: false, error: 'وضعیت نامعتبر است' }
  }

  try {
    await prisma.consultationRequest.update({
      where: { id },
      data: { status: status as LeadStatusValue },
    })
    revalidatePath('/admin/leads')
    return { success: true }
  } catch (err) {
    console.error('updateLeadStatus failed:', err)
    return { success: false, error: 'مشکلی پیش آمد' }
  }
}

export async function approveReview(id: string) {
  if (!(await requireAdmin())) return { success: false, error: 'دسترسی ندارید' }

  try {
    await prisma.review.update({ where: { id }, data: { approved: true } })
    revalidatePath('/admin/reviews')
    return { success: true }
  } catch (err) {
    console.error('approveReview failed:', err)
    return { success: false, error: 'مشکلی پیش آمد' }
  }
}

export async function deleteReview(id: string) {
  if (!(await requireAdmin())) return { success: false, error: 'دسترسی ندارید' }

  try {
    await prisma.review.delete({ where: { id } })
    revalidatePath('/admin/reviews')
    return { success: true }
  } catch (err) {
    console.error('deleteReview failed:', err)
    return { success: false, error: 'مشکلی پیش آمد' }
  }
}