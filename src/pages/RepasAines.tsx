import PageHero from '../components/PageHero'
import SplitSection from '../components/SplitSection'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import Divider from '../components/Divider'
import { FileText } from 'lucide-react'

export default function RepasAines() {
  return (
    <>
      <PageHero
        eyebrow="Au Gourmet Délicat — Repas des aînés"
        title="Un repas des aînés à la hauteur de l'occasion"
        subtitle="Un menu convivial et festif, pensé pour le plaisir des seniors."
        image="/assets/photos/aines-5031.jpg"
        objectPosition="center 40%"
      />

      <SplitSection
        eyebrow="Traiteur retraite Sallanches"
        title="Un menu sur mesure, adapté aux seniors"
        image="/assets/photos/aines-3.jpg"
        imageAlt="Repas des aînés"
        tone="cream"
        ratio="aspect-[4/5]"
      >
        <p>
          Le menu sera convivial, festif, juste assez pour que les seniors puissent faire connaissance et se retrouver
          autour d'un repas copieux. Au Gourmet Délicat, nous vous proposons un menu sur mesure, adapté aux personnes
          âgées qui ne pourront que se régaler.
        </p>
        <p>
          Que vous soyez une société, une résidence senior ou autre, nous nous ferons un plaisir de concocter un menu
          pour les seniors et de préparer des plats sur mesure à l'occasion. Vous pouvez même organiser cet évènement
          depuis chez vous : nous nous chargeons de la partie repas.
        </p>
        <a
          href="/menus/exemple-menu-aines.pdf"
          target="_blank"
          rel="noreferrer"
          className="btn-dark mt-2"
        >
          <FileText size={16} /> Découvrez un exemple de menu
        </a>
      </SplitSection>

      <SplitSection
        eyebrow="En toute occasion"
        title="Des repas des aînés livrés jusque chez vous"
        image="/assets/photos/aines-4.jpg"
        imageAlt="Plat livré à domicile"
        reverse
        tone="white"
        ratio="aspect-[4/5]"
      >
        <p>
          Les seniors méritent à la fois du respect et de l'attention. Nos services proposent même de livrer des plats à
          domicile : un repas dans les règles de l'art pour ravir les aînés, une solution pratique et efficace. Nous
          savons que vous avez tant à faire ; un plateau-repas livré à domicile fera autant votre bonheur que celui de
          nos seniors.
        </p>
        <p>
          L'objectif de nos plats est d'éveiller les sens avec des goûts variés et frais. Un repas préparé par nos soins,
          c'est un véritable régal pour les yeux comme pour les papilles. Les spécialités régionales constituent une
          valeur essentielle dans la conception de notre cuisine.
        </p>
      </SplitSection>

      {/* Services adaptés */}
      <section className="bg-ivory py-24 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Reveal>
            <span className="eyebrow text-framboise">Une large zone d'intervention</span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-navy md:text-5xl">
              Des services adaptés et des produits frais
            </h2>
            <Divider className="my-7 text-framboise" />
            <p className="text-lg leading-relaxed text-ink/75">
              Si vous habitez dans la région de Cluses, Passy ou dans d'autres communes, nos services couvrent une large
              zone d'intervention. Nous saurons nous adapter à vos besoins et à votre budget afin que la haute
              gastronomie soit accessible à tous. Nos produits frais associés à notre inspiration ont toujours eu pour
              résultat des plats succulents.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        image="/assets/photos/galerie-traiteur.jpg"
        overlay="framboise"
        title="Offrez un beau moment à vos aînés"
        text="Résidence, association, comité ou famille : composons ensemble un repas convivial, adapté et savoureux."
      />
    </>
  )
}
