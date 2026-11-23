import { z } from 'zod'

export const consultationSchema = z
  .object({
    fullName: z.string().max(100, 'نام خیلی طولانی است').optional(),
    phoneNumber: z
      .string()
      .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست')
      .optional()
      .or(z.literal('')),
    email: z.string().email('ایمیل معتبر نیست').optional().or(z.literal('')),
    subject: z.string().max(150).optional(),
    message: z.string().max(2000, 'پیام نباید بیشتر از ۲۰۰۰ کاراکتر باشد').optional(),
    source: z.enum(['HEADER_BUTTON', 'HERO_WIDGET', 'PRODUCT_PAGE', 'PROJECT_PAGE', 'CONTACT_PAGE']),
    productId: z.string().max(60).optional(),
    // honeypot: باید همیشه خالی بماند
    hp_field: z.string().optional(),
  })
  .refine((data) => data.phoneNumber || data.email, {
    message: 'وارد کردن شماره موبایل یا ایمیل الزامی است',
    path: ['phoneNumber'],
  })

export type ConsultationFormData = z.infer<typeof consultationSchema>