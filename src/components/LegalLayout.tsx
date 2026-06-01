import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-navy pb-12 pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow text-gold-soft"
          >
            Au Gourmet Délicat
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-2 font-display text-4xl text-white md:text-6xl"
          >
            {title}
          </motion.h1>
        </div>
      </section>
      <section className="bg-cream py-16 md:py-20">
        <div className="legal mx-auto max-w-3xl px-5 md:px-8">{children}</div>
      </section>
    </>
  )
}
