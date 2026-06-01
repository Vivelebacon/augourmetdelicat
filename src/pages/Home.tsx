import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HomeHero from '../components/HomeHero'
import SplitSection from '../components/SplitSection'
import Gallery from '../components/Gallery'
import PartnersStrip from '../components/PartnersStrip'
import CtaBand from '../components/CtaBand'
import Divider from '../components/Divider'
import Reveal, { staggerContainer, staggerItem } from '../components/Reveal'

const STATS = [
  { value: '3', label: 'générations de passion' },
  { value: '70', label: 'années de savoir-faire' },
  { value: '3000+', label: 'convives servis sur un événement' },
]

function MoreLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group mt-7 inline-flex items-center gap-2 font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-framboise"
    >
      {children}
      <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
    </Link>
  )
}

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* Story / intro */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <span className="eyebrow text-framboise">Au Gourmet Délicat</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-navy md:text-5xl">
              70 années de pratiques au service de la gastronomie
            </h2>
            <Divider className="my-8 text-framboise" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ink/75">
              Trois générations de fins gourmets et de plaisirs gourmands. Trois générations de petits plats mijotés
              avec soins, trois générations qui partagent une passion inégalable pour la cuisine. Voilà ce que
              représente le Gourmet Délicat, Traiteur Sallanches.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Un lieu où les produits de saison sont proposés par Yannick Fournet et Guillaume Sermet-Magdelain. Niché
              au cœur du Pays du Mont-Blanc, ces créateurs hors pair mettent leur talent au profit d'un visuel gustatif
              unique et de saveurs exquises.
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-10 px-5 sm:grid-cols-3 md:px-8"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={staggerItem} className="text-center">
              <div className="font-display text-6xl text-framboise md:text-7xl">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.15em] text-navy/60">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Une cuisine fait maison -> Particuliers */}
      <SplitSection
        eyebrow="Le terroir dans l'assiette"
        title="Une cuisine fait maison"
        image="/assets/photos/dessert-1.jpg"
        imageAlt="Dessert signé Au Gourmet Délicat"
        tone="white"
      >
        <p>
          La cuisine servie Au Gourmet Délicat est d'autant plus exceptionnelle grâce aux produits du terroir. Vous
          aurez la garantie d'un plat de qualité, digne de votre palais délicat. Que vous soyez à Bonneville ou encore à
          Cluses, il vous sera possible de recourir aux services d'un chef à domicile.
        </p>
        <MoreLink to="/particuliers">En savoir plus</MoreLink>
      </SplitSection>

      {/* Ajoutez votre grain de sel -> Professionnels */}
      <SplitSection
        eyebrow="Sur-mesure"
        title="Ajoutez votre grain de sel"
        image="/assets/photos/carte-menu-4.jpg"
        imageAlt="Préparation soignée"
        reverse
        ratio="aspect-[4/3]"
        tone="cream"
      >
        <p>
          Bien que tout notre savoir-faire soit à votre disposition, vous pouvez participer aux préparations si vous le
          souhaitez. Il nous tient à cœur que le repas vous ressemble en tout point. Ainsi, grâce à la touche
          professionnelle du traiteur à domicile et votre grain de sel, l'évènement personnalisé ne pourra être que
          réussi !
        </p>
        <MoreLink to="/professionnels">En savoir plus</MoreLink>
      </SplitSection>

      {/* Un mariage délicieux -> Repas des aînés */}
      <SplitSection
        eyebrow="Vos plus beaux événements"
        title="Un mariage délicieux"
        image="/assets/photos/ornella-alexandre.jpg"
        imageAlt="Mariage célébré avec Au Gourmet Délicat"
        ratio="aspect-[4/3]"
        tone="white"
      >
        <p>
          Confiez votre banquet à des professionnels. À votre écoute, Yannick et Guillaume sauront vous conseiller pour
          concrétiser vos envies. Ils sauront sublimer vos évènements privés qu'il s'agisse d'un repas des aînés, d'un
          mariage ou de dîner d'entreprise. Une belle manière d'insuffler un air du terroir de Sallanches aux
          évènements.
        </p>
        <MoreLink to="/repas-des-aines">En savoir plus</MoreLink>
      </SplitSection>

      {/* Apologie de la gastronomie — dark pull-quote */}
      <section className="relative overflow-hidden bg-ink">
        <img
          src="/assets/photos/gd-57.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center md:px-8 md:py-36">
          <Reveal>
            <span className="eyebrow text-gold-soft">Au Gourmet Délicat</span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white md:text-6xl">
              Une apologie de la <span className="italic text-gold-soft">gastronomie</span>
            </h2>
            <Divider className="my-8 text-gold" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-relaxed text-cream/90 md:text-3xl">
              « Au Gourmet Délicat, Traiteur Sallanches, c'est surtout une ode à la passion, une apologie de la
              gastronomie. Cette dévotion se ressent dans les plats faits maison concoctés par Yannick et Guillaume.
              Quand la cuisine se transmet de génération en génération, il y va de soi que le résultat revêt une saveur
              particulière. »
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70">
              Qu'il s'agisse de goût, de visuel ou alors de ressenti… Au Gourmet Délicat, tendresse et délicatesse sont
              de mise dans chacune des préparations.
            </p>
            <Link to="/contact" className="btn-primary mt-9">
              Voir plus
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto mb-14 max-w-content px-5 text-center md:px-8">
          <Reveal>
            <span className="eyebrow text-framboise">La galerie</span>
            <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Le plaisir des yeux, d'abord</h2>
          </Reveal>
        </div>
        <Gallery
          items={[
            { src: '/assets/photos/gd-97.jpg', span: 'md:col-span-2 md:row-span-2', alt: 'Création gastronomique' },
            { src: '/assets/photos/dessert-5.jpg', span: 'row-span-2', alt: 'Dessert', objectPosition: 'center' },
            { src: '/assets/photos/dessert-1.jpg', alt: 'Dessert' },
            { src: '/assets/photos/ornella-alexandre.jpg', alt: 'Mariage' },
            { src: '/assets/photos/gd-27.jpg', alt: 'Réception', objectPosition: 'center' },
            { src: '/assets/photos/dessert-3.jpg', alt: 'Pâtisserie' },
            { src: '/assets/photos/galerie-traiteur.jpg', span: 'md:col-span-2', alt: 'Buffet traiteur' },
            { src: '/assets/photos/dessert-8.jpg', alt: 'Mignardise' },
          ]}
        />
      </section>

      <PartnersStrip />

      <CtaBand
        image="/assets/photos/gd-79.jpg"
        objectPosition="center 30%"
        overlay="framboise"
        title="Composons ensemble votre événement"
        text="Mariage, réception d'entreprise, repas des aînés ou dîner à domicile : dites-nous tout, nous imaginons le menu qui vous ressemble."
      />
    </>
  )
}
