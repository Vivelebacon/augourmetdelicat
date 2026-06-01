import LegalLayout from '../components/LegalLayout'

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <p>
        Au Gourmet Délicat (Traiteur Sallanches) attache une grande importance au respect de votre vie privée et à la
        protection de vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).
      </p>

      <h2>Collecte des données</h2>
      <p>
        Les informations que vous nous transmettez via le formulaire de contact (nom, courriel, téléphone, détails de
        votre évènement) sont collectées uniquement dans le but de répondre à votre demande de devis ou
        d'informations. Aucune donnée n'est exploitée à d'autres fins.
      </p>

      <h2>Utilisation des données</h2>
      <p>
        Vos données sont utilisées exclusivement pour traiter votre demande et vous recontacter. Elles ne sont ni
        vendues, ni cédées, ni transmises à des tiers à des fins commerciales.
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site peut utiliser des outils de mesure d'audience afin d'analyser de manière anonyme la fréquentation et
        d'améliorer l'expérience de navigation (nombre de visiteurs, pages consultées). Vous pouvez à tout moment
        configurer votre navigateur pour refuser les cookies.
      </p>

      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
      <ul>
        <li>Droit d'accès à vos données personnelles</li>
        <li>Droit de rectification des informations inexactes</li>
        <li>Droit à l'effacement de vos données</li>
        <li>Droit d'opposition au traitement</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à l'adresse{' '}
        <a href="mailto:augourmetdelicat@orange.fr">augourmetdelicat@orange.fr</a> ou par téléphone au 06 65 29 71 81.
      </p>
    </LegalLayout>
  )
}
