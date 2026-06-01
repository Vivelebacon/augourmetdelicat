import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Cinematic "portal" hero, adapted from the Dreamcore Landing skill.
 * Depth ("profondeur") is built from several layers that each react to scroll
 * and to the mouse with a different magnitude — far layers barely move, near
 * layers move a lot — so the scene reads as 3D. Curtains part on mount, then
 * scrolling zooms the viewer "through" the portal.
 */
export default function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [open, setOpen] = useState(false)

  // ---- Scroll-driven depth (dive into the portal) ----
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.15, 2.6])
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 2.2])
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 1.9])
  const frameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.14])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.7], [0.5, 0.92])

  // ---- Mouse-driven depth ----
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.7 })
  const smy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.7 })

  // Per-layer parallax offsets (px). Nearer layers (bigger MAG) move more.
  const useLayer = (mag: number) => ({
    x: useTransform(smx, (v) => v * -mag),
    y: useTransform(smy, (v) => v * -mag),
  })
  const bg = useLayer(7)
  const glow = useLayer(13)
  const content = useLayer(11)
  const frame = useLayer(30)

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 150)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [prefersReduced, mx, my])

  const curtainOpen = open || !!prefersReduced

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink [perspective:1200px]">
      {/* Layer 1 (deepest) — video, strong scroll zoom + slow mouse parallax */}
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0">
        <motion.div style={{ x: bg.x, y: bg.y }} className="absolute -inset-[3%]">
          <video
            className="h-full w-full object-cover"
            poster="/assets/photos/gd-97.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/assets/video/pub-cine.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Layer 2 — atmosphere glow, mid-depth */}
      <motion.div style={{ scale: glowScale, x: glow.x, y: glow.y }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-framboise/20 blur-[140px]" />
      </motion.div>

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/40 to-navy/85" />
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,12,26,0.85))]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />

      {/* Layer 3 — content, near-depth (moves more on scroll, medium on mouse) */}
      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="relative z-20 flex h-full items-center justify-center px-5"
      >
        <motion.div style={{ x: content.x, y: content.y }} className="flex flex-col items-center text-center">
          <motion.img
            src="/assets/logo/logo_gourmet.png"
            alt="Au Gourmet Délicat"
            initial={{ opacity: 0, y: 18 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="mb-7 h-28 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] md:h-32"
          />
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="eyebrow text-gold-soft text-shadow-hero"
          >
            Au cœur du Pays du Mont-Blanc
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
            className="mt-4 max-w-4xl font-display text-6xl leading-[0.98] text-white text-shadow-hero md:text-8xl"
          >
            Traiteur depuis
            <br />
            <span className="italic text-gold-soft">trois générations</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/90 text-shadow-hero md:text-xl"
          >
            Yannick Fournet et Guillaume Sermet-Magdelain vous proposent un service traiteur
            avec des produits de saison de grande qualité.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={curtainOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link to="/contact" className="btn-primary">
              Contactez-nous
            </Link>
            <Link to="/cartes-menus" className="btn-ghost">
              Découvrir nos cartes
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Layer 4 (nearest) — ornamental gold frame, biggest parallax + scroll zoom-through */}
      <motion.div
        aria-hidden
        style={{ scale: frameScale, opacity: frameOpacity, x: frame.x, y: frame.y }}
        className="pointer-events-none absolute inset-0 z-30"
      >
        <div className="absolute inset-5 border border-gold/25 md:inset-10" />
        <Corner className="left-5 top-5 md:left-10 md:top-10" />
        <Corner className="right-5 top-5 rotate-90 md:right-10 md:top-10" />
        <Corner className="bottom-5 right-5 rotate-180 md:bottom-10 md:right-10" />
        <Corner className="bottom-5 left-5 -rotate-90 md:bottom-10 md:left-10" />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={curtainOpen ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute inset-x-0 bottom-7 z-30 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <span className="flex h-9 w-9 animate-bobUp items-center justify-center rounded-full border border-white/40">
          <ChevronDown size={16} />
        </span>
      </motion.div>

      {/* Curtains (above everything, slide away to reveal the scene) */}
      <Curtain side="left" open={curtainOpen} />
      <Curtain side="right" open={curtainOpen} />
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-px -translate-x-1/2 bg-gold/50 transition-opacity duration-700"
        style={{ opacity: curtainOpen ? 0 : 1 }}
      />
    </section>
  )
}

function Corner({ className = '' }: { className?: string }) {
  return (
    <span className={`absolute h-10 w-10 border-l-2 border-t-2 border-gold/60 md:h-14 md:w-14 ${className}`} />
  )
}

function Curtain({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const isLeft = side === 'left'
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 z-40 w-[52%]"
      style={{
        [isLeft ? 'left' : 'right']: 0,
        transform: open ? `translateX(${isLeft ? '-101%' : '101%'})` : 'translateX(0)',
        transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isLeft
          ? 'linear-gradient(105deg, #0E0A0C 0%, #14100F 55%, #1c0f17 100%)'
          : 'linear-gradient(255deg, #0E0A0C 0%, #14100F 55%, #1c0f17 100%)',
      }}
    >
      <span
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent"
        style={{ [isLeft ? 'right' : 'left']: 0 }}
      />
    </div>
  )
}
