'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Award, 
  Download, 
  Share,
  CheckCircle,
  Clock,
  Lock,
  Eye,
  Copy,
  BookOpen,
  Zap,
  FileText,
  Verified
} from 'lucide-react'

interface Certificate {
  id: string
  title: string
  description: string
  language: string
  level: string
  score: number
  issuedDate: Date
  expiryDate?: Date
  issuer: string
  recipient: {
    name: string
    email: string
    walletAddress: string
  }
  blockchainHash: string
  transactionId: string
  verificationUrl: string
  qrCode: string
  status: 'issued' | 'verified' | 'expired' | 'revoked'
  metadata: {
    courseId: string
    lessonsCompleted: number
    totalLessons: number
    studyHours: number
    achievements: string[]
  }
}

interface BlockchainStats {
  totalCertificates: number
  verifiedCertificates: number
  totalValue: number
  networkFees: number
  averageVerificationTime: number
}

export function CertificateSystem() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [blockchainStats, setBlockchainStats] = useState<BlockchainStats | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean
    message: string
    timestamp: Date
  } | null>(null)

  useEffect(() => {
    // Mock certificates data
    const mockCertificates: Certificate[] = [
      {
        id: 'cert_001',
        title: 'מומחה עברית מתקדמת',
        description: 'תעודה המעידה על שליטה מתקדמת בשפה העברית',
        language: 'עברית',
        level: 'מתקדם',
        score: 95,
        issuedDate: new Date('2024-01-15'),
        issuer: 'LanguageConnect Academy',
        recipient: {
          name: 'יוסי כהן',
          email: 'yossi@example.com',
          walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
        },
        blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
        transactionId: '0xabcdef1234567890abcdef1234567890abcdef12',
        verificationUrl: 'https://verify.languageconnect.com/cert_001',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        status: 'verified',
        metadata: {
          courseId: 'hebrew_advanced_001',
          lessonsCompleted: 45,
          totalLessons: 50,
          studyHours: 120,
          achievements: ['מלך הרצף', 'מומחה דקדוק', 'דובר שוטף']
        }
      },
      {
        id: 'cert_002',
        title: 'מומחה אנגלית עסקית',
        description: 'תעודה המעידה על שליטה באנגלית עסקית',
        language: 'אנגלית',
        level: 'מתקדם',
        score: 88,
        issuedDate: new Date('2024-02-20'),
        issuer: 'LanguageConnect Academy',
        recipient: {
          name: 'שרה לוי',
          email: 'sarah@example.com',
          walletAddress: '0x8ba1f109551bD432803012645Hac136c4c8b8d8e'
        },
        blockchainHash: '0x2345678901bcdef1234567890abcdef123456789',
        transactionId: '0xbcdef1234567890abcdef1234567890abcdef123',
        verificationUrl: 'https://verify.languageconnect.com/cert_002',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        status: 'issued',
        metadata: {
          courseId: 'english_business_001',
          lessonsCompleted: 38,
          totalLessons: 40,
          studyHours: 95,
          achievements: ['מתחיל עסקי', 'מתקדם עסקי']
        }
      }
    ]

    setCertificates(mockCertificates)

    // Mock blockchain stats
    setBlockchainStats({
      totalCertificates: 1247,
      verifiedCertificates: 1189,
      totalValue: 125000,
      networkFees: 0.05,
      averageVerificationTime: 2.3
    })
  }, [])

  const generateCertificate = async () => {
    setIsGenerating(true)
    
    // Simulate blockchain transaction
    setTimeout(() => {
      const newCertificate: Certificate = {
        id: `cert_${Date.now()}`,
        title: 'מומחה ערבית בסיסית',
        description: 'תעודה המעידה על שליטה בסיסית בשפה הערבית',
        language: 'ערבית',
        level: 'בינוני',
        score: 92,
        issuedDate: new Date(),
        issuer: 'LanguageConnect Academy',
        recipient: {
          name: 'אחמד חסן',
          email: 'ahmed@example.com',
          walletAddress: '0x9ca2g210662cE543403123756Ibd247d5d9e9f0'
        },
        blockchainHash: `0x${Math.random().toString(16).substr(2, 40)}`,
        transactionId: `0x${Math.random().toString(16).substr(2, 40)}`,
        verificationUrl: `https://verify.languageconnect.com/cert_${Date.now()}`,
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
        status: 'issued',
        metadata: {
          courseId: 'arabic_basic_001',
          lessonsCompleted: 25,
          totalLessons: 30,
          studyHours: 60,
          achievements: ['מתחיל ערבית', 'בינוני ערבית']
        }
      }
      
      setCertificates(prev => [newCertificate, ...prev])
      setIsGenerating(false)
    }, 3000)
  }

  const verifyCertificate = async () => {
    // Simulate verification
    setTimeout(() => {
      setVerificationResult({
        isValid: true,
        message: 'התעודה מאומתת ואושרה בבלוקצ\'יין',
        timestamp: new Date()
      })
    }, 1000)
  }

  const shareCertificate = async (certificate: Certificate) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: `השגתי תעודה ב${certificate.language}!`,
          url: certificate.verificationUrl
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(certificate.verificationUrl)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'issued': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'revoked': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'verified': return 'מאומת'
      case 'issued': return ' issued'
      case 'expired': return 'פג תוקף'
      case 'revoked': return 'בוטל'
      default: return 'לא ידוע'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'מתחיל': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'בינוני': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'מתקדם': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                מערכת תעודות בלוקצ&apos;יין
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                תעודות מאובטחות, מאומתות ובלתי ניתנות לזיוף
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Stats */}
      {blockchainStats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {blockchainStats.totalCertificates.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                תעודות סה&quot;כ
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {blockchainStats.verifiedCertificates.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                מאומתות
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                ${blockchainStats.totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ערך סה&quot;כ
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {blockchainStats.networkFees} ETH
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                עמלות רשת
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {blockchainStats.averageVerificationTime}s
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                זמן אימות ממוצע
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Certificates List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>התעודות שלי</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedCertificate?.id === certificate.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {certificate.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {certificate.language} • {certificate.level}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                        {getStatusLabel(certificate.status)}
                      </span>
                      {certificate.status === 'verified' && (
                        <Verified className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>ציון: {certificate.score}%</span>
                      <span>{certificate.issuedDate.toLocaleDateString('he-IL')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificate Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>פרטי התעודה</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCertificate ? (
              <div className="space-y-4">
                {/* Certificate Header */}
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <div className="text-4xl mb-2">🏆</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCertificate.description}
                  </p>
                </div>

                {/* Certificate Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">שפה:</label>
                    <p className="font-semibold">{selectedCertificate.language}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">רמה:</label>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedCertificate.level)}`}>
                      {selectedCertificate.level}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">ציון:</label>
                    <p className="font-semibold text-green-600">{selectedCertificate.score}%</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">תאריך הנפקה:</label>
                    <p className="font-semibold">{selectedCertificate.issuedDate.toLocaleDateString('he-IL')}</p>
                  </div>
                </div>

                {/* Blockchain Info */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    מידע בלוקצ&apos;יין
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Hash:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{selectedCertificate.blockchainHash.slice(0, 10)}...</span>
                        <Button size="sm" variant="ghost">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{selectedCertificate.transactionId.slice(0, 10)}...</span>
                        <Button size="sm" variant="ghost">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    פרטי הקורס
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">שיעורים הושלמו:</span>
                      <p className="font-semibold">{selectedCertificate.metadata.lessonsCompleted}/{selectedCertificate.metadata.totalLessons}</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">שעות לימוד:</span>
                      <p className="font-semibold">{selectedCertificate.metadata.studyHours}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">הישגים:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCertificate.metadata.achievements.map((achievement, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-xs">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => verifyCertificate()}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    אמת תעודה
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareCertificate(selectedCertificate)}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                {/* Verification Result */}
                {verificationResult && (
                  <div className={`p-3 rounded-lg ${
                    verificationResult.isValid 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    <div className="flex items-center gap-2">
                      {verificationResult.isValid ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                      <span className="font-medium">{verificationResult.message}</span>
                    </div>
                    <p className="text-xs mt-1">
                      {verificationResult.timestamp.toLocaleString('he-IL')}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  בחר תעודה כדי לראות פרטים
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Generate New Certificate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span>צור תעודה חדשה</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                מוכן לתעודה הבאה?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                השלם קורס כדי לקבל תעודה מאובטחת בבלוקצ&apos;יין
              </p>
            </div>
            <Button
              onClick={generateCertificate}
              disabled={isGenerating}
              className="bg-gradient-to-r from-green-500 to-blue-600"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  יוצר תעודה...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  צור תעודה
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
