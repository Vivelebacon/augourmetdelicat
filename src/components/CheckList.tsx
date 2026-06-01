import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { staggerContainer, staggerItem } from './Reveal'

export default function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`mt-2 grid gap-x-8 gap-y-3 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}
    >
      {items.map((it) => (
        <motion.li key={it} variants={staggerItem} className="flex items-start gap-3 text-[16px] text-ink/80">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-framboise/12 text-framboise">
            <Check size={13} strokeWidth={2.5} />
          </span>
          {it}
        </motion.li>
      ))}
    </motion.ul>
  )
}
