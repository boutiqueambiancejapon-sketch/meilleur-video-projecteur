/**
 * MethodologySection — "340h de mesures" FAISCEAU.
 * 4 items méthode : Mesure pas marketing, Manette en main, Dans un vrai salon, Indépendance totale.
 */

const ITEMS = [
  { title: 'Mesure, pas marketing', body: 'Lumens ANSI réels, contraste on/off, dérive colorimétrique au colorimètre.' },
  { title: 'Manette en main', body: 'Input lag chronométré à 60, 120 et 240 Hz. Le ressenti, pas la fiche.' },
  { title: 'Dans un vrai salon', body: 'Lumière du jour, mur blanc cassé, recul réaliste. Comme chez vous.' },
  { title: 'Indépendance totale', body: 'Liens affiliés signalés. Le classement ne s’achète pas.' },
]

export function MethodologySection() {
  return (
    <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(80px, 12vh, 160px) clamp(20px, 5vw, 72px)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'clamp(30px, 6vw, 90px)', alignItems: 'center' }} className="faisceau-method-grid">
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--beam-soft)', display: 'inline-flex', alignItems: 'center', gap: '0.7em' }}>
            <span style={{ width: '26px', height: '1px', background: 'var(--beam)' }} />
            Ma méthode
          </span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(80px, 14vw, 200px)', lineHeight: 0.8, letterSpacing: '-0.04em', background: 'linear-gradient(180deg, var(--text-primary), var(--beam))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', margin: '14px 0' }}>340h</div>
          <p style={{ fontSize: 'clamp(18px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-secondary)', maxWidth: '56ch' }}>de mesures en conditions réelles, sonomètre, colorimètre et manette en main. Aucun modèle prêté ne dicte mon classement.</p>
        </div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {ITEMS.map((item, i) => (
            <li key={item.title} style={{ display: 'flex', gap: '20px', padding: '22px 0', borderTop: '1px solid var(--border)', borderBottom: i === ITEMS.length - 1 ? '1px solid var(--border)' : undefined }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--beam-soft)', fontSize: '13px', paddingTop: '4px', minWidth: '38px' }}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '15px' }}>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{`@media (max-width: 880px) { .faisceau-method-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
