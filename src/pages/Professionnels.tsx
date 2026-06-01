import PageHero from '../components/PageHero'
import SplitSection from '../components/SplitSection'
import CheckList from '../components/CheckList'
import PartnersStrip from '../components/PartnersStrip'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import Divider from '../components/Divider'

export default function Professionnels() {
  return (
    <>
      <PageHero
        eyebrow="Au Gourmet Délicat — Professionnels"
        title="Un service d'exception pour vos réceptions d'entreprise"
        subtitle="Marquez les esprits lors de vos évènements professionnels."
        image="/assets/photos/pro-1.jpg"
        objectPosition="center 30%"
      />

      <SplitSection
        eyebrow="Traiteur séminaire & entreprise"
        title="Une prestation culinaire qui contribue à votre succès"
        image="/assets/photos/pro-2.jpg"
        imageAlt="Réception d'entreprise"
        tone="cream"
      >
        <p>
          Voulez-vous marquer les esprits lors de vos évènements professionnels ? Au Gourmet Délicat, une prestation
          culinaire exceptionnelle contribuera au succès de vos réceptions d'entreprise. Que ce soit pour des
          plateaux-repas ou une réception personnalisée, une véritable expertise vous sera fournie. De nombreuses
          entreprises nous ont déjà fait confiance, et surtout elles n'ont pas été déçues.
        </p>
        <p>
          Nous sommes disposés à vous satisfaire, quelle que soit la nature de vos envies culinaires. Notre équipe
          propose un service sur-mesure afin que vous profitiez d'une réception digne de votre image. Nos mots d'ordre ?
          Votre satisfaction, notre plaisir. Cela fait plus de 70 ans que nous partageons notre passion pour la
          gastronomie.
        </p>
      </SplitSection>

      <SplitSection
        eyebrow="Plateau-repas ou réception : choisissez"
        title="Nous vous accompagnons sur tous vos formats"
        image="/assets/photos/pro-4.jpg"
        imageAlt="Cocktail dînatoire"
        reverse
        ratio="aspect-[4/3]"
        tone="white"
      >
        <p>
          Vous êtes libres de choisir entre un plateau-repas ou une réception, et nous sommes là pour réaliser ce
          souhait. Nous saurons insuffler de la magie dans les plateaux-repas et vous accompagner à travers toutes vos
          réceptions d'entreprise :
        </p>
        <CheckList
          columns={2}
          items={[
            'Les salons professionnels',
            'Les cocktails dînatoires',
            'Les conférences',
            'Les inaugurations',
            'Les meetings',
            'Les banquets',
          ]}
        />
        <p className="pt-2 italic text-navy/80">
          Laissez-vous tenter par nos traiteurs d'évènement et découvrez nos délicieux menus.
        </p>
      </SplitSection>

      {/* Sur mesure entreprise */}
      <section className="relative overflow-hidden bg-navy text-cream">
        <img
          src="/assets/photos/pro-5.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center md:px-8 md:py-32">
          <Reveal>
            <span className="eyebrow text-gold-soft">Sur mesure</span>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Un service traiteur à l'image de votre entreprise
            </h2>
            <Divider className="my-7 text-gold" />
            <p className="text-lg leading-relaxed text-cream/85">
              L'équipe d'Yannick et Guillaume vous donne la possibilité de personnaliser vos réceptions : une belle
              façon d'apporter de la plus-value à l'image de votre entreprise. Pour une prestation sur mesure, nous
              pouvons servir jusqu'à plus de 3000 personnes. Envie d'un déjeuner gourmand au bureau ? Nous n'attendons
              plus que vous.
            </p>
          </Reveal>
        </div>
      </section>

      <PartnersStrip variant="light" title="De nombreuses entreprises nous font confiance" eyebrow="Ils nous ont fait confiance" />

      <CtaBand
        image="/assets/photos/gd-2.jpg"
        overlay="navy"
        title="Donnez du panache à votre prochain évènement pro"
        text="Plateaux-repas, séminaires, inaugurations : confiez-nous votre projet de restauration. Nous viendrons avec panache et détermination."
      />
    </>
  )
}
