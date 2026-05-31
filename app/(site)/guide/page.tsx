/**
 * /guide — guide d'achat 4 chapitres (lumens, focale, source, écran).
 * Server Component, contenu statique.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Guide d'achat vidéoprojecteur",
  description: "Lumens, focale, contraste, écran : Mathias traduit la fiche technique en décisions simples.",
}

const ENV = [
  { env: 'Pièce noire', v: 0.35, val: '1 000–1 500', unit: 'ANSI' },
  { env: 'Salon tamisé', v: 0.55, val: '1 800–2 500', unit: 'ANSI' },
  { env: 'Lumière du jour', v: 0.8, val: '2 700–3 500', unit: 'ANSI' },
  { env: 'Plein soleil', v: 1, val: '3 500+', unit: 'ANSI' },
]
const THROWS = [
  { ratio: '0.25:1', name: 'Ultra-courte (UST)', body: 'Posé contre le mur, 100" à ~30 cm. Idéal salon sans installation.' },
  { ratio: '0.8:1', name: 'Courte focale', body: 'Grande image avec peu de recul. Bon compromis petites pièces.' },
  { ratio: '1.5:1', name: 'Focale standard', body: 'Le plafond du salon, 3–4 m de recul. La plus polyvalente.' },
]
const TECH = [
  { source: 'Laser', life: '20 000 h', contrast: 'Excellent', noise: 'Très silencieux', price: '€€€', cls: ['good', 'good', 'good', 'bad'] },
  { source: 'LED', life: '30 000 h', contrast: 'Bon', noise: 'Silencieux', price: '€€', cls: ['good', 'mid', 'good', 'good'] },
  { source: 'Lampe', life: '4 000 h', contrast: 'Variable', noise: 'Ventilation', price: '€', cls: ['bad', 'mid', 'bad', 'good'] },
]
const techColor: Record<string, string> = { good: 'var(--accent-3)', mid: 'var(--accent-2)', bad: '#FF6B6B' }

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
      <span style={{ width: '26px', height: '1px', background: 'var(--beam)' }} />
      {children}
    </span>
  )
}
function ChapterTitle({ no, title }: { no: string; title: React.ReactNode }) {
  return (
    <>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--beam-soft)', letterSpacing: '0.1em' }}>{no}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.4vw, 56px)', margin: '14px 0 22px', letterSpacing: '-0.025em', fontWeight: 800, color: 'var(--text-primary)' }}>{title}</h2>
    </>
  )
}
function Callout({ mark, children, light = false }: { mark: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '18px', padding: '22px', border: `1px solid ${light ? 'rgba(21,19,26,0.14)' : 'var(--border)'}`, borderRadius: '16px', background: light ? 'linear-gradient(180deg, rgba(108,63,240,.07), transparent)' : 'linear-gradient(180deg, rgba(155,108,255,.06), transparent)', margin: '30px 0' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: light ? 'var(--beam-deep)' : 'var(--beam)', fontSize: '26px', lineHeight: 1 }}>{mark}</span>
      <p style={{ margin: 0, fontSize: '15.5px', color: light ? '#4A4654' : 'var(--text-secondary)' }}>{children}</p>
    </div>
  )
}

export default function GuidePage() {
  return (
    <main id="main-content">
      <section style={{ position: 'relative', paddingTop: '160px', paddingBottom: '70px', overflow: 'hidden', background: 'radial-gradient(70% 120% at 15% -10%, #1a1330 0%, transparent 55%), var(--bg-primary)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 72px)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'flex', gap: '10px', marginBottom: '22px' }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</a><span>/</span><span>Guide d&apos;achat</span>
          </div>
          <Kicker>Le guide</Kicker>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(46px, 8vw, 110px)', letterSpacing: '-0.035em', fontWeight: 900, lineHeight: 0.96, margin: '16px 0 0', color: 'var(--text-primary)' }}>Tout comprendre<br />avant d&apos;acheter.</h1>
          <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '60ch', marginTop: '20px' }}>Quatre notions décident de 90 % de votre satisfaction. Je les traduis en décisions simples — sans jargon inutile.</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vh, 120px) clamp(20px, 5vw, 72px) 30px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'clamp(30px, 6vw, 80px)' }} className="faisceau-guide-wrap">
          <aside style={{ position: 'sticky', top: '110px', alignSelf: 'start' }} className="faisceau-toc">
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 18px' }}>Chapitres</h4>
            {[{ href: '#lumens', n: '01', label: 'Lumens & luminosité' }, { href: '#focale', n: '02', label: 'Focale & recul' }, { href: '#techno', n: '03', label: 'Laser, LED ou lampe' }, { href: '#ecran', n: '04', label: "L'écran (ou le mur)" }].map((l) => (
              <a key={l.href} href={l.href} style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '9px 0 9px 14px', color: 'var(--text-secondary)', fontSize: '15px', borderLeft: '2px solid transparent', marginLeft: '-16px', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{l.n}</span>
                {l.label}
              </a>
            ))}
          </aside>
          <div>
            <article id="lumens" style={{ paddingBlock: 'clamp(20px, 5vh, 60px)' }}>
              <ChapterTitle no="01 — Luminosité" title={<>Combien de lumens<br />pour ma pièce ?</>} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '62ch' }}>Le <strong style={{ color: 'var(--text-primary)' }}>lumen ANSI</strong> mesure la lumière réellement projetée. Plus la pièce est lumineuse, plus il en faut. Méfiez-vous des « lumens LED » gonflés des fiches marketing : je ne compare que des lumens ANSI mesurés.</p>
              <div style={{ margin: '36px 0', display: 'grid', gap: '10px' }}>
                {ENV.map((r) => (
                  <div key={r.env} style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: '16px', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.env}</span>
                    <span style={{ height: '8px', borderRadius: '8px', background: 'var(--bg-surface-2)', overflow: 'hidden' }}>
                      <span style={{ display: 'block', height: '100%', width: `${r.v * 100}%`, background: 'linear-gradient(90deg, var(--beam-deep), var(--beam), var(--accent-2))', borderRadius: '8px' }} />
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-primary)' }}>{r.val} <small style={{ color: 'var(--text-muted)' }}>{r.unit}</small></span>
                  </div>
                ))}
              </div>
              <Callout mark="!"><strong>La règle d&apos;or :</strong> pour une image de 100 pouces dans un salon que vous n&apos;assombrissez pas totalement, visez au minimum <strong>2 500 lumens ANSI</strong>. En dessous, l&apos;image « passe » mais perd son éclat dès qu&apos;un rayon entre.</Callout>
            </article>
            <article id="focale" style={{ paddingBlock: 'clamp(40px, 7vh, 90px)', borderTop: '1px solid var(--border)' }}>
              <ChapterTitle no="02 — Recul" title={<>Quelle focale<br />pour quel recul ?</>} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '62ch' }}>La <strong style={{ color: 'var(--text-primary)' }}>focale</strong> détermine la distance entre le projecteur et le mur pour une taille d&apos;image donnée. C&apos;est souvent ce qui condamne un achat : trop de recul exigé pour la pièce.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', margin: '34px 0' }} className="faisceau-throws">
                {THROWS.map((t) => (
                  <div key={t.ratio} style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '22px', background: 'var(--bg-surface)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '32px', color: 'var(--beam-soft)' }}>{t.ratio}</div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', margin: '6px 0 8px', color: 'var(--text-primary)' }}>{t.name}</h4>
                    <p style={{ fontSize: '14.5px', margin: 0, color: 'var(--text-secondary)' }}>{t.body}</p>
                  </div>
                ))}
              </div>
            </article>
            <article id="techno" style={{ paddingBlock: 'clamp(40px, 7vh, 90px)', borderTop: '1px solid var(--border)' }}>
              <ChapterTitle no="03 — Source lumineuse" title={<>Laser, LED<br />ou lampe ?</>} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '62ch' }}>La source dicte la durée de vie, le contraste et le silence. En 2026, le <strong style={{ color: 'var(--text-primary)' }}>laser</strong> s&apos;est imposé sur le haut de gamme, la <strong style={{ color: 'var(--text-primary)' }}>LED</strong> sur le nomade, la <strong style={{ color: 'var(--text-primary)' }}>lampe</strong> ne tient plus que sur l&apos;entrée de gamme et le gaming abordable.</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: '30px 0' }}>
                <thead>
                  <tr>{['Source', 'Durée de vie', 'Contraste', 'Silence', 'Prix'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '16px 14px', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 400 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {TECH.map((row) => (
                    <tr key={row.source}>
                      <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-primary)' }}>{row.source}</td>
                      <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)', color: techColor[row.cls[0]] }}>{row.life}</td>
                      <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)', color: techColor[row.cls[1]] }}>{row.contrast}</td>
                      <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)', color: techColor[row.cls[2]] }}>{row.noise}</td>
                      <td style={{ padding: '16px 14px', borderBottom: '1px solid var(--border)', color: techColor[row.cls[3]] }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>
        </div>
      </section>
      <section id="ecran" style={{ background: 'var(--paper)', color: 'var(--paper-ink)', padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 72px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'clamp(30px, 6vw, 80px)' }} className="faisceau-guide-wrap">
          <div />
          <article>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--beam-deep)', letterSpacing: '0.1em' }}>04 — Surface</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.4vw, 56px)', margin: '14px 0 22px', letterSpacing: '-0.025em', fontWeight: 800, color: 'var(--paper-ink)' }}>L&apos;écran change<br />tout. Même un<br />bon mur suffit.</h2>
            <p style={{ color: '#4A4654', fontSize: '18px', maxWidth: '62ch' }}>Un projecteur ne vaut que par la surface qui reçoit sa lumière. Un <strong style={{ color: 'var(--paper-ink)' }}>mur blanc mat</strong> propre fait déjà un excellent travail. Mais un vrai écran apporte un gain de contraste et d&apos;uniformité immédiatement visible.</p>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: '20ch', margin: '30px 0', color: 'var(--paper-ink)' }}>Un écran <span style={{ color: 'var(--beam-deep)' }}>ALR</span> rend les noirs en plein jour ce qu&apos;un mur ne fera jamais.</div>
            <p style={{ color: '#4A4654', fontSize: '18px', maxWidth: '62ch' }}>Pour un projecteur <strong style={{ color: 'var(--paper-ink)' }}>UST</strong>, l&apos;écran <strong style={{ color: 'var(--paper-ink)' }}>ALR</strong> (à rejet de lumière ambiante) n&apos;est pas un luxe : c&apos;est lui qui rend l&apos;image regardable rideaux ouverts. Pour une salle dédiée et sombre, un écran blanc gain 1.0 reste la référence de neutralité.</p>
            <Callout mark="★" light><strong>Le bon réflexe :</strong> budgétez l&apos;écran <strong>dès l&apos;achat du projecteur</strong>, pas après. Comptez 10 à 20 % du prix du projecteur pour une surface à sa hauteur.</Callout>
          </article>
        </div>
      </section>
      <section style={{ textAlign: 'center', padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 72px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Kicker>Prêt à choisir ?</Kicker>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(48px, 9vw, 132px)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: '18px auto 0', maxWidth: '16ch', color: 'var(--text-primary)' }}>Au comparatif.</h2>
          <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '60ch', margin: '20px auto 0' }}>J&apos;ai fait le tri. Sept modèles, classés, mesurés, pour chaque usage.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
            <Link href="/comparatif" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'var(--beam)', color: '#0a0710', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none' }}>Voir le comparatif <ArrowRight size={18} /></Link>
            <Link href="/produit/xgimi-horizon-20-pro" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border)', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none' }}>Voir une fiche</Link>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 920px) { .faisceau-guide-wrap { grid-template-columns: 1fr !important; } .faisceau-toc { display: none !important; } }
        @media (max-width: 680px) { .faisceau-throws { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
