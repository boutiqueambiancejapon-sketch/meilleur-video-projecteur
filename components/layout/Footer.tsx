/**
 * Footer — footer FAISCEAU.
 * 4 colonnes (Comparer, Apprendre, Produits, À propos) + brand + disclosure affiliée.
 * Server Component, zéro JS.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'
import { getAllProducts } from '@/lib/products'

function currentYear(): number {
  return new Date().getFullYear()
}

type Col = { title: string; links: Array<{ href: string; label: string }> }

export function Footer() {
  const products = getAllProducts().slice(0, 4)

  const cols: Col[] = [
    {
      title: 'Comparer',
      links: [
        { href: '/comparatif', label: 'Tous les modèles' },
        ...niche.categories.map((c) => ({ href: `/comparatif?cat=${c.slug}`, label: c.label })),
      ],
    },
    {
      title: 'Apprendre',
      links: [
        { href: '/guide', label: "Guide d'achat" },
        { href: '/guide#lumens', label: 'Lumens & luminosité' },
        { href: '/guide#focale', label: 'Focale & recul' },
        { href: '/guide#ecran', label: 'Écrans' },
      ],
    },
    {
      title: 'Fiches produit',
      links: products.map((p) => ({ href: `/produit/${p.slug}`, label: `${p.brand} ${p.name}` })),
    },
    {
      title: 'À propos',
      links: [
        ...(niche.author.slug ? [{ href: `/auteurs/${niche.author.slug}`, label: niche.author.name }] : []),
        { href: '/mentions-legales', label: 'Mentions légales' },
        { href: '/confidentialite', label: 'Confidentialité' },
      ],
    },
  ]

  return (
    <footer style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', borderTop: '1px solid var(--border)', padding: '72px clamp(20px, 5vw, 72px) 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gap: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '11px', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: '28px', color: 'var(--text-primary)', textDecoration: 'none' }}>
            <span style={{ position: 'relative', width: '14px', height: '14px' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--beam)', boxShadow: '0 0 14px 2px var(--beam)' }} />
            </span>
            {niche.logo}
          </Link>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', maxWidth: '70ch', lineHeight: 1.5, margin: 0 }}>
            {niche.siteName} est un comparateur indépendant. Certains liens sont affiliés : si vous achetez via l&apos;un d&apos;eux, je touche une commission, sans surcoût pour vous. Cela ne change rien à mes classements, fondés sur la mesure.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(40px, 8vw, 120px)', flexWrap: 'wrap' }}>
          {cols.map((col) => col.links.length === 0 ? null : (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 16px', fontWeight: 400 }}>
                {col.title}
              </h4>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} style={{ display: 'block', padding: '6px 0', color: 'var(--text-secondary)', fontSize: '15px', textDecoration: 'none' }}>{l.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '13px' }}>
          <span>© {currentYear()} {niche.siteName} — Comparateur indépendant de vidéoprojecteurs</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>Fait dans le noir, à la lumière d&apos;un projecteur.</span>
        </div>
      </div>
    </footer>
  )
}
