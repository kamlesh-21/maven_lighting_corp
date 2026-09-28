import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const siteUrl = 'https://mavendecoratives.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Maven Decoratives | Bespoke Decorative Lighting',
    template: '%s | Maven Decoratives',
  },

  description:
    'Maven Decoratives develops bespoke decorative lighting for hotels, resorts, restaurants, commercial and residential projects across India, from reference, concept or BOQ through design development, materials, fabrication and delivery.',

  keywords: [
    'bespoke decorative lighting',
    'custom decorative lighting',
    'decorative lighting manufacturer India',
    'custom lighting manufacturer India',
    'hospitality lighting',
    'hotel decorative lighting',
    'resort lighting',
    'restaurant lighting',
    'custom chandeliers',
    'custom pendant lighting',
    'custom wall lights',
    'architectural decorative lighting',
    'custom lighting for hotels',
    'Maven Decoratives',
  ],

  authors: [
    {
      name: 'Maven Decoratives',
      url: siteUrl,
    },
  ],

  creator: 'Maven Decoratives',
  publisher: 'Maven Decoratives',

  category: 'Decorative Lighting',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Maven Decoratives',

    title: 'Maven Decoratives | Bespoke Decorative Lighting',

    description:
      'Design-led bespoke decorative lighting for hospitality, commercial and residential projects across India.',

    images: [
      {
        url: '/images/hero-chandelier.png',
        width: 1600,
        height: 1000,
        alt: 'Bespoke decorative lighting by Maven Decoratives',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Maven Decoratives | Bespoke Decorative Lighting',

    description:
      'Design-led bespoke decorative lighting for hospitality, commercial and residential projects across India.',

    images: ['/images/hero-chandelier.png'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  icons: {
    icon: '/icon2.png',
    apple: '/apple-icon.png',
  },
}

/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',

  '@id': `${siteUrl}/#organization`,

  name: 'Maven Decoratives',

  alternateName: 'Maven',

  url: siteUrl,

  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/icon2.png`,
  },

  description:
    'Maven Decoratives is a design-led decorative lighting studio developing bespoke lighting for hospitality, commercial and residential projects across India.',

  email: 'maven.decoratives@gmail.com',

  telephone: '+91-96465-62880',

  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560076',
    addressCountry: 'IN',
  },

  areaServed: {
    '@type': 'Country',
    name: 'India',
  },

  knowsAbout: [
    'Bespoke decorative lighting',
    'Hospitality lighting',
    'Custom chandeliers',
    'Custom pendant lighting',
    'Decorative wall lighting',
    'Lighting materials and finishes',
    'Custom fixture development',
    'Lighting fabrication',
  ],
}

/*
|--------------------------------------------------------------------------
| Website
|--------------------------------------------------------------------------
*/

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',

  '@id': `${siteUrl}/#website`,

  url: siteUrl,

  name: 'Maven Decoratives',

  description:
    'Bespoke decorative lighting for hospitality, commercial and residential projects.',

  publisher: {
    '@id': `${siteUrl}/#organization`,
  },

  inLanguage: 'en-IN',
}

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',

  '@id': `${siteUrl}/#bespoke-decorative-lighting`,

  name: 'Bespoke Decorative Lighting',

  serviceType: 'Custom Decorative Lighting',

  provider: {
    '@id': `${siteUrl}/#organization`,
  },

  areaServed: {
    '@type': 'Country',
    name: 'India',
  },

  description:
    'Custom decorative lighting developed from references, concepts or BOQs through design development, material and finish selection, sampling, fabrication and delivery.',

  audience: {
    '@type': 'BusinessAudience',
    audienceType:
      'Hotels, resorts, restaurants, architects, interior designers, developers, PMCs and procurement teams',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />

        <Analytics />
      </body>
    </html>
  )
}