'use client'

import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  locale?: string
  alternateLocales?: { locale: string; url: string }[]
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
  structuredData?: Record<string, unknown>
}

export function SEOHead({
  title = 'LanguageConnect - חיבור בין שפות ותרבויות',
  description = 'אפליקציה ללימוד שפות וחיבור בין משתמשים מכל העולם עם AI מתקדם, תרגום בזמן אמת, וקהילה גלובלית',
  keywords = [
    'לימוד שפות',
    'תרגול שפה',
    'AI',
    'בינה מלאכותית',
    'קהילה גלובלית',
    'שיעורים אינטראקטיביים',
    'דוברי שפה מקומיים',
    'LanguageConnect'
  ],
  image = '/og-image.jpg',
  url = 'https://languageconnect.com',
  type = 'website',
  author = 'LanguageConnect Team',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  locale = 'he_IL',
  alternateLocales = [
    { locale: 'en_US', url: 'https://languageconnect.com/en' },
    { locale: 'ar_SA', url: 'https://languageconnect.com/ar' }
  ],
  canonical,
  noindex = false,
  nofollow = false,
  structuredData
}: SEOHeadProps) {
  const fullTitle = title.includes('LanguageConnect') ? title : `${title} | LanguageConnect`
  const fullUrl = canonical || url
  const fullImage = image.startsWith('http') ? image : `${url}${image}`

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1'
  ].join(', ')

  const structuredDataScript = structuredData ? JSON.stringify(structuredData) : null

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#10b981" />

      <link rel="canonical" href={fullUrl} />

      {alternateLocales.map(({ locale: altLocale, url: altUrl }) => (
        <link key={altLocale} rel="alternate" hrefLang={altLocale} href={altUrl} />
      ))}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="LanguageConnect" />
      <meta property="og:locale" content={locale} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@LanguageConnect" />
      <meta name="twitter:creator" content="@LanguageConnect" />

      {structuredDataScript && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataScript }}
        />
      )}
    </Head>
  )
}
