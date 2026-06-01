import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Facebook, Instagram, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import Divider from '../components/Divider'
import { CONTACT } from '../data/site'

const inputCls =
  'w-full border-b border-navy/20 bg-transparent px-1 py-3 text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-framboise'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => (f.get(k) as string) || ''
    const body = [
      `Nom : ${get('nom')}`,
      `Courriel : ${get('email')}`,
      `Téléphone : ${get('tel')}`,
      `Type d'évènement : ${get('type')}`,
      `Date de l'évènement : ${get('date')}`,
      `Lieu de l'évènement : ${get('lieu')}`,
      '',
      get('message'),
    ].join('\n')
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      'Demande de devis — ' + (get('objet') || get('nom')),
    )}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setSent(true)
  }

  return (
    <>
      {/* compact header */}
      <section className="relative flex h-[44vh] min-h-[340px] items-end overflow-hidden bg-navy">
        <img
          src="/assets/photos/gd-57.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        <div className="relative mx-auto w-full max-w-content px-5 pb-12 md:px-8">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="eyebrow text-gold-soft"
          >
            Au Gourmet Délicat
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-2 font-display text-5xl text-white text-shadow-hero md:text-7xl"
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-lg text-cream/85"
          >
            Une commande, un devis, une question.
          </motion.p>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto grid max-w-content gap-14 px-5 md:grid-cols-[1.3fr_1fr] md:px-8">
          {/* Form */}
          <Reveal>
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-sm border border-framboise/20 bg-white p-12 text-center">
                <CheckCircle2 size={56} className="text-framboise" />
                <h2 className="mt-5 font-display text-3xl text-navy">Merci !</h2>
                <p className="mt-3 max-w-sm text-ink/70">
                  Votre messagerie s'est ouverte avec votre demande pré-remplie. Vous pouvez aussi nous écrire
                  directement à{' '}
                  <a href={`mailto:${CONTACT.email}`} className="text-framboise underline">
                    {CONTACT.email}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <input name="nom" required placeholder="Nom *" className={inputCls} />
                  <input name="email" type="email" required placeholder="Courriel *" className={inputCls} />
                  <input name="tel" type="tel" placeholder="Téléphone" className={inputCls} />
                  <input name="objet" placeholder="Objet" className={inputCls} />
                  <input name="date" type="text" onFocus={(e) => (e.target.type = 'date')} placeholder="Date de l'évènement" className={inputCls} />
                  <input name="lieu" placeholder="Lieu de l'évènement" className={inputCls} />
                </div>

                <div>
                  <label className="eyebrow text-navy/60">Type d'évènement</label>
                  <div className="mt-3 flex gap-6">
                    <label className="flex cursor-pointer items-center gap-2 text-navy">
                      <input type="radio" name="type" value="Professionnel" className="accent-framboise" /> Pro
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-navy">
                      <input type="radio" name="type" value="Particulier" defaultChecked className="accent-framboise" />{' '}
                      Perso
                    </label>
                  </div>
                </div>

                <textarea name="message" required rows={5} placeholder="Votre message *" className={`${inputCls} resize-none`} />

                <label className="flex items-start gap-3 text-sm text-ink/70">
                  <input type="checkbox" required className="mt-1 accent-framboise" />
                  <span>
                    <strong className="text-navy">Confidentialité RGPD.</strong> J'ai lu et j'accepte la{' '}
                    <a href="/politique-de-confidentialite" className="text-framboise underline">
                      politique de confidentialité
                    </a>
                    .
                  </span>
                </label>

                <button type="submit" className="btn-primary w-full sm:w-auto">
                  Envoyer
                </button>
              </form>
            )}
          </Reveal>

          {/* Info */}
          <Reveal direction="left" delay={0.1}>
            <div className="rounded-sm bg-navy p-8 text-cream">
              <h2 className="font-display text-3xl">Nos coordonnées</h2>
              <Divider center={false} className="my-5 text-gold" />
              <ul className="space-y-5">
                <li>
                  <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white">
                    <MapPin size={19} className="mt-0.5 shrink-0 text-gold-soft" />
                    <span className="text-cream/85">
                      {CONTACT.addressLines[0]}
                      <br />
                      {CONTACT.addressLines[1]}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-cream/85 hover:text-white">
                    <Mail size={19} className="shrink-0 text-gold-soft" /> {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-cream/85 hover:text-white">
                    <Phone size={19} className="shrink-0 text-gold-soft" /> {CONTACT.phoneDisplay}
                  </a>
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center border border-cream/20 transition-all hover:border-gold hover:bg-gold hover:text-navy">
                  <Facebook size={18} />
                </a>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center border border-cream/20 transition-all hover:border-gold hover:bg-gold hover:text-navy">
                  <Instagram size={18} />
                </a>
              </div>

              <a href={CONTACT.mariagesNet} target="_blank" rel="noreferrer" className="mt-6 flex items-center gap-4 rounded-sm bg-white/5 p-4 ring-1 ring-cream/10 transition-colors hover:bg-white/10">
                <img src="/assets/photos/wedding-awards-2025-tall.jpg" alt="Wedding Awards 2025" className="h-16 w-auto rounded-sm" />
                <div>
                  <div className="font-display text-xl">Wedding Awards 2025</div>
                  <div className="text-xs text-cream/60">Retrouvez nos avis sur Mariages.net</div>
                </div>
              </a>
            </div>

            <iframe
              title="Au Gourmet Délicat — Sallanches"
              src="https://www.google.com/maps?q=1230+Rue+du+G%C3%A9n%C3%A9ral+de+Gaulle,+74700+Sallanches&output=embed"
              className="mt-6 h-64 w-full rounded-sm border-0 grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
