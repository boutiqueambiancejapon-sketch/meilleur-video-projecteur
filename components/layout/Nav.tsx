'use client'

/**
 * Nav — navigation FAISCEAU.
 * Plate, dark, brand "Meilleur Vidéo-Projecteur" avec point lumineux beam.
 * Scroll-detection : ajoute un blur au fond une fois la première section passée.
 * Mobile : burger → drawer overlay.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { niche } from '@/niche.config'

const LINKS = [
  { href: '/comparatif', label: 'Comparatif' },
  { href: '/guide', label: "Guide d'achat" },
]

export function Nav() {
  const pathname = usePathname() ?? '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '12px clamp(20px, 5vw, 72px)' : '18px clamp(20px, 5vw, 72px)',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s, padding 0.4s',
        background: scrolled
          ? 'color-mix(in oklab, var(--bg-primary) 78%, transparent)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(1.2)' : undefined,
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '11px', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: '20px', color: 'var(--text-primary)', textDecoration: 'none' }}>
        <span style={{ position: 'relative', width: '13px', height: '13px' }}>
          <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--beam)', boxShadow: '0 0 14px 2px var(--beam)' }} />
        </span>
        {niche.logo}
      </Link>
      <nav className="faisceau-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {LINKS.map((l) => {
          const active = pathname === l.href || pathname.startsWith(`${l.href}/`)
          return (
            <Link key={l.href} href={l.href} style={{ padding: '9px 15px', fontSize: '15px', fontWeight: active ? 600 : 500, borderRadius: '100px', color: active ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'color 0.25s', textDecoration: 'none' }}>{l.label}</Link>
          )
        })}
        <Link href={niche.ctaPrimary.url} style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '11px 22px', background: 'var(--beam)', color: '#0a0710', fontWeight: 600, fontSize: '14px', borderRadius: '100px', textDecoration: 'none', boxShadow: '0 8px 24px -8px var(--beam)' }}>
          Voir le Top 7 <ArrowRight size={16} />
        </Link>
      </nav>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} className="faisceau-nav-burger" style={{ display: 'none', background: 'transparent', border: '1px solid var(--border)', borderRadius: '100px', padding: '10px', cursor: 'pointer', color: 'var(--text-primary)' }}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="faisceau-nav-mobile" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-primary)', zIndex: 100, padding: '90px 24px 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" style={{ position: 'absolute', top: '18px', right: '24px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '100px', padding: '10px', cursor: 'pointer', color: 'var(--text-primary)' }}>
            <X size={20} />
          </button>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={closeMenu} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '28px', padding: '12px 0', color: 'var(--text-primary)', textDecoration: 'none' }}>{l.label}</Link>
          ))}
          <Link onClick={closeMenu} href={niche.ctaPrimary.url} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6em', padding: '15px 26px', background: 'var(--beam)', color: '#0a0710', fontWeight: 600, fontSize: '16px', borderRadius: '100px', textDecoration: 'none', alignSelf: 'flex-start', marginTop: '20px' }}>
            Voir le Top 7 <ArrowRight size={18} />
          </Link>
        </div>
      )}
      <style>{`
        @media (max-width: 860px) {
          .faisceau-nav-desktop { display: none !important; }
          .faisceau-nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </header>
  )
}
