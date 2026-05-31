import type { Metadata } from 'next'
import { Archivo, Archivo_Narrow, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { niche } from '@/niche.config'
import { t } from '@/lib/i18n'
import './globals.css'

// ── Fonts — FAISCEAU design system ──
// Body : Archivo (lecture, paragraphes, navigation)
// Display : Archivo Narrow (substitut éditorial à Archivo Expanded, non distribué via Google Fonts — on garde la même famille Archivo pour la cohérence)
// Mono : Space Mono (kicker, prix, specs tabulaires)
const fontPrimary = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-primary',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontDisplay = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--next-font-display',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--next-font-mono',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
  ),
  title: {
    template: `%s | ${niche.siteName}`,
    default: `${niche.tagline} | ${niche.siteName}`,
  },
  description: niche.tagline,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
    ...(niche.locales.length > 1 ? {
      languages: Object.fromEntries(
        niche.locales.map((locale) => [locale, `https://${niche.domain}/${locale === niche.defaultLocale ? '' : locale}`])
      ),
    } : {}),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${fontPrimary.variable} ${fontDisplay.variable} ${fontMono.variable}`}
    >
      {/* Script inline : applique data-theme avant tout rendu pour éviter le flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          {t('common.skipToContent')}
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
