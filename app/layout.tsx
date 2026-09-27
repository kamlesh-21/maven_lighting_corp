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

export const metadata: Metadata = {
  metadataBase: new URL('https://mavendecoratives.com'),

  title: {
    default:
      'Maven Decoratives | Bespoke Decorative Lighting for Projects',
    template: '%s | Maven Decoratives',
  },

  description:
    'Maven Decoratives develops bespoke decorative lighting for hospitality, residential and commercial projects, from reference, concept or BOQ through design development, materials, fabrication and delivery.',

  keywords: [
    'bespoke decorative lighting',
    'custom decorative lighting',
    'hospitality lighting',
    'custom chandeliers',
    'custom pendant lighting',
    'custom wall lights',
    'decorative lighting India',
    'hotel lighting',
    'resort lighting',
    'architectural decorative lighting',
    'lighting manufacturing India',
    'custom lighting manufacturer',
    'Maven Decoratives',
  ],

  authors: [{ name: 'Maven Decoratives' }],
  creator: 'Maven Decoratives',
  publisher: 'Maven Decoratives',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mavendecoratives.com',
    siteName: 'Maven Decoratives',
    title:
      'Maven Decoratives | Bespoke Decorative Lighting for Projects',
    description:
      'Decorative lighting developed around the project. From reference, concept or BOQ to design development, materials, fabrication and delivery.',
    images: [
      {
        url: '/images/hero-chandelier.png',
        width: 1600,
        height: 1000,
        alt: 'Maven Decoratives bespoke decorative lighting',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Maven Decoratives | Bespoke Decorative Lighting for Projects',
    description:
      'Decorative lighting developed around the project.',
    images: ['/images/hero-chandelier.png'],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/icon2.png',
    apple: '/apple-icon.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maven Decoratives',
  url: 'https://mavendecoratives.com',
  logo: 'https://mavendecoratives.com/icon2.png',
  description:
    'Design-led bespoke decorative lighting for hospitality, residential and commercial projects.',
  email: 'mailto:maven.decoratives@gmail.com',
  telephone: '+91-96465-62880',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Basava 2nd, Arekere',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560076',
    addressCountry: 'IN',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bespoke Decorative Lighting Development',
  provider: {
    '@type': 'Organization',
    name: 'Maven Decoratives',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  description:
    'Custom decorative lighting development from reference, concept or BOQ through design development, materials, sampling, fabrication and delivery.',
  serviceType: 'Custom Decorative Lighting',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
            __html: JSON.stringify(serviceSchema),
          }}
        />

        <Analytics />
      </body>
    </html>
  )
}