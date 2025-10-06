'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

/**
 * פוטר כללי לאפליקציה.
 * מוצג בתחתית כל עמוד ומכיל ניווט קצר, קישורים שימושיים ורשתות חברתיות.
 */
export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-900/40">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* קישורים מהירים */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">קישורים מהירים</h3>
            <nav className="space-y-2">
              <Link href="/features" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                יכולות
              </Link>
              <Link href="/lessons" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                שיעורים
              </Link>
              <Link href="/forums" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                פורומים
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">מידע משפטי</h3>
            <nav className="space-y-2">
              <Link href="/privacy" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/terms" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                תנאי שימוש
              </Link>
              <Link href="/contact" className="block text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                צור קשר
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">עקבו אחרינו</h3>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@languageconnect.com" 
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* שורת תחתונה */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              © {new Date().getFullYear()} LanguageConnect. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Built with love in Israel
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


