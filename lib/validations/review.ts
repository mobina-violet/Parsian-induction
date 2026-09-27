import { z } from 'zod'

export const reviewSchema = z.object({
  productId: z.string().min(1),
  name: z.string().optional(),
  email: z.string().email('ایمیل معتبر نیست'),
  rating: z.number().min(1).max(5).default(5),
  message: z
    .string()
    .min(5, 'نظر باید حداقل ۵ کاراکتر باشد')
    .max(1000, 'نظر نباید بیشتر از ۱۰۰۰ کاراکتر باشد'),
})

export type ReviewFormInput = z.input<typeof reviewSchema>
export type ReviewFormOutput = z.output<typeof reviewSchema>