import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Divider from './Divider'

interface SplitSectionProps {
  eyebrow?: string
  title: string
  image: string
  imageAlt?: string
  reverse?: boolean
  objectPosition?: string
  ratio?: string
  children: ReactNode
  tone?: 'cream' | 'white' | 'ivory'
}

export default function SplitSection({
  eyebrow,
  title,
  image,
  imageAlt = '',
  reverse = false,
  objectPosition = 'center',
  ratio = 'aspect-[4/5]',
  children,
  tone = 'cream',
}: SplitSectionProps) {
  const bg = tone === 'white' ? 'bg-white' : tone === 'ivory' ? 'bg-ivory' : 'bg-cream'
  return (
    <section className={`${bg} py-20 md:py-28`}>
      <div className="mx-auto grid max-w-content items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Image */}
        <motion.figure
          initial={{ opacity: 0, x: reverse ? 48 : -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className={`relative overflow-hidden ${ratio} ${reverse ? 'md:order-2' : ''}`}
        >
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            style={{ objectPosition }}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-cinematic hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
          <span className="pointer-events-none absolute -bottom-px left-6 right-6 h-10 bg-gradient-to-t from-black/15 to-transparent" />
        </motion.figure>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={reverse ? 'md:order-1' : ''}
        >
          {eyebrow && <span className="eyebrow text-framboise">{eyebrow}</span>}
          <h2 className="mt-3 font-display text-4xl leading-tight text-navy md:text-5xl">{title}</h2>
          <Divider center={false} className="my-6 text-framboise" />
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/75">{children}</div>
        </motion.div>
      </div>
    </section>
  )
}
