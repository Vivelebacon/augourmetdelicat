import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Cinematic "portal" hero, adapted from the Dreamcore Landing skill:
 * two curtains part on mount to reveal a parallax video/photo of the cuisine,
 * with a soft mouse-driven parallax and a scroll cue.
 */
export default function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 150)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (prefersReduced) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [prefersReduced])

  const curtainOpen = open || !!prefersReduced

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      {/* Layer 1 — parallax video / photo */}
      <motion.div
        style={{ y: bgY, scale: bgScale, transform: `translate(${mouse.x * -6}px, ${mouse.y * -6}px)` }}
        className="absolute inset-0"
      >
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

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/55 via-navy/45 to-navy/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,12,26,0.7))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />

      {/* Layer — content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex h-full flex-col items-center justify-center px-5 text-center"
      >
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

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={curtainOpen ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
        <span className="flex h-9 w-9 animate-bobUp items-center justify-center rounded-full border border-white/40">
          <ChevronDown size={16} />
        </span>
      </motion.div>

      {/* Layer — curtains (z above content, slide away to reveal) */}
      <Curtain side="left" open={curtainOpen} />
      <Curtain side="right" open={curtainOpen} />
      {/* center seam */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-px -translate-x-1/2 bg-gold/50 transition-opacity duration-700"
        style={{ opacity: curtainOpen ? 0 : 1 }}
      />
    </section>
  )
}

function Curtain({ side, open }: { side: 'left' | 'right'; open: boolean }) {
  const isLeft = side === 'left'
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 z-30 w-[52%]"
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
