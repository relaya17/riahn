'use client'

export default function DevTools() {
  // Only show dev tools in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  // Simple fallback to avoid build issues
  return (
    <div style={{ display: 'none' }}>
      Dev Tools (Development Only)
    </div>
  )
}
