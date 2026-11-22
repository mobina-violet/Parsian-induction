'use client'

import { useConsultationModal } from '@/lib/store/consultation-modal'

export function ConsultationCtaButton({
  label = 'درخواست مشاوره رایگان',
  source = 'PRODUCT_PAGE',
  productId,
  className,
}: {
  label?: string
  source?: 'HEADER_BUTTON' | 'HERO_WIDGET' | 'PRODUCT_PAGE' | 'PROJECT_PAGE' | 'CONTACT_PAGE'
  productId?: string
  className?: string
}) {
  const open = useConsultationModal((s) => s.open)
  return (
    <button
      onClick={() => open(source, productId)}
      className={
        className ??
        'rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-600'
      }
    >
      {label}
    </button>
  )
}