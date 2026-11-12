import { ImageResponse } from 'next/og'

/**
 * Generates the >B_ Precision Backend Studio brand icon at any square resolution
 * for Next.js App Router metadata routes (favicon and Apple Touch Icon).
 */
export function createBrandIconImage(size: number) {
  const radius = Math.round(size * 0.24)
  const borderWidth = Math.max(2, Math.round(size * 0.035))
  const svgSize = Math.round(size * 0.78)
  const isCompact = size <= 64
  const strokeMain = isCompact ? '2.15' : '1.85'
  const strokeCursor = isCompact ? '2.35' : '2.05'

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: radius,
          background: 'linear-gradient(180deg, #162033 0%, #090d16 100%)',
          border: `${borderWidth}px solid rgba(59, 130, 246, 0.5)`,
        }}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 28 28"
          fill="none"
        >
          {/* Technical hexagonal frame */}
          <polygon
            points="14,2.5 24.5,8.25 24.5,19.75 14,25.5 3.5,19.75 3.5,8.25"
            stroke="rgba(59, 130, 246, 0.38)"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {/* Terminal prompt chevron (>) */}
          <path
            d="M6.75 11.25L9.25 14L6.75 16.75"
            stroke="#3b82f6"
            strokeWidth={strokeMain}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Monogram B */}
          <path
            d="M11.25 9.25V18.75M11.25 9.25H14.55C15.9 9.25 16.8 10.05 16.8 11.35C16.8 12.65 15.9 13.75 14.55 13.75H11.25M11.25 13.75H14.95C16.45 13.75 17.25 14.7 17.25 16.25C17.25 17.8 16.45 18.75 14.95 18.75H11.25"
            stroke="#f1f5f9"
            strokeWidth={strokeMain}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Console underscore cursor (_) */}
          <path
            d="M18.5 18.75H21.75"
            stroke="#22d3ee"
            strokeWidth={strokeCursor}
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  )
}

