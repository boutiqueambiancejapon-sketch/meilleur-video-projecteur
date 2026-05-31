/**
 * HeroSection — FAISCEAU hero, dark cinéma.
 * Beam canvas animé en fond + headline "Le bon faisceau change tout le film." +
 * card "Notre choix" à droite (image projecteur, marque, nom, prix).
 */

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BeamCanvas } from '@/components/effects/BeamCanvas'
import { niche } from '@/niche.config'
import { getAllProducts, type Product } from '@/lib/products'

function pickFeatured(): Product | null {
  const all = getAllProducts()
  return all.find((p) => p.badge === 'Notre choix') ?? all[0] ?? null
}

export function HeroSection() {
  const featured = pickFeatured()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(120% 90% at 80% 110%, #1a1330 0%, transparent 55%), radial-gradient(80% 70% at 10% 0%, #14101f 0%, transparent 60%), var(--bg-primary)',
      }}
    >
      <BeamCanvas />
      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: 'clamp(96px, 12vh, 140px) clamp(20px, 5vw, 72px) 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(30px, 5vw, 80px)', alignItems: 'center' }} className="hero-grid-faisceau">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
              <span style={{ width: '26px', height: '1px', background: 'var(--beam)', display: 'inline-block' }} />
              Comparateur indépendant · 2026
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 8.4vw, 124px)', lineHeight: 0.9, letterSpacing: '-0.035em', fontWeight: 900, textWrap: 'balance', margin: '18px 0 0', color: 'var(--text-primary)' }}>
              {niche.heroPrefix}{' '}
              <span style={{ background: 'linear-gradient(180deg, #fff 0%, var(--beam-soft) 70%, var(--beam) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textShadow: '0 0 40px color-mix(in oklab, var(--beam) 60%, transparent)', position: 'relative' }}>change</span>{' '}
              {niche.heroSuffix}
            </h1>
            <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '56ch', margin: '26px 0 0' }}>{niche.subtitle}</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '34px' }}>
              <Link href={niche.ctaPrimary.url} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'var(--beam)', color: '#0a0710', fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 14px 40px -12px var(--beam)' }}>
                {niche.ctaPrimary.text} <ArrowRight size={18} />
              </Link>
              <Link href={niche.ctaSecondary.url} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)', fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none' }}>{niche.ctaSecondary.text}</Link>
            </div>
          </div>
          {featured && (
            <aside style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: '20px', background: 'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.01))', backdropFilter: 'blur(6px)', padding: '16px' }}>
              <span style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 4, fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1206', background: 'var(--accent-2)', padding: '6px 11px', borderRadius: '100px', fontWeight: 700 }}>★ Notre choix</span>
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16 / 10', background: 'var(--bg-surface-2)' }}>
                {featured.image && <Image src={featured.image} alt={`${featured.brand ?? ''} ${featured.name} — vidéoprojecteur ${featured.specs?.type ?? ''}`} fill sizes="(max-width: 940px) 100vw, 500px" style={{ objectFit: 'cover' }} priority />}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 6px 4px', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{featured.brand}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '21px', fontWeight: 700, margin: '4px 0 0', color: 'var(--text-primary)' }}>{featured.name}</h2>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '20px', textAlign: 'right', color: 'var(--text-primary)' }}>
                  {featured.prix}
                  {featured.specs?.type && <small style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '12px', display: 'block' }}>{featured.specs.type}</small>}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 940px) { .hero-grid-faisceau { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  )
}
