'use client'

import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

interface TaskModalWrapperProps {
  children: React.ReactNode
}

export function TaskModalWrapper({ children }: TaskModalWrapperProps) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/50 z-40'
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <div className='fixed inset-0 flex items-center justify-center p-4 z-50'>
        <div className='relative'>
          {/* Close button */}
          <button
            onClick={handleClose}
            className='absolute -top-2 -right-2 p-2 bg-background hover:bg-accent rounded-full border shadow-lg transition-colors z-10'
          >
            <X size={16} />
          </button>

          {children}
        </div>
      </div>
    </>
  )
}
