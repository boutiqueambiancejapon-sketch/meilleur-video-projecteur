'use client'

/**
 * BeamCanvas — animation cinématique du faisceau lumineux + poussière qui flotte dedans.
 * Port du moteur canvas de Claude Design (design-incoming/assets/anim.js).
 * Le faisceau suit le pointeur, le cône s'éclaire en additive blend, la poussière
 * scintille avec un timer. Respect prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react'

type Mote = {
  x: number
  y: number
  z: number
  r: number
  vx: number
  vy: number
  a: number
  tw: number
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const n = parseInt(h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function BeamCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, DPR = 1
    let motes: Mote[] = []
    const origin = { x: 0, y: 0 }
    const mouse = { x: 0.5, y: 0.42 }
    let raf: number | null = null

    function intensity(): number {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--intensity')
      const f = parseFloat(v)
      return Number.isFinite(f) ? f : 0.75
    }
    function beamColor(): string {
      return getComputedStyle(document.documentElement).getPropertyValue('--beam').trim() || '#9B6CFF'
    }
    function newMote(): Mote {
      return { x: Math.random() * W, y: Math.random() * H, z: Math.random() * 0.8 + 0.2, r: Math.random() * 1.8 + 0.4, vx: (Math.random() - 0.3) * 0.25, vy: (Math.random() - 0.5) * 0.18, a: Math.random() * 0.5 + 0.1, tw: Math.random() * Math.PI * 2 }
    }
    function resize() {
      if (!canvas || !ctx) return
      DPR = Math.min(2, window.devicePixelRatio || 1)
      W = canvas.clientWidth; H = canvas.clientHeight
      canvas.width = W * DPR; canvas.height = H * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      origin.x = W * 0.12; origin.y = H * 0.16
      const count = Math.round(((W * H) / 14000) * intensity())
      motes = []
      for (let i = 0; i < count; i++) motes.push(newMote())
    }
    function inCone(x: number, y: number): number {
      const tx = origin.x + mouse.x * W * 0.9
      const ty = origin.y + mouse.y * H * 1.1
      const dx = tx - origin.x, dy = ty - origin.y
      const len = Math.hypot(dx, dy) || 1
      const nx = dx / len, ny = dy / len
      const px = x - origin.x, py = y - origin.y
      const along = px * nx + py * ny
      if (along < 0) return 0
      const perp = Math.abs(px * -ny + py * nx)
      const halfW = 40 + along * 0.42
      const t = 1 - perp / halfW
      return t > 0 ? t * Math.min(1, along / (W * 0.5)) : 0
    }
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      const [r, g, b] = hexToRgb(beamColor())
      const tx = origin.x + mouse.x * W * 0.9
      const ty = origin.y + mouse.y * H * 1.1
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const dx = tx - origin.x, dy = ty - origin.y
      const ang = Math.atan2(dy, dx)
      const spread = 0.28
      const far = Math.hypot(W, H) * 1.1
      const grad = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, far)
      grad.addColorStop(0, `rgba(${r},${g},${b},${0.22 * intensity()})`)
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.06 * intensity()})`)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(origin.x, origin.y)
      ctx.arc(origin.x, origin.y, far, ang - spread, ang + spread)
      ctx.closePath()
      ctx.fill()
      const hs = ctx.createRadialGradient(origin.x, origin.y, 0, origin.x, origin.y, 90)
      hs.addColorStop(0, `rgba(${r},${g},${b},0.9)`)
      hs.addColorStop(0.4, `rgba(${r},${g},${b},0.35)`)
      hs.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = hs
      ctx.beginPath(); ctx.arc(origin.x, origin.y, 90, 0, Math.PI * 2); ctx.fill()
      for (const m of motes) {
        m.x += m.vx * m.z; m.y += m.vy * m.z; m.tw += 0.03
        if (m.x < -10) m.x = W + 10; if (m.x > W + 10) m.x = -10
        if (m.y < -10) m.y = H + 10; if (m.y > H + 10) m.y = -10
        const lit = inCone(m.x, m.y)
        const tw = Math.sin(m.tw) * 0.4 + 0.6
        const alpha = m.a * (0.12 + lit * 1.6) * tw
        if (alpha < 0.02) continue
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(0.9, alpha)})`
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r * m.z * (1 + lit), 0, Math.PI * 2); ctx.fill()
      }
      ctx.restore()
      raf = requestAnimationFrame(draw)
    }
    const parent = canvas.parentElement
    function onMove(e: PointerEvent) {
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 0.7 + 0.15
      mouse.y = ((e.clientY - rect.top) / rect.height) * 0.6 + 0.05
    }
    function onResize() { resize() }
    parent?.addEventListener('pointermove', onMove)
    window.addEventListener('resize', onResize)
    resize()
    raf = requestAnimationFrame(draw)
    return () => {
      parent?.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
