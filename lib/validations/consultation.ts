import { z } from 'zod'

export const consultationSchema = z
  .object({
    fullName: z.string().optional(),
    phoneNumber: z
      .string()
      .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست')
      .optional()
      .or(z.literal('')),
    email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
    message: z.string().optional(),
    source: z.enum(['HEADER_BUTTON', 'HERO_WIDGET', 'PRODUCT_PAGE', 'PROJECT_PAGE', 'CONTACT_PAGE']),
    productId: z.string().optional(),
  })
  .refine((data) => data.phoneNumber || data.email, {
    message: 'وارد کردن شماره موبایل یا ایمیل الزامی است',
    path: ['phoneNumber'],
  })

export type ConsultationFormData = z.infer<typeof consultationSchema>