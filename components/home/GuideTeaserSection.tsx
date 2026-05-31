/**
 * GuideTeaserSection — bloc paper (fond clair F4F1EA) teaser pour /guide.
 * 4 questions numérotées + CTA "Lire le guide".
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const POINTS = [
  { num: '01', question: 'Combien de lumens pour mon salon ?' },
  { num: '02', question: 'UST, courte ou longue focale : quel recul ?' },
  { num: '03', question: 'Laser, LED ou lampe : que choisir ?' },
  { num: '04', question: 'Quel écran (ou mur) pour mon projecteur ?' },
]

export function GuideTeaserSection() {
  return (
    <section style={{ background: 'var(--paper)', color: 'var(--paper-ink)', padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 72px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(30px, 5vw, 70px)', alignItems: 'center' }} className="faisceau-guide-grid">
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-deep)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
            <span style={{ width: '26px', height: '1px', background: 'var(--beam-deep)' }} />
            Avant d&apos;acheter
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.4vw, 60px)', lineHeight: 0.96, letterSpacing: '-0.02em', fontWeight: 800, margin: '16px 0 0', color: 'var(--paper-ink)' }}>Lumens, focale,<br />contraste : je<br />traduis tout.</h2>
          <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: '#4A4654', maxWidth: '52ch', marginTop: '22px' }}>Le guide d&apos;achat qui répond aux vraies questions avant de dépenser un centime.</p>
          <div style={{ display: 'grid', gap: '2px', marginTop: '8px' }}>
            {POINTS.map((p) => (
              <div key={p.num} style={{ display: 'flex', gap: '14px', alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid rgba(21,19,26,0.14)' }}>
                <b style={{ fontFamily: 'var(--font-mono)', color: 'var(--beam-deep)', fontSize: '13px' }}>{p.num}</b>
                <span style={{ color: 'var(--paper-ink)', fontSize: '17px' }}>{p.question}</span>
              </div>
            ))}
          </div>
          <Link href="/guide" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'var(--beam-deep)', color: '#fff', fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none', marginTop: '30px' }}>
            Lire le guide <ArrowRight size={18} />
          </Link>
        </div>
        <div style={{ aspectRatio: '4 / 5', borderRadius: '18px', overflow: 'hidden', background: 'linear-gradient(135deg, #ddd6c7 0%, #c4b59f 100%), repeating-linear-gradient(45deg, transparent 0 8px, rgba(0,0,0,0.04) 8px 9px)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '40px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px, 6vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--paper-ink)', maxWidth: '12ch' }}>Installer, mesurer, expliquer.</div>
        </div>
      </div>
      <style>{`@media (max-width: 820px) { .faisceau-guide-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
