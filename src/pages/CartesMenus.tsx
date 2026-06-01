import { motion } from 'framer-motion'
import { FileText, Fish } from 'lucide-react'
import PageHero from '../components/PageHero'
import AudioPlayer from '../components/AudioPlayer'
import CtaBand from '../components/CtaBand'
import Reveal, { staggerContainer, staggerItem } from '../components/Reveal'
import Divider from '../components/Divider'
import { MENUS } from '../data/site'

export default function CartesMenus() {
  return (
    <>
      <PageHero
        eyebrow="Au Gourmet Délicat"
        title="Cartes & menus"
        subtitle="Des combinaisons d'entrée, de résistance et de dessert dignes d'un gala royal."
        image="/assets/photos/carte-menu-2.jpg"
        objectPosition="center 60%"
      />

      {/* Intro: Cartes / Menus */}
      <section className="bg-cream py-24 md:py-28">
        <div className="mx-auto grid max-w-content gap-14 px-5 md:grid-cols-2 md:px-8">
          <Reveal direction="right">
            <span className="eyebrow text-framboise">Cartes</span>
            <h2 className="mt-3 font-display text-4xl text-navy">Des plats dont vos papilles vont raffoler</h2>
            <Divider center={false} className="my-6 text-framboise" />
            <p className="text-[17px] leading-relaxed text-ink/75">
              Pour des réceptions en tout genre, vous pourrez compter sur nos cartes Traiteur. Les menus sont adaptés à
              tous les goûts et tous les budgets. Qu'il s'agisse d'un mariage, d'un anniversaire ou d'un évènement
              d'entreprise, nous sommes là pour concrétiser vos idées. Le chef concoctera pour vous des mets succulents,
              dignes d'un gala royal. Une préférence pour le sucré ? Le salé ? Nous sommes là pour vous satisfaire.
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <span className="eyebrow text-framboise">Menus</span>
            <h2 className="mt-3 font-display text-4xl text-navy">Fortement diversifiés, jamais monotones</h2>
            <Divider center={false} className="my-6 text-framboise" />
            <p className="text-[17px] leading-relaxed text-ink/75">
              Ne vous attendez pas à tomber sur les mêmes plats. Certains restent incontournables, telle notre
              spécialité : le saumon Bömlo. Vous pourrez opter pour un traiteur à domicile : un chef se fera le plaisir
              de vous préparer une diversité de menus comme le Festif, l'Authentique, le Plaisir et bien d'autres
              encore. Tout ce qu'il vous reste à faire, c'est de nous contacter.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Menu cards */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto mb-12 max-w-content px-5 text-center md:px-8">
          <span className="eyebrow text-framboise">Téléchargez nos cartes</span>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Nos cartes du moment</h2>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto grid max-w-content gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 md:px-8"
        >
          {MENUS.map((m) => (
            <motion.a
              key={m.title}
              variants={staggerItem}
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-sm bg-cream shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-cinematic group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                {m.note && <span className="eyebrow mb-2 text-framboise">{m.note}</span>}
                <h3 className="font-display text-2xl leading-tight text-navy">{m.title}</h3>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[12px] font-medium uppercase tracking-[0.16em] text-framboise">
                  <FileText size={15} /> Voir la carte
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Saumon Bömlo + audio */}
      <section className="relative overflow-hidden bg-navy text-cream">
        <img src="/assets/photos/carte-menu-5.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-ink/95" />
        <div className="relative mx-auto grid max-w-content items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8 md:py-28">
          <Reveal direction="right">
            <span className="eyebrow inline-flex items-center gap-2 text-gold-soft">
              <Fish size={15} /> Notre spécialité
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">Le saumon fumé maison Bömlo</h2>
            <Divider center={false} className="my-6 text-gold" />
            <p className="text-lg leading-relaxed text-cream/85">
              Beaucoup ont été conquis par son goût exquis. Tombez vous aussi en extase en goûtant ce saumon
              particulièrement délicieux. Notre secret ? Prenez-en une bouchée, et peut-être arriverez-vous à le
              deviner. Une chose est sûre : vous allez en raffoler.
            </p>
            <a href="/menus/saumon-bomlo.pdf" target="_blank" rel="noreferrer" className="btn bg-white text-navy hover:bg-gold mt-7">
              <FileText size={16} /> Découvrir l'origine du saumon
            </a>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <h3 className="eyebrow mb-4 text-gold-soft">Écoutez notre présentation</h3>
            <AudioPlayer src="/assets/audio/au-gourmet-delicat-nov22.mp3" label="Au Gourmet Délicat — présentation" />
            <img
              src="/assets/photos/carte-menu-3.jpg"
              alt="Plat signature"
              loading="lazy"
              className="mt-6 aspect-[16/10] w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        image="/assets/photos/gd-97.jpg"
        overlay="navy"
        title="Une envie gourmande en tête ?"
        text="Passez commande, demandez un devis ou réservez votre chef à domicile. Nous serons ravis de satisfaire vos envies."
      />
    </>
  )
}
