import { Link } from 'react-router-dom'
import { Facebook, Instagram, MapPin, Mail, Phone } from 'lucide-react'
import { CONTACT, NAV } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-framboise/20 blur-[120px]" />
      <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/assets/logo/logo_gourmet.png" alt="Au Gourmet Délicat" className="h-20 w-auto" />
            <p className="mt-5 max-w-xs font-display text-xl italic leading-snug text-cream/80">
              Traiteur depuis 3 générations, au cœur du Pays du Mont-Blanc.
            </p>
            <a
              href={CONTACT.mariagesNet}
              target="_blank"
              rel="noreferrer"
              className="eyebrow mt-6 inline-flex text-gold link-underline"
            >
              Retrouvez-nous sur Mariages.net
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="eyebrow text-framboise-soft">Liens utiles</h4>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-cream/75 transition-colors hover:text-white link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div>
            <h4 className="eyebrow text-framboise-soft">Coordonnées</h4>
            <ul className="mt-5 space-y-4 text-cream/75">
              <li>
                <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-white">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-framboise-soft" />
                  <span>
                    {CONTACT.addressLines[0]}
                    <br />
                    {CONTACT.addressLines[1]}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-white">
                  <Mail size={18} className="shrink-0 text-framboise-soft" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-white">
                  <Phone size={18} className="shrink-0 text-framboise-soft" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <h4 className="eyebrow text-framboise-soft">Suivez-nous</h4>
            <div className="mt-5 flex gap-3">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center border border-cream/20 transition-all hover:border-framboise hover:bg-framboise"
              >
                <Facebook size={18} />
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center border border-cream/20 transition-all hover:border-framboise hover:bg-framboise"
              >
                <Instagram size={18} />
              </a>
            </div>
            <Link to="/contact" className="btn-primary mt-7 w-full">
              Demander un devis
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-[12px] text-cream/50 md:flex-row">
          <p>© {year} Au Gourmet Délicat — Traiteur Sallanches. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            <Link to="/mentions-legales" className="hover:text-cream/80">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="hover:text-cream/80">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
