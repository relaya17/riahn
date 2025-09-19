'use client'

import Head from 'next/head'

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  locale?: string
}

export function MetaTags({
  title = 'LanguageConnect - לימוד שפות אינטראקטיבי',
  description = 'למד שפות חדשות עם LanguageConnect - פלטפורמה אינטראקטיבית ללימוד עברית, ערבית, אנגלית ועוד. שיעורים, תרגולים, צ\'אט עם דוברי שפת אם ועוד.',
  keywords = 'לימוד שפות, עברית, ערבית, אנגלית, שיעורים, תרגולים, דוברי שפת אם',
  image = '/og-image.jpg',
  url = 'https://languageconnect.com',
  type = 'website',
  locale = 'he_IL'
}: MetaTagsProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Hebrew" />
      <meta name="author" content="LanguageConnect" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="LanguageConnect" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      {/* Theme color for supported browsers */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="LanguageConnect" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "LanguageConnect",
            "description": description,
            "url": url,
            "logo": image,
            "sameAs": [
              "https://facebook.com/languageconnect",
              "https://twitter.com/languageconnect",
              "https://instagram.com/languageconnect"
            ],
            "offers": {
              "@type": "Offer",
              "description": "לימוד שפות אינטראקטיבי",
              "category": "Education"
            }
          })
        }}
      />
    </Head>
  )
}
