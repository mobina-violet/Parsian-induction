import { create } from 'zustand'

type Source = 'HEADER_BUTTON' | 'HERO_WIDGET' | 'PRODUCT_PAGE' | 'PROJECT_PAGE' | 'CONTACT_PAGE'

interface ConsultationModalState {
  isOpen: boolean
  source: Source
  productId?: string
  open: (source: Source, productId?: string) => void
  close: () => void
}

export const useConsultationModal = create<ConsultationModalState>((set) => ({
  isOpen: false,
  source: 'HEADER_BUTTON',
  open: (source, productId) => set({ isOpen: true, source, productId }),
  close: () => set({ isOpen: false }),
}))