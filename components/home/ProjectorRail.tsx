/**
 * ProjectorRail — rail horizontal scrollable des projecteurs sélectionnés (FAISCEAU "À l'affiche").
 * Lit getAllProducts() depuis content/produits/*.yaml.
 */

import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { getAllProducts } from '@/lib/products'

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span style={{ display: 'inline-flex', gap: '3px', color: 'var(--accent-2)' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} fill={i <= full ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} />
      ))}
    </span>
  )
}

export function ProjectorRail() {
  const products = getAllProducts()
  if (!products.length) return null

  return (
    <section style={{ padding: '0 clamp(20px, 5vw, 72px) clamp(80px, 12vh, 160px)', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '30px', marginBottom: '48px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
              <span style={{ width: '26px', height: '1px', background: 'var(--beam)' }} />
              La sélection
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 0.96, letterSpacing: '-0.02em', fontWeight: 800, margin: '16px 0 0', color: 'var(--text-primary)' }}>À l&apos;affiche.</h2>
          </div>
          <Link href="/comparatif" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em', fontWeight: 600, borderBottom: '1px solid currentColor', color: 'var(--text-primary)', textDecoration: 'none' }}>
            Comparer les {products.length} modèles →
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="faisceau-rail" style={{ display: 'grid', gridAutoFlow: 'column', gridAutoColumns: 'minmax(320px, 34vw)', gap: '22px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '18px' }}>
          {products.map((p) => (
            <article key={p.slug} style={{ ['--cc' as string]: p.accentColor ?? 'var(--beam)', scrollSnapAlign: 'start', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden', position: 'relative', transition: 'transform 0.5s, border-color 0.5s' } as React.CSSProperties}>
              <span style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 5, fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: p.badge === 'Notre choix' ? '6px 11px' : '5px 10px', borderRadius: '100px', fontWeight: 700, color: p.badge === 'Notre choix' ? '#1a1206' : 'var(--text-secondary)', background: p.badge === 'Notre choix' ? 'var(--accent-2)' : 'rgba(255,255,255,0.06)', border: p.badge === 'Notre choix' ? 'none' : '1px solid var(--border)' }}>
                {p.badge === 'Notre choix' ? '★ ' : ''}{p.badge ?? 'Testé'}
              </span>
              <div style={{ position: 'relative', aspectRatio: '4 / 3', background: 'var(--bg-surface-2)' }}>
                {p.image && <Image src={p.image} alt={`${p.brand} ${p.name} — vidéoprojecteur ${p.specs?.type ?? ''}`} fill sizes="(max-width: 940px) 100vw, 400px" style={{ objectFit: 'cover' }} />}
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{p.brand}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '4px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '23px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{p.name}</h3>
                  {typeof p.rating === 'number' && <Stars rating={p.rating} />}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', margin: '10px 0 16px', minHeight: '3em' }}>{p.hook}</p>
                <div style={{ display: 'flex', gap: '18px', padding: '14px 0', borderTop: '1px solid var(--border)' }}>
                  <div><b style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', display: 'block', color: 'var(--text-primary)' }}>{p.specs?.resolution?.split(' ')[0] ?? '—'}</b><span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>RÉSOLUTION</span></div>
                  <div><b style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', display: 'block', color: 'var(--text-primary)' }}>{p.specs?.lumensAnsi ?? p.specs?.lumensIso ?? '—'}</b><span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>LUMENS</span></div>
                  <div><b style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', display: 'block', color: 'var(--text-primary)' }}>{p.specs?.inputLag ? p.specs.inputLag.split(' ')[0] : 'n/d'}</b><span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>INPUT LAG</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '21px', color: 'var(--text-primary)' }}>{p.prix}</div>
                  <Link href={`/produit/${p.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em', fontWeight: 600, borderBottom: '1px solid currentColor', color: 'var(--text-primary)', textDecoration: 'none' }}>Voir la fiche →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .faisceau-rail::-webkit-scrollbar { height: 6px; }
        .faisceau-rail::-webkit-scrollbar-thumb { background: var(--beam); border-radius: 10px; }
      `}</style>
    </section>
  )
}
