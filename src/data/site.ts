// Central content + data for Au Gourmet Délicat.
// Text is kept verbatim from the original augourmetdelicat.com.

export const CONTACT = {
  name: 'Au Gourmet Délicat',
  tagline: 'Traiteur Sallanches',
  address: '1230 rue du Général de Gaulle, 74700 SALLANCHES',
  addressLines: ['1230 rue du Général de Gaulle', '74700 SALLANCHES'],
  mapsUrl:
    'https://www.google.com/maps/place/1230+Rue+du+G%C3%A9n%C3%A9ral+de+Gaulle,+74700+Sallanches,+France/@45.956693,6.6289173,17z',
  email: 'augourmetdelicat@orange.fr',
  phoneDisplay: '06 65 29 71 81',
  phoneHref: 'tel:+33665297181',
  facebook: 'https://web.facebook.com/augourmetdelicat/',
  instagram: 'https://www.instagram.com/augourmetdelicat/',
  mariagesNet:
    'https://www.mariages.net/traiteur-mariage/au-gourmet-delicat--e118077',
}

export const NAV = [
  { label: 'Accueil', to: '/' },
  { label: 'Particuliers', to: '/particuliers' },
  { label: 'Professionnels', to: '/professionnels' },
  { label: 'Repas des aînés', to: '/repas-des-aines' },
  { label: 'Cartes & menus', to: '/cartes-menus' },
  { label: 'Contactez-nous', to: '/contact' },
]

export interface Partner {
  name: string
  url: string
  logo: string
}

export const PARTNERS: Partner[] = [
  { name: 'Lunch Service', url: 'https://www.lunch-service.fr/', logo: '/assets/partners/lunch-service.jpg' },
  { name: 'Fleurina Sallanches', url: 'http://www.fleurinasallanches.fr/', logo: '/assets/partners/fleurina.jpg' },
  { name: 'Hugo Paget Photographe', url: 'https://hugopagetphoto.com/', logo: '/assets/partners/hugo-paget.jpg' },
  { name: 'Animusik', url: 'https://www.animusik.com/home', logo: '/assets/partners/animusik.jpg' },
  { name: 'Sandrine Costa', url: 'http://www.sandrinecostachanteuse.com/', logo: '/assets/partners/sandrine-costa.jpg' },
  { name: 'Terrasses du Mont-Blanc', url: 'https://terrassesdumontblanc.com/fr/', logo: '/assets/partners/terrasses-mont-blanc.jpg' },
  { name: 'Agence Côté Cœur', url: 'https://agence-cote-coeur.com/', logo: '/assets/partners/agence-cote-coeur.jpg' },
  { name: 'Mariages.net', url: 'https://www.mariages.net/', logo: '/assets/partners/mariages-net.jpg' },
  { name: 'Cabaret du Mont-Blanc', url: 'https://cabaretdumontblanc.com/', logo: '/assets/partners/cabaret-mont-blanc.png' },
]

export interface MenuDoc {
  title: string
  href: string
  note?: string
  image: string
}

export const MENUS: MenuDoc[] = [
  {
    title: 'Carte des fêtes 2025 / 2026',
    href: '/menus/carte-fetes-2025-2026.pdf',
    image: '/assets/photos/carte-menu-2.jpg',
  },
  {
    title: 'Origine de notre saumon fumé maison',
    note: 'Saumon Bömlo',
    href: '/menus/saumon-bomlo.pdf',
    image: '/assets/photos/carte-menu-5.jpg',
  },
  {
    title: 'Menu Fête des Mères',
    note: '❤️ à venir',
    href: '/menus/menu-fete-des-meres.pdf',
    image: '/assets/photos/carte-menu-4.jpg',
  },
  {
    title: 'Les menus Saint Valentin',
    href: '/menus/menu-saint-valentin.pdf',
    image: '/assets/photos/dessert-5.jpg',
  },
  {
    title: 'Colis gourmands pour les fêtes',
    href: '/menus/colis-gourmands-fetes.pdf',
    image: '/assets/photos/carte-menu-3.jpg',
  },
]

export const SERVICE_AREA = ['Sallanches', 'Cluses', 'Bonneville', 'Passy', 'Pays du Mont-Blanc']
