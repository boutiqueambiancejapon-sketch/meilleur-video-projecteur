/**
 * /comparatif — comparateur filtrable des projecteurs.
 * Server Component qui charge les produits, ComparatorTable est client-side pour filtres/tri.
 */

import { getAllProducts } from '@/lib/products'
import { ComparatorTable } from './_components/ComparatorTable'
import { niche } from '@/niche.config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparatif vidéoprojecteurs',
  description: 'Le comparatif complet : filtrez par usage, budget et résolution. Vidéoprojecteurs testés et classés par Mathias.',
}

export default function ComparatifPage() {
  const products = getAllProducts()

  return (
    <main id="main-content">
      <section style={{ position: 'relative', paddingTop: '150px', paddingBottom: '60px', overflow: 'hidden', background: 'radial-gradient(80% 120% at 90% -10%, #1a1330 0%, transparent 55%), var(--bg-primary)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', gap: '10px', marginBottom: '22px' }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a>
            <span>/</span>
            <span>Comparatif</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
            <span style={{ width: '26px', height: '1px', background: 'var(--beam)' }} />
            {products.length} modèles testés · 340h de mesure
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 7vw, 96px)', letterSpacing: '-0.03em', fontWeight: 900, lineHeight: 0.96, margin: '16px 0 0', color: 'var(--text-primary)' }}>Le comparatif<br />complet.</h1>
          <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '56ch', marginTop: '20px' }}>Filtrez par usage et faites votre choix. Chaque chiffre est une mesure réelle — pas une valeur reprise de la fiche constructeur.</p>
        </div>
      </section>
      <ComparatorTable products={products} categories={niche.categories} />
    </main>
  )
}
