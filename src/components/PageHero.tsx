import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface PageHeroProps {
  eyebrow: string
  title: string
  image: string
  subtitle?: string
  objectPosition?: string
}

export default function PageHero({ eyebrow, title, image, subtitle, objectPosition = 'center' }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])

  return (
    <section
      ref={ref}
      className="relative flex h-[68vh] min-h-[460px] items-end overflow-hidden bg-navy md:h-[78vh]"
    >
      <motion.img
        src={image}
        alt=""
        aria-hidden
        style={{ y, scale, objectPosition }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,10,25,0.6))]" />

      <div className="relative mx-auto w-full max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="eyebrow text-gold-soft"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="mt-3 max-w-4xl font-display text-5xl leading-[1.02] text-white text-shadow-hero md:text-7xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            className="mt-5 max-w-xl text-lg text-cream/85 text-shadow-hero"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
