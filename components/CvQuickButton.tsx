'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { DocumentModal } from './DocumentModal'
import { CV_DOCUMENT } from '@/lib/cv-document'

interface CvQuickButtonProps {
  onClick?: () => void
}

/**
 * Top Workspace Bar quick-access button to preview or download the CV PDF.
 */
export function CvQuickButton({ onClick }: CvQuickButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    setIsOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title="Previsualizar y descargar CV"
        className="inline-flex h-9 items-center gap-1.5 px-3 rounded-lg bg-card hover:bg-muted border border-border hover:border-primary/40 text-xs font-semibold text-foreground transition-colors duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <FileText className="w-3.5 h-3.5 text-primary" />
        <span>CV</span>
      </button>

      {!onClick && (
        <DocumentModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          document={CV_DOCUMENT}
        />
      )}
    </>
  )
}

