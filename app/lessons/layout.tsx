import { ReactNode } from 'react'

interface LessonsLayoutProps {
  children: ReactNode
}

export default function LessonsLayout({ children }: LessonsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}


