import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-navy px-5 text-center text-cream">
      <span className="eyebrow text-gold-soft">Erreur 404</span>
      <h1 className="mt-4 font-display text-6xl md:text-8xl">Page introuvable</h1>
      <p className="mt-4 max-w-md text-cream/70">
        La page que vous cherchez n'existe pas ou a été déplacée. Retournons à l'essentiel : la gastronomie.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Retour à l'accueil
      </Link>
    </section>
  )
}
