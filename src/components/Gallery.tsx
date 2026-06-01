import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { staggerContainer, staggerItem } from './Reveal'

export interface GalleryItem {
  src: string
  /** tailwind grid span classes, e.g. 'md:col-span-2 md:row-span-2' */
  span?: string
  alt?: string
  objectPosition?: string
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<string | null>(null)

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid max-w-content auto-rows-[180px] grid-cols-2 gap-3 px-5 md:auto-rows-[220px] md:grid-cols-4 md:gap-4 md:px-8"
      >
        {items.map((it, i) => (
          <motion.button
            key={i}
            variants={staggerItem}
            onClick={() => setActive(it.src)}
            className={`group relative overflow-hidden rounded-sm ${it.span ?? ''}`}
            aria-label="Agrandir la photo"
          >
            <img
              src={it.src}
              alt={it.alt ?? ''}
              loading="lazy"
              style={{ objectPosition: it.objectPosition ?? 'center' }}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-cinematic group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/25" />
            <span className="absolute inset-0 ring-1 ring-inset ring-black/5" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-5 backdrop-blur-sm"
          >
            <button
              className="absolute right-5 top-5 text-cream/80 transition-colors hover:text-white"
              aria-label="Fermer"
            >
              <X size={30} />
            </button>
            <motion.img
              key={active}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={active}
              alt=""
              className="max-h-[88vh] max-w-[92vw] rounded-sm object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
