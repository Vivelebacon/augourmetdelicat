import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { CONTACT } from '../data/site'

interface CtaBandProps {
  image: string
  eyebrow?: string
  title?: string
  text?: string
  objectPosition?: string
  overlay?: 'navy' | 'framboise'
}

export default function CtaBand({
  image,
  eyebrow = 'Au Gourmet Délicat',
  title = 'Donnons vie à votre prochain événement',
  text = 'Une commande, un devis, une question ? Parlons de votre projet et composons ensemble un menu qui vous ressemble.',
  objectPosition = 'center',
  overlay = 'navy',
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden">
      <img src={image} alt="" aria-hidden style={{ objectPosition }} className="absolute inset-0 h-full w-full object-cover" />
      <div
        className={`absolute inset-0 ${
          overlay === 'framboise'
            ? 'bg-gradient-to-r from-framboise-deep/90 via-framboise/75 to-framboise-deep/85'
            : 'bg-gradient-to-r from-navy/95 via-navy/80 to-navy/90'
        }`}
      />
      <div className="relative mx-auto max-w-content px-5 py-24 text-center md:px-8 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="eyebrow text-gold-soft"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-white md:text-6xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-lg text-cream/85"
        >
          {text}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link to="/contact" className="btn bg-white text-navy hover:bg-gold hover:text-navy">
            Demander un devis
          </Link>
          <a href={CONTACT.phoneHref} className="btn-ghost">
            <Phone size={15} /> {CONTACT.phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
