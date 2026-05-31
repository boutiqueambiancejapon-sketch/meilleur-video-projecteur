/**
 * CategoryGrid — 4 catégories FAISCEAU en grille 4 colonnes (FAISCEAU design).
 * Liens vers /comparatif?cat=<slug>. Hover glow accent.
 */

import Link from 'next/link'
import { niche } from '@/niche.config'

export function CategoryGrid() {
  return (
    <section style={{ padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 72px)', position: 'relative' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', marginBottom: '44px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
              <span style={{ width: '26px', height: '1px', background: 'var(--beam)' }} />
              Par usage
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.4vw, 60px)', lineHeight: 0.96, letterSpacing: '-0.02em', fontWeight: 800, margin: '16px 0 0', color: 'var(--text-primary)' }}>Chaque pièce a<br />son faisceau.</h2>
          </div>
          <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '38ch' }}>Dites-moi où vous projetez et ce que vous regardez — je m&apos;occupe du reste.</p>
        </div>
        <div className="faisceau-cats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {niche.categories.map((cat, i) => (
            <Link key={cat.slug} href={`/comparatif?cat=${cat.slug}`} className="faisceau-cat-card" style={{ ['--cc' as string]: cat.accent, position: 'relative', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', background: 'var(--bg-surface)', color: 'inherit', textDecoration: 'none', transition: 'border-color 0.5s, transform 0.5s' } as React.CSSProperties}>
              <span className="faisceau-cat-glow" style={{ position: 'absolute', inset: 'auto -30% -40% auto', width: '60%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${cat.accent} 0%, transparent 70%)`, opacity: 0, transition: 'opacity 0.5s', filter: 'blur(20px)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')} / {cat.label}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{cat.label}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: '8px 0 0' }}>{cat.description}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', color: 'var(--beam-soft)' }}>Voir la sélection →</span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .faisceau-cat-card:hover { border-color: color-mix(in oklab, var(--cc) 55%, var(--border)); transform: translateY(-4px); }
        .faisceau-cat-card:hover .faisceau-cat-glow { opacity: 0.4; }
        @media (max-width: 900px) { .faisceau-cats { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .faisceau-cats { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
