'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/core/button'

interface AuthNavProps {
  onSelect?: (action: 'login' | 'register' | 'forgot') => void
}

export default function AuthNav({ onSelect }: AuthNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Button variant="ghost" aria-label="Menu" onClick={() => setOpen(!open)}>
        <Menu className="h-6 w-6" />
      </Button>

      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          />
          {/* Menu */}
        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 z-50">
          <nav className="py-2 text-right">
            <button className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { onSelect?.('login'); setOpen(false) }}>Login</button>
            <button className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { onSelect?.('register'); setOpen(false) }}>Register</button>
            <button className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => { onSelect?.('forgot'); setOpen(false) }}>Forgot Password</button>
            <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
            <Link href="/lessons" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Lessons</Link>
            <Link href="/learning" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Learning Center</Link>
            <Link href="/memory-games" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Memory Games</Link>
            <Link href="/spelling-games" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Spelling Games</Link>
            <Link href="/connect" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Connect</Link>
            <Link href="/chat" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Chat</Link>
            <Link href="/translate" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Translate</Link>
            <Link href="/features" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Features</Link>
            <Link href="/privacy" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpen(false)}>Privacy</Link>
          </nav>
        </div>
        </>
      )}
    </div>
  )
}


