import { PARTNERS } from '../data/site'

interface PartnersStripProps {
  variant?: 'light' | 'dark'
  title?: string
  eyebrow?: string
}

export default function PartnersStrip({
  variant = 'light',
  title = 'Ils nous font confiance',
  eyebrow = 'Nos partenaires & clients satisfaits',
}: PartnersStripProps) {
  const dark = variant === 'dark'
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...PARTNERS, ...PARTNERS]

  return (
    <section className={`overflow-hidden py-20 md:py-24 ${dark ? 'bg-navy text-cream' : 'bg-ivory text-navy'}`}>
      <div className="mx-auto mb-12 max-w-content px-5 text-center md:px-8">
        <span className={`eyebrow ${dark ? 'text-gold' : 'text-framboise'}`}>{eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
      </div>

      <div className="group relative">
        {/* edge fades */}
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r ${
            dark ? 'from-navy' : 'from-ivory'
          } to-transparent`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l ${
            dark ? 'from-navy' : 'from-ivory'
          } to-transparent`}
        />
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {loop.map((p, i) => (
            <a
              key={`${p.name}-${i}`}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              title={p.name}
              className="flex h-24 w-44 shrink-0 items-center justify-center rounded-sm bg-white px-6 shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="max-h-14 w-auto object-contain opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
