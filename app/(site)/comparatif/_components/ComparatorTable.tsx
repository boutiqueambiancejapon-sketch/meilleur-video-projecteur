'use client'

/**
 * ComparatorTable — table filtrable/triable des projecteurs (client-side).
 * Filtres par catégorie + tri par note/prix/lumens/lag.
 */

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import type { Product } from '@/lib/products'
import type { NicheConfig } from '@/niche.config'

type SortKey = 'rating' | 'price-asc' | 'price-desc' | 'lumens' | 'lag'

function parsePrice(s: string): number { return Number(s.replace(/[^\d,]/g, '').replace(',', '.')) }
function parseLag(s?: string): number {
  if (!s) return 9999
  const m = s.match(/(\d+(?:[.,]\d+)?)\s*ms/)
  return m ? Number(m[1].replace(',', '.')) : 9999
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span style={{ display: 'inline-flex', gap: '3px', color: 'var(--accent-2)' }}>
      {[1,2,3,4,5].map((i) => <Star key={i} size={15} fill={i <= full ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} />)}
    </span>
  )
}

export function ComparatorTable({ products, categories }: { products: Product[]; categories: NicheConfig['categories'] }) {
  const [filter, setFilter] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('rating')

  const filtered = useMemo(() => {
    let list = products.filter((p) => filter === 'all' || p.categorie === filter || p.secondaryCategorie === filter)
    list = list.slice().sort((a, b) => {
      switch (sort) {
        case 'rating': return (b.rating ?? 0) - (a.rating ?? 0)
        case 'price-asc': return parsePrice(a.prix) - parsePrice(b.prix)
        case 'price-desc': return parsePrice(b.prix) - parsePrice(a.prix)
        case 'lumens': return (b.specs?.lumensAnsi ?? b.specs?.lumensIso ?? 0) - (a.specs?.lumensAnsi ?? a.specs?.lumensIso ?? 0)
        case 'lag': return parseLag(a.specs?.inputLag) - parseLag(b.specs?.inputLag)
      }
    })
    return list
  }, [products, filter, sort])

  const maxLumens = Math.max(...products.map((p) => p.specs?.lumensAnsi ?? p.specs?.lumensIso ?? 0))
  const minLag = Math.min(...products.map((p) => parseLag(p.specs?.inputLag)))
  const maxLag = Math.max(...products.filter((p) => parseLag(p.specs?.inputLag) < 9999).map((p) => parseLag(p.specs?.inputLag)))

  return (
    <>
      <div style={{ position: 'sticky', top: '64px', zIndex: 40, background: 'color-mix(in oklab, var(--bg-primary) 86%, transparent)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)', display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Tous</FilterButton>
            {categories.map((c) => <FilterButton key={c.slug} active={filter === c.slug} onClick={() => setFilter(c.slug)}>{c.label}</FilterButton>)}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{filtered.length} modèle{filtered.length > 1 ? 's' : ''}</span>
            <label htmlFor="sort" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Trier</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} style={{ fontFamily: 'var(--font-primary)', fontSize: '14px', fontWeight: 600, padding: '9px 14px', borderRadius: '100px', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', cursor: 'pointer' }}>
              <option value="rating">Note rédac&apos;</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="lumens">Luminosité</option>
              <option value="lag">Input lag</option>
            </select>
          </div>
        </div>
      </div>
      <section style={{ padding: '40px clamp(20px, 5vw, 72px) 110px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Aucun modèle dans cette catégorie.</div>
          ) : filtered.map((p, i) => {
            const lumens = p.specs?.lumensAnsi ?? p.specs?.lumensIso ?? 0
            const lag = parseLag(p.specs?.inputLag)
            const lagScore = lag < 9999 ? 1 - (lag - minLag) / (maxLag - minLag || 1) : 0
            return (
              <article key={p.slug} style={{ ['--cc' as string]: p.accentColor ?? 'var(--beam)', display: 'grid', gridTemplateColumns: '92px 1.3fr 1.5fr auto', gap: '28px', alignItems: 'center', padding: '26px 28px', border: '1px solid var(--border)', borderRadius: '18px', background: 'var(--bg-surface)', marginBottom: '16px', position: 'relative', transition: 'border-color 0.4s, transform 0.4s, background 0.4s' } as React.CSSProperties} className="faisceau-crow">
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '46px', lineHeight: 1, color: p.accentColor ?? 'var(--beam)' }}>
                  {String(i + 1).padStart(2, '0')}
                  <small style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 400 }}>{sort === 'rating' ? 'CLASSEMENT' : 'TRI'}</small>
                </div>
                <div style={{ aspectRatio: '4 / 3', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-surface-2)', position: 'relative' }}>
                  {p.image && <Image src={p.image} alt={`${p.brand} ${p.name}`} fill sizes="(max-width: 940px) 100vw, 300px" style={{ objectFit: 'cover' }} />}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{p.brand} · {p.specs?.type ?? ''}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, margin: '4px 0 8px', color: 'var(--text-primary)' }}>{p.name}</h3>
                  {typeof p.rating === 'number' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <Stars rating={p.rating} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-2)', fontSize: '14px' }}>{p.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <Metrics resolution={p.specs?.resolution ?? '—'} lumens={lumens} maxLumens={maxLumens} lag={p.specs?.inputLag ?? 'n/d'} lagScore={lagScore} rating={p.rating} accent={p.accentColor ?? 'var(--beam)'} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '180px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '26px', color: 'var(--text-primary)' }}>{p.prix}</div>
                  <Link href={`/produit/${p.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '11px 20px', background: 'var(--beam)', color: '#0a0710', fontWeight: 600, fontSize: '14px', borderRadius: '100px', textDecoration: 'none' }}>Voir la fiche <ArrowRight size={16} /></Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <style>{`
        .faisceau-crow:hover { border-color: color-mix(in oklab, var(--cc, var(--beam)) 55%, var(--border)); transform: translateY(-3px); }
        @media (max-width: 1040px) { .faisceau-crow { grid-template-columns: 70px 1fr !important; row-gap: 22px; } }
      `}</style>
    </>
  )
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ fontFamily: 'var(--font-primary)', fontSize: '14px', fontWeight: 600, padding: '9px 16px', borderRadius: '100px', border: `1px solid ${active ? 'var(--beam)' : 'var(--border)'}`, background: active ? 'var(--beam)' : 'transparent', color: active ? '#0a0710' : 'var(--text-secondary)', transition: 'all 0.25s', cursor: 'pointer' }}>{children}</button>
  )
}

function Metrics({ resolution, lumens, maxLumens, lag, lagScore, rating, accent }: { resolution: string; lumens: number; maxLumens: number; lag: string; lagScore: number; rating?: number; accent: string }) {
  const Bar = ({ v }: { v: number }) => (
    <div style={{ height: '3px', borderRadius: '3px', background: 'var(--border)', marginTop: '9px', overflow: 'hidden' }}>
      <span style={{ display: 'block', height: '100%', width: `${Math.round(v * 100)}%`, background: accent, borderRadius: '3px' }} />
    </div>
  )
  const cell = (val: string, label: string, v: number) => (
    <div>
      <b style={{ fontFamily: 'var(--font-mono)', fontSize: '19px', display: 'block' }}>{val}</b>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>{label}</span>
      <Bar v={v} />
    </div>
  )
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
      {cell(resolution.split(' ')[0], 'RÉSOLUTION', resolution.startsWith('4K') ? 1 : 0.6)}
      {cell(lumens.toLocaleString('fr-FR'), 'LUMENS', maxLumens ? lumens / maxLumens : 0)}
      {cell(lag, 'INPUT LAG', lagScore)}
      {cell(rating?.toFixed(1) ?? '—', 'NOTE /5', (rating ?? 0) / 5)}
    </div>
  )
}
