'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/components/providers'
import { 
  Accessibility,
  Eye,
  EyeOff,
  Type,
  MousePointer,
  Keyboard,
  Volume2,
  VolumeX,
  Palette,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X
} from 'lucide-react'

export function AccessibilityButton() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    soundEffects: true,
    fontSize: 100, // percentage
    cursorSize: 'normal' as 'small' | 'normal' | 'large'
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    applySetting(key, !settings[key])
  }

  const updateFontSize = (change: number) => {
    const newSize = Math.max(75, Math.min(150, settings.fontSize + change))
    setSettings(prev => ({ ...prev, fontSize: newSize }))
    document.documentElement.style.fontSize = `${newSize}%`
  }

  const applySetting = (key: string, value: unknown) => {
    const root = document.documentElement

    switch (key) {
      case 'highContrast':
        if (value) {
          root.classList.add('high-contrast')
        } else {
          root.classList.remove('high-contrast')
        }
        break

      case 'largeText':
        if (value) {
          root.classList.add('large-text')
        } else {
          root.classList.remove('large-text')
        }
        break

      case 'reducedMotion':
        if (value) {
          root.classList.add('reduced-motion')
        } else {
          root.classList.remove('reduced-motion')
        }
        break

      case 'keyboardNavigation':
        if (value) {
          root.classList.add('keyboard-navigation')
        } else {
          root.classList.remove('keyboard-navigation')
        }
        break

      case 'cursorSize':
        root.classList.remove('cursor-small', 'cursor-normal', 'cursor-large')
        root.classList.add(`cursor-${value}`)
        break
    }

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings))
    }
  }

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: false,
      soundEffects: true,
      fontSize: 100,
      cursorSize: 'normal' as const
    }
    
    setSettings(defaultSettings)
    
    // Remove all accessibility classes
    const root = document.documentElement
    root.classList.remove(
      'high-contrast',
      'large-text', 
      'reduced-motion',
      'keyboard-navigation',
      'cursor-small',
      'cursor-normal',
      'cursor-large'
    )
    root.classList.add('cursor-normal')
    root.style.fontSize = '100%'
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessibility-settings')
    }
  }

  // Load settings on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setSettings(parsed)
          // Apply saved settings
          Object.entries(parsed).forEach(([key, value]) => {
            applySetting(key, value)
          })
        } catch (error) {
          console.error('Error loading accessibility settings:', error)
        }
      }
    }
  }, [])

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          aria-label="פתח הגדרות נגישות"
          title="הגדרות נגישות"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </div>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5" />
                  הגדרות נגישות
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="סגור"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Visual Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  הגדרות חזותיות
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant={settings.highContrast ? "default" : "outline"}
                    onClick={() => toggleSetting('highContrast')}
                    className="flex items-center gap-2 h-auto p-4 justify-start"
                  >
                    <Palette className="h-5 w-5" />
                    <div className="text-right">
                      <div className="font-medium">ניגודיות גבוהה</div>
                      <div className="text-xs opacity-75">שיפור הניגודיות</div>
                    </div>
                  </Button>

                  <Button
                    variant={settings.largeText ? "default" : "outline"}
                    onClick={() => toggleSetting('largeText')}
                    className="flex items-center gap-2 h-auto p-4 justify-start"
                  >
                    <Type className="h-5 w-5" />
                    <div className="text-right">
                      <div className="font-medium">טקסט גדול</div>
                      <div className="text-xs opacity-75">הגדלת הטקסט</div>
                    </div>
                  </Button>

                  <Button
                    variant={settings.reducedMotion ? "default" : "outline"}
                    onClick={() => toggleSetting('reducedMotion')}
                    className="flex items-center gap-2 h-auto p-4 justify-start"
                  >
                    <Eye className="h-5 w-5" />
                    <div className="text-right">
                      <div className="font-medium">הפחתת תנועה</div>
                      <div className="text-xs opacity-75">הפחתת אנימציות</div>
                    </div>
                  </Button>

                  <Button
                    variant={settings.keyboardNavigation ? "default" : "outline"}
                    onClick={() => toggleSetting('keyboardNavigation')}
                    className="flex items-center gap-2 h-auto p-4 justify-start"
                  >
                    <Keyboard className="h-5 w-5" />
                    <div className="text-right">
                      <div className="font-medium">ניווט מקלדת</div>
                      <div className="text-xs opacity-75">הדגשת פוקוס</div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Font Size Control */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  גודל גופן
                </h3>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFontSize(-10)}
                    disabled={settings.fontSize <= 75}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 text-center">
                    <div className="text-lg font-medium">{settings.fontSize}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">גודל גופן</div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateFontSize(10)}
                    disabled={settings.fontSize >= 150}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Cursor Size */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  גודל עכבר
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  {(['small', 'normal', 'large'] as const).map((size) => (
                    <Button
                      key={size}
                      variant={settings.cursorSize === size ? "default" : "outline"}
                      onClick={() => {
                        setSettings(prev => ({ ...prev, cursorSize: size }))
                        applySetting('cursorSize', size)
                      }}
                      className="flex items-center gap-2"
                    >
                      <MousePointer className={`${
                        size === 'small' ? 'h-3 w-3' :
                        size === 'normal' ? 'h-4 w-4' : 'h-5 w-5'
                      }`} />
                      {size === 'small' ? 'קטן' : size === 'normal' ? 'רגיל' : 'גדול'}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sound Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  הגדרות קול
                </h3>
                
                <Button
                  variant={settings.soundEffects ? "default" : "outline"}
                  onClick={() => toggleSetting('soundEffects')}
                  className="flex items-center gap-2 h-auto p-4 justify-start w-full"
                >
                  {settings.soundEffects ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                  <div className="text-right">
                    <div className="font-medium">אפקטי קול</div>
                    <div className="text-xs opacity-75">
                      {settings.soundEffects ? 'מופעל' : 'כבוי'}
                    </div>
                  </div>
                </Button>
              </div>

              {/* Screen Reader */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  קורא מסך
                </h3>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    האתר תומך בקוראי מסך פופולריים כמו NVDA, JAWS ו-VoiceOver.
                    כל התמונות כוללות תיאור חלופי וכל האלמנטים האינטראקטיביים נגישים.
                  </p>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  קיצורי מקלדת
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Tab</span>
                    <span>מעבר בין אלמנטים</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Enter</span>
                    <span>אישור/לחיצה</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Escape</span>
                    <span>סגירה/ביטול</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>Alt + A</span>
                    <span>פתח נגישות</span>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={resetSettings}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  איפוס הגדרות
                </Button>
                
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  סגור
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keyboard shortcut listener */}
      <div
        className="sr-only"
        onKeyDown={(e) => {
          if (e.altKey && e.key === 'a') {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        tabIndex={-1}
      />
    </>
  )
}
