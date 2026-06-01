import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ------------------------------------------------------------------
   CINEMATIC PORTAL HERO (adapted from the Dreamcore / Saveurs de Anna
   treatment). The hero video plays full-bleed in the deep background;
   a framed "portal" in the centre holds a cross-fading slideshow of the
   signature dishes. Scrolling drives a slow zoom THROUGH the portal with
   layered parallax depth. Curtains part on mount. Desktop mouse parallax.
   Fully gated behind prefers-reduced-motion.
-------------------------------------------------------------------*/

const ARCH = '50% 50% 50% 50% / 62% 62% 38% 38%'
const DARK = '#0A0E16'

// Slideshow ("diapo") shown inside the portal — best premium dishes/events.
const SLIDES = [
  '/assets/photos/gd-97.jpg',
  '/assets/photos/gd-27.jpg',
  '/assets/photos/dessert-1.jpg',
  '/assets/photos/gd-57.jpg',
  '/assets/photos/dessert-3.jpg',
  '/assets/photos/gd-79.jpg',
]

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), max)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = () => setDesktop(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return desktop
}

export default function HomeHero() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  const outerRef = useRef<HTMLDivElement>(null)
  const deepRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const curtainLRef = useRef<HTMLDivElement>(null)
  const curtainRRef = useRef<HTMLDivElement>(null)

  const [curtainsOpen, setCurtainsOpen] = useState(false)
  const [uiVisible, setUiVisible] = useState(false)
  const [slide, setSlide] = useState(0)
  const entranceDoneRef = useRef(false)

  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const progressRef = useRef(0)

  // entrance sequence
  useEffect(() => {
    if (reduced) {
      setCurtainsOpen(true)
      setUiVisible(true)
      entranceDoneRef.current = true
      return
    }
    const t1 = setTimeout(() => setCurtainsOpen(true), 150)
    const t2 = setTimeout(() => setUiVisible(true), 650)
    const t3 = setTimeout(() => {
      entranceDoneRef.current = true
    }, 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [reduced])

  // slideshow ("diapo")
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4200)
    return () => clearInterval(id)
  }, [])

  // mouse tracking (desktop only)
  useEffect(() => {
    if (reduced || !isDesktop) return
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, isDesktop])

  // scroll progress
  useEffect(() => {
    if (reduced) return
    const onScroll = () => {
      const outer = outerRef.current
      if (!outer) return
      const total = outer.offsetHeight - window.innerHeight
      progressRef.current = clamp(-outer.getBoundingClientRect().top / Math.max(total, 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  // RAF render loop — combine scroll + mouse (transform/opacity only)
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const render = () => {
      const p = progressRef.current
      const ep = easeInOut(p)
      mouse.current.x = lerp(mouse.current.x, mouse.current.tx, 0.06)
      mouse.current.y = lerp(mouse.current.y, mouse.current.ty, 0.06)
      const mx = mouse.current.x
      const my = mouse.current.y

      if (deepRef.current) {
        deepRef.current.style.transform = `translate3d(${-mx * 10}px, ${-my * 8}px, 0) scale(${lerp(1.08, 1.34, ep)})`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${-mx * 16}px, ${-my * 14}px, 0) scale(${lerp(1, 1.25, ep)})`
        glowRef.current.style.opacity = `${lerp(0.55, 0.12, ep)}`
      }
      if (portalRef.current) {
        portalRef.current.style.transform = `translate3d(${-mx * 7}px, ${-my * 6}px, 0) scale(${lerp(1, 6.2, ep)})`
        portalRef.current.style.opacity = `${clamp(1 - (p - 0.62) / 0.26, 0, 1)}`
      }
      if (frameRef.current) {
        frameRef.current.style.transform = `translate3d(${-mx * 12}px, ${-my * 10}px, 0) scale(${lerp(1, 9.5, ep)})`
        frameRef.current.style.opacity = `${clamp(1 - p / 0.5, 0, 1)}`
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = `${clamp(1 - p / 0.22, 0, 1)}`
        contentRef.current.style.transform = `translate3d(${-mx * 4}px, ${-my * 4}px, 0) scale(${lerp(1, 1.4, clamp(p / 0.4))})`
      }
      const curtainShift = lerp(0, 30, ep)
      if (curtainLRef.current) {
        const base = curtainsOpen ? -104 : 0
        curtainLRef.current.style.transform = `translate3d(calc(${base - curtainShift}% + ${-mx * 14}px), 0, 0) scale(${lerp(1, 1.15, ep)})`
      }
      if (curtainRRef.current) {
        const base = curtainsOpen ? 104 : 0
        curtainRRef.current.style.transform = `translate3d(calc(${base + curtainShift}% + ${-mx * 14}px), 0, 0) scale(${lerp(1, 1.15, ep)})`
      }
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [reduced, curtainsOpen])

  const curtainTransition =
    curtainsOpen && !entranceDoneRef.current ? 'transform 1.9s cubic-bezier(0.16,1,0.3,1)' : 'none'

  /* ---------------- REDUCED MOTION : elegant static fallback ---------------- */
  if (reduced) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden" style={{ backgroundColor: DARK }}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/assets/photos/gd-97.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/assets/video/pub-cine.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/45 to-navy/90" />
        <HeroCopy />
      </section>
    )
  }

  /* ---------------- CINEMATIC VERSION ---------------- */
  return (
    <div ref={outerRef} style={{ position: 'relative', height: '300vh' }}>
      <section
        className="grain sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: DARK }}
        aria-label="Au Gourmet Délicat — Traiteur à Sallanches"
      >
        {/* Layer 0 — deep background: the hero VIDEO */}
        <div
          ref={deepRef}
          className="absolute"
          style={{ inset: '-6%', transformOrigin: '50% 45%', willChange: 'transform' }}
          aria-hidden="true"
        >
          <video
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.5) saturate(1.05)' }}
            poster="/assets/photos/gd-97.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/assets/video/pub-cine.mp4" type="video/mp4" />
          </video>
        </div>

        {/* deep vignette */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 120% at 50% 40%, transparent 30%, rgba(5,9,15,0.65) 75%, rgba(5,9,15,0.95) 100%)' }}
          aria-hidden="true"
        />

        {/* Layer 1 — mid framboise/gold glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute"
          style={{
            top: '50%',
            left: '50%',
            width: '72vmin',
            height: '72vmin',
            marginLeft: '-36vmin',
            marginTop: '-36vmin',
            background: 'radial-gradient(circle, rgba(201,166,107,0.42) 0%, rgba(204,51,102,0.12) 45%, transparent 70%)',
            transformOrigin: '50% 50%',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />

        {/* Layer 2 — the PORTAL: a cross-fading slideshow masked into an arch */}
        <div
          ref={portalRef}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            width: 'min(78vw, 560px)',
            height: 'min(82vh, 720px)',
            marginLeft: 'calc(min(78vw, 560px) / -2)',
            marginTop: 'calc(min(82vh, 720px) / -2)',
            transformOrigin: '50% 46%',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: ARCH,
              filter: 'brightness(1.02) contrast(1.06) saturate(1.12)',
              boxShadow: 'inset 0 0 120px rgba(5,9,15,0.55)',
            }}
          >
            {SLIDES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-cinematic"
                style={{ opacity: i === slide ? 1 : 0 }}
              />
            ))}
          </div>
          {/* inner gradient so copy stays legible over the portal */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: ARCH,
              background: 'radial-gradient(120% 90% at 50% 42%, rgba(5,9,15,0.34) 0%, rgba(5,9,15,0.5) 60%, rgba(5,9,15,0.82) 100%)',
            }}
          />
        </div>

        {/* Layer 3 — ornate gold frame around the portal */}
        <div
          ref={frameRef}
          className="pointer-events-none absolute"
          style={{
            top: '50%',
            left: '50%',
            width: 'min(80vw, 580px)',
            height: 'min(84vh, 742px)',
            marginLeft: 'calc(min(80vw, 580px) / -2)',
            marginTop: 'calc(min(84vh, 742px) / -2)',
            transformOrigin: '50% 46%',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: ARCH,
              border: '1px solid rgba(201,166,107,0.55)',
              boxShadow: '0 0 0 1px rgba(201,166,107,0.12), 0 30px 80px -20px rgba(0,0,0,0.8), inset 0 0 60px rgba(201,166,107,0.12)',
            }}
          />
          <div className="absolute" style={{ inset: '10px', borderRadius: ARCH, border: '1px solid rgba(201,166,107,0.25)' }} />
        </div>

        {/* Layer 4 — hero copy */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ willChange: 'transform, opacity', pointerEvents: uiVisible ? 'auto' : 'none' }}
        >
          <div
            style={{
              opacity: uiVisible ? 1 : 0,
              transform: uiVisible ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <HeroCopy />
          </div>
        </div>

        {/* Top + bottom cinematic fades */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[18]"
          style={{ height: '38vh', background: 'linear-gradient(to bottom, rgba(5,9,15,0.7) 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[18]"
          style={{ height: '42vh', background: `linear-gradient(to top, ${DARK} 0%, rgba(5,9,15,0.4) 50%, transparent 100%)` }}
          aria-hidden="true"
        />

        {/* Curtains (theatrical reveal) */}
        <div
          ref={curtainLRef}
          className="absolute inset-y-0 left-0 z-30"
          style={{
            width: '52%',
            background: 'linear-gradient(105deg, #0A0E16 0%, #0E0A0C 70%, #1c0f17 100%)',
            borderRight: '1px solid rgba(201,166,107,0.35)',
            boxShadow: '8px 0 60px rgba(0,0,0,0.7)',
            transformOrigin: 'left center',
            transition: curtainTransition,
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: 'repeating-linear-gradient(90deg, rgba(201,166,107,0.05) 0px, rgba(201,166,107,0.05) 1px, transparent 1px, transparent 26px)' }}
          />
        </div>
        <div
          ref={curtainRRef}
          className="absolute inset-y-0 right-0 z-30"
          style={{
            width: '52%',
            background: 'linear-gradient(255deg, #0A0E16 0%, #0E0A0C 70%, #1c0f17 100%)',
            borderLeft: '1px solid rgba(201,166,107,0.35)',
            boxShadow: '-8px 0 60px rgba(0,0,0,0.7)',
            transformOrigin: 'right center',
            transition: curtainTransition,
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: 'repeating-linear-gradient(90deg, rgba(201,166,107,0.05) 0px, rgba(201,166,107,0.05) 1px, transparent 1px, transparent 26px)' }}
          />
        </div>
      </section>
    </div>
  )
}

/* ---- Shared hero copy ---- */
function HeroCopy() {
  return (
    <div className="px-6 text-center" style={{ maxWidth: '760px', marginTop: 'clamp(2.5rem, 8vh, 5rem)' }}>
      <img
        src="/assets/logo/logo_gourmet.png"
        alt="Au Gourmet Délicat"
        className="mx-auto mb-6 h-24 w-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] md:h-28"
      />
      <p className="eyebrow text-gold-soft text-shadow-hero">Au cœur du Pays du Mont-Blanc</p>
      <div className="mx-auto my-6 h-px w-14" style={{ background: 'linear-gradient(90deg, transparent, #C9A66B, transparent)' }} aria-hidden="true" />
      <h1 className="font-display text-white text-shadow-hero" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 0.98, fontWeight: 500 }}>
        <span className="block">Traiteur depuis</span>
        <span className="block italic text-gold-soft">trois générations</span>
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/90 text-shadow-hero">
        Yannick Fournet et Guillaume Sermet-Magdelain vous proposent un service traiteur avec des produits de saison de
        grande qualité.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link to="/contact" className="btn-primary">
          Contactez-nous
        </Link>
        <Link to="/cartes-menus" className="btn-ghost">
          Découvrir nos cartes
        </Link>
      </div>
    </div>
  )
}
