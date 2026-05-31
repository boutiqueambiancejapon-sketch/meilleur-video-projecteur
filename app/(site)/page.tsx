/**
 * HomePage — FAISCEAU home pour Meilleur Vidéo-Projecteur.
 * Sections fixées (pas via niche.homeSections, le design Claude Design dicte l'ordre) :
 * Hero → Marquee → Categories → Rail → Methodology → Guide teaser → Final CTA.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '@/components/home/HeroSection'
import { MarqueeStrip } from '@/components/effects/MarqueeStrip'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { ProjectorRail } from '@/components/home/ProjectorRail'
import { MethodologySection } from '@/components/home/MethodologySection'
import { GuideTeaserSection } from '@/components/home/GuideTeaserSection'

const MARQUEE_ITEMS = ['4K UHD', 'Laser tri-couleur', '3 000 lumens ANSI', '16 ms input lag', '240 Hz', 'Dolby Vision', 'Ultra-courte focale']

function MarqueeFaisceau() {
  return (
    <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <MarqueeStrip speed="slow" gap="2.5rem">
        {MARQUEE_ITEMS.map((item) => (
          <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px', padding: '18px 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>
            {item}
            <span style={{ color: 'var(--beam)', fontSize: '0.7em', paddingInline: '28px' }}>✦</span>
          </span>
        ))}
      </MarqueeStrip>
    </div>
  )
}

function FinalCtaSection() {
  return (
    <section style={{ padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 72px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em', justifyContent: 'center' }}>
          <span style={{ width: '26px', height: '1px', background: 'var(--beam)' }} />
          Prêt à projeter ?
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(48px, 9vw, 132px)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: '18px auto 0', maxWidth: '14ch', color: 'var(--text-primary)' }}>Trouvez votre faisceau.</h2>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '34px' }}>
          <Link href="/comparatif" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'var(--beam)', color: '#0a0710', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 14px 40px -12px var(--beam)' }}>
            Lancer le comparatif <ArrowRight size={18} />
          </Link>
          <Link href="/guide" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none' }}>
            Je débute, guidez-moi
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <MarqueeFaisceau />
      <CategoryGrid />
      <ProjectorRail />
      <MethodologySection />
      <GuideTeaserSection />
      <FinalCtaSection />
    </main>
  )
}
