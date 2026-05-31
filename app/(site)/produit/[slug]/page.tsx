/**
 * /produit/[slug] — fiche produit dynamique (1 par projecteur).
 * Server Component. Lit content/produits/{slug}.yaml.
 */

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Minus, Star } from 'lucide-react'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { getProduct, getAllProductSlugs, getAllProducts } from '@/lib/products'
import type { Metadata } from 'next'

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return { title: 'Fiche introuvable' }
  return { title: `${p.brand} ${p.name} — test & avis`, description: p.hook }
}

function Stars({ rating, large = false }: { rating: number; large?: boolean }) {
  const full = Math.round(rating)
  const size = large ? 18 : 14
  return (
    <span style={{ display: 'inline-flex', gap: '3px', color: 'var(--accent-2)' }}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={size} fill={i <= full ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} />)}
    </span>
  )
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div style={{ background: 'var(--bg-surface)', padding: '26px 22px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(26px, 3.5vw, 40px)', lineHeight: 1, background: 'linear-gradient(180deg, #fff, var(--beam))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{v}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--text-muted)', marginTop: '10px', textTransform: 'uppercase' }}>{l}</div>
    </div>
  )
}

function PcCard({ label, items, accent, negative = false }: { label: string; items: string[]; accent: string; negative?: boolean }) {
  if (!items.length) return null
  const Icon = negative ? Minus : Check
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', background: 'var(--bg-surface)' }}>
      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 16px', color: accent }}>{label}</h4>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '12px' }}>
        {items.map((item) => (
          <li key={item} style={{ display: 'flex', gap: '12px', fontSize: '15px', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
            <Icon size={16} style={{ color: accent, flexShrink: 0, marginTop: '3px' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SpecSheet({ specs }: { specs?: import('@/lib/products').ProductSpecs }) {
  if (!specs) return null
  const rows: Array<[string, string | undefined]> = [
    ['Technologie', specs.tech],
    ['Résolution', specs.resolution],
    ['Luminosité', specs.lumensAnsi ? `${specs.lumensAnsi} ANSI` : specs.lumensIso ? `${specs.lumensIso} ISO` : undefined],
    ['Contraste', specs.contrast],
    ['Rapport de projection', specs.throwRatio],
    ['Input lag', specs.inputLag],
    ['Fréquence', specs.refresh],
    ['Niveau sonore', specs.noise],
    ['Système', specs.os],
    ['HDR', specs.hdr],
    ['Connectique', specs.connectivity],
    ['Haut-parleurs', specs.speakers],
    ['Durée de vie source', specs.laserLife ?? specs.lampLife],
    ['Batterie', specs.battery],
    ['Poids', specs.weight],
  ]
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {rows.filter(([, val]) => Boolean(val)).map(([label, val]) => (
          <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '15px 4px', fontSize: '15.5px', color: 'var(--text-secondary)', width: '42%' }}>{label}</td>
            <td style={{ padding: '15px 4px', fontSize: '15.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', textAlign: 'right' }}>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default async function ProduitPage({ params }: { params: Params }) {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) notFound()

  const related = getAllProducts().filter((x) => x.slug !== slug).slice(0, 3)
  const primaryLink = p.links?.[0]?.url ?? (p.asin ? `https://www.amazon.fr/dp/${p.asin}` : '#')

  return (
    <main id="main-content">
      <section style={{ position: 'relative', paddingTop: '130px', paddingBottom: '50px', overflow: 'hidden', background: 'radial-gradient(70% 110% at 80% -10%, #1c1433 0%, transparent 55%), var(--bg-primary)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', gap: '10px', marginBottom: '26px' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <Link href="/comparatif" style={{ color: 'inherit', textDecoration: 'none' }}>Comparatif</Link>
            <span>/</span>
            <span>{p.brand} {p.name}</span>
          </div>
          <div className="faisceau-phead" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'clamp(30px, 5vw, 64px)', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--beam-soft)' }}>{p.brand} · {p.specs?.type ?? ''}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(42px, 6.5vw, 86px)', letterSpacing: '-0.03em', fontWeight: 900, margin: '14px 0 0', color: 'var(--text-primary)', lineHeight: 0.96 }}>{p.name}.</h1>
              {typeof p.rating === 'number' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '22px 0 0' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '40px', color: 'var(--accent-2)', lineHeight: 1 }}>{p.rating.toFixed(1)}</span>
                  <div>
                    <Stars rating={p.rating} large />
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{p.badge ? `${p.badge} · ` : ''}{p.ratingCount ? `${p.ratingCount} avis` : 'Test rédactionnel'}</div>
                  </div>
                </div>
              )}
              <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '56ch', marginTop: '22px' }}>{p.hook}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '24px' }}>
                {(p.specs?.resolution ? [p.specs.resolution.split(' ')[0]] : []).concat(p.specs?.lumensAnsi ? [`${p.specs.lumensAnsi} ANSI`] : [], p.specs?.inputLag ? [p.specs.inputLag.split('·')[0].trim()] : [], p.specs?.throwRatio ? [p.specs.throwRatio] : []).map((chip) => (
                  <span key={chip} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.04em', padding: '7px 12px', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text-secondary)' }}>{chip}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ aspectRatio: '4 / 3', borderRadius: '20px', overflow: 'hidden', position: 'relative', background: 'var(--bg-surface-2)' }}>
                {p.badge === 'Notre choix' && <span style={{ position: 'absolute', top: '18px', left: '18px', zIndex: 5, fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1a1206', background: 'var(--accent-2)', padding: '6px 11px', borderRadius: '100px', fontWeight: 700 }}>★ Notre choix</span>}
                {p.image && <Image src={p.image} alt={`${p.brand} ${p.name} — vue principale`} fill sizes="(max-width: 940px) 100vw, 500px" style={{ objectFit: 'cover' }} priority />}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '60px clamp(20px, 5vw, 72px) clamp(80px, 12vh, 160px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'clamp(30px, 5vw, 60px)', alignItems: 'start' }} className="faisceau-pbody">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--beam-soft)', marginBottom: '18px' }}>En un coup d&apos;œil</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '18px', overflow: 'hidden', margin: '0 0 40px' }} className="faisceau-statband">
              <Stat v={String(p.specs?.lumensAnsi ?? p.specs?.lumensIso ?? '—')} l="Lumens" />
              <Stat v={p.specs?.inputLag ? p.specs.inputLag.split('·')[0].trim() : 'n/d'} l="Input lag" />
              <Stat v={p.specs?.noise ?? 'n/d'} l="Niveau sonore" />
              <Stat v={p.specs?.contrast?.split(' ')[0] ?? 'n/d'} l="Contraste" />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--beam-soft)', marginBottom: '18px' }}>Le bilan</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', margin: '14px 0' }} className="faisceau-pcgrid">
              <PcCard label="On a aimé" items={p.pros ?? []} accent="var(--accent-3)" />
              <PcCard label="On a moins aimé" items={p.cons ?? []} accent="#FF7A7A" negative />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--beam-soft)', marginTop: '50px', marginBottom: '18px' }}>Fiche technique</div>
            <SpecSheet specs={p.specs} />
            {p.verdict && (
              <div style={{ background: 'var(--paper)', color: 'var(--paper-ink)', borderRadius: '24px', padding: 'clamp(30px, 5vw, 56px)', marginTop: '50px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--beam-deep)' }}>Mon verdict</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 46px)', letterSpacing: '-0.02em', margin: '14px 0 18px', maxWidth: '24ch', fontWeight: 800, color: 'var(--paper-ink)' }}>{p.verdict}</h3>
                {typeof p.rating === 'number' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '28px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '64px', lineHeight: 1, color: 'var(--paper-ink)' }}>{p.rating.toFixed(1)}<small style={{ fontSize: '24px', color: '#8A8694' }}>/5</small></div>
                    <Stars rating={p.rating} large />
                  </div>
                )}
              </div>
            )}
          </div>
          <aside>
            <div style={{ position: 'sticky', top: '90px', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', background: 'var(--bg-surface)' }} className="faisceau-buybox">
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '38px', lineHeight: 1, color: 'var(--text-primary)' }}>
                  {p.prix}
                  {p.prixFull && <span style={{ fontSize: '16px', color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: 400, marginLeft: '10px' }}>{p.prixFull}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--accent-3)', marginTop: '14px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-3)', boxShadow: '0 0 8px var(--accent-3)' }} />
                  Voir disponibilité Amazon
                </div>
              </div>
              <div style={{ padding: '18px 24px', display: 'grid', gap: '10px' }}>
                <AffiliateLink href={primaryLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: 'var(--accent-2)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '16px', color: '#0a0710' }}>a</span>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>Amazon<small style={{ display: 'block', color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>Vendu &amp; expédié</small></span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '16px' }}>{p.prix}</span>
                </AffiliateLink>
              </div>
              <div style={{ padding: '0 24px 24px' }}>
                <AffiliateLink href={primaryLink} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6em', width: '100%', padding: '15px 26px', background: 'var(--beam)', color: '#0a0710', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none' }}>Voir l&apos;offre Amazon <ArrowRight size={18} /></AffiliateLink>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '14px', lineHeight: 1.5 }}>Lien affilié. En achetant via ce lien, vous soutenez Meilleur Vidéo-Projecteur sans payer plus cher. Prix indicatif, susceptible de varier.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      {related.length > 0 && (
        <section style={{ padding: '0 clamp(20px, 5vw, 72px) clamp(80px, 12vh, 160px)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '30px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>À comparer aussi.</h2>
              <Link href="/comparatif" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em', color: 'var(--text-primary)', fontWeight: 600, borderBottom: '1px solid currentColor', textDecoration: 'none' }}>Tout le comparatif →</Link>
            </div>
            <div className="faisceau-related" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/produit/${r.slug}`} style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-surface)', color: 'inherit', textDecoration: 'none', transition: 'transform 0.4s, border-color 0.4s' }}>
                  <div style={{ aspectRatio: '16 / 10', position: 'relative', background: 'var(--bg-surface-2)' }}>
                    {r.image && <Image src={r.image} alt={`${r.brand} ${r.name}`} fill sizes="(max-width: 820px) 100vw, 400px" style={{ objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '18px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{r.brand} · {r.specs?.type ?? ''}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 700, margin: '4px 0 10px', color: 'var(--text-primary)' }}>{r.name}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>{r.prix}</span>
                      {typeof r.rating === 'number' && <Stars rating={r.rating} />}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <style>{`
        @media (max-width: 980px) { .faisceau-pbody { grid-template-columns: 1fr !important; } .faisceau-buybox { position: relative !important; top: auto !important; } }
        @media (max-width: 680px) { .faisceau-statband { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 940px) { .faisceau-phead { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .faisceau-pcgrid { grid-template-columns: 1fr !important; } }
        @media (max-width: 820px) { .faisceau-related { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
