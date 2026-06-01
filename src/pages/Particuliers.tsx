import PageHero from '../components/PageHero'
import SplitSection from '../components/SplitSection'
import CheckList from '../components/CheckList'
import Gallery from '../components/Gallery'
import CtaBand from '../components/CtaBand'
import Reveal from '../components/Reveal'
import Divider from '../components/Divider'

export default function Particuliers() {
  return (
    <>
      <PageHero
        eyebrow="Au Gourmet Délicat — Particuliers"
        title="Vos réceptions, sur mesure"
        subtitle="Profitez de vos réceptions avec des menus faits spécialement pour vous."
        image="/assets/photos/ornella-alexandre.jpg"
        objectPosition="center 35%"
      />

      <SplitSection
        eyebrow="Traiteur mariage Sallanches"
        title="Profitez de vos réceptions avec des menus faits pour vous"
        image="/assets/photos/particuliers-2.jpg"
        imageAlt="Réception privée"
        tone="cream"
      >
        <p>
          D'autant plus que vous aurez droit à une prestation personnalisée. Celle-ci sera en accord avec le budget
          alloué. Mais sachez qu'Au Gourmet Délicat, nous avons une charte qui nous est propre : élaborer un menu qui
          vous ressemble, avec des goûts que vous aimez et une présentation à l'assiette aussi sublime que saisissante.
        </p>
        <p>
          Un service traiteur sur mesure pour parfaire vos événements particuliers. Nous confier la restauration de
          votre évènement, c'est vous décharger des contraintes y afférentes. En effet, nos spécialistes en art
          culinaire ne pourront que vous alléger et vous épater par les plats délicieux concoctés.
        </p>
      </SplitSection>

      <SplitSection
        eyebrow="Plus qu'un service traiteur"
        title="Une équipe dynamique, des produits frais"
        image="/assets/photos/particuliers-3.jpg"
        imageAlt="Présentation à l'assiette"
        reverse
        tone="white"
      >
        <p>
          Nous nous adaptons à vos besoins pour la réalisation de tous types de repas. Qu'il s'agisse d'un buffet chaud
          ou froid, d'un menu classique ou encore d'animations culinaires, Yannick et Guillaume sauront vous offrir une
          prestation de qualité avec des produits frais. En organisant une réception chez vous, vous bénéficierez d'une
          équipe dynamique et serviable, et de préparations minutieusement travaillées pour des plats alléchants.
        </p>
        <p className="font-medium text-navy">
          Au Gourmet Délicat, nous proposons également des services complémentaires :
        </p>
        <CheckList
          items={[
            'Un portage de plateaux-repas',
            'Des préparations et services à domicile',
            'Une livraison de menu ou buffet à domicile',
            'Un chef à domicile',
          ]}
        />
      </SplitSection>

      {/* Pourquoi nous confier */}
      <section className="bg-ivory py-24 md:py-28">
        <div className="mx-auto grid max-w-content items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <Reveal direction="right">
            <span className="eyebrow text-framboise">Pour l'amour du travail bien fait</span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-navy md:text-5xl">
              Pourquoi nous confier le catering de vos événements ?
            </h2>
            <Divider center={false} className="my-6 text-framboise" />
            <p className="text-[17px] leading-relaxed text-ink/75">
              Tout simplement pour l'amour de la cuisine, mais aussi du travail bien fait. Nous travaillons d'arrache-pied
              pour satisfaire vos envies culinaires, concrétiser vos idées et vous en suggérer d'autres pour rendre votre
              évènement encore plus spécial. Que ce soit pour des desserts, des entrées ou des plats, la préparation se
              fait sur place. Cluses, Bonneville ou Passy ? Nous sommes à proximité, disponibles pour vous servir des
              plats succulents où et quand vous le désirez.
            </p>
            {/* Wedding Awards trust badge */}
            <div className="mt-8 flex items-center gap-4 rounded-sm border border-navy/10 bg-white p-4">
              <img
                src="/assets/photos/wedding-awards-2025-tall.jpg"
                alt="Wedding Awards 2025 — Mariages.net"
                className="h-20 w-auto rounded-sm"
              />
              <div>
                <div className="font-display text-2xl text-navy">Wedding Awards 2025</div>
                <p className="mt-1 text-sm text-ink/60">
                  Distingué par les couples sur Mariages.net pour la qualité de nos prestations.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/assets/photos/gd-27.jpg"
                alt="Création culinaire"
                loading="lazy"
                className="aspect-[3/4] w-full rounded-sm object-cover"
              />
              <img
                src="/assets/photos/gd-57.jpg"
                alt="Dressage soigné"
                loading="lazy"
                className="mt-8 aspect-[3/4] w-full rounded-sm object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto mb-12 max-w-content px-5 text-center md:px-8">
          <span className="eyebrow text-framboise">Nos créations</span>
          <h2 className="mt-3 font-display text-4xl text-navy md:text-5xl">Un avant-goût</h2>
        </div>
        <Gallery
          items={[
            { src: '/assets/photos/dessert-2.jpg', alt: 'Dessert' },
            { src: '/assets/photos/dessert-3.jpg', alt: 'Pâtisserie' },
            { src: '/assets/photos/dessert-4.jpg', alt: 'Dessert gourmand' },
            { src: '/assets/photos/particuliers-5.jpg', alt: 'Réception' },
          ]}
        />
      </section>

      <CtaBand
        image="/assets/photos/gd-79.jpg"
        objectPosition="center 30%"
        overlay="framboise"
        title="Imaginons votre réception"
        text="Mariage, anniversaire, EVJF ou repas de famille : confiez-nous votre événement et savourez l'instant."
      />
    </>
  )
}
