import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { CONTACT, NAV } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  // On non-home pages the hero is short, so we keep the solid bar from the start.
  const solid = scrolled || !isHome || open

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-cream/95 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.06)]'
            : 'bg-gradient-to-b from-black/45 to-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="Au Gourmet Délicat — accueil">
            <img
              src={solid ? '/assets/logo/logo-blanc.jpg' : '/assets/logo/logo_gourmet.png'}
              alt="Au Gourmet Délicat"
              className={`h-12 w-auto md:h-14 ${solid ? 'mix-blend-multiply' : ''}`}
            />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `eyebrow tracking-[0.16em] transition-colors duration-300 ${
                      solid ? 'text-navy/80 hover:text-framboise' : 'text-white/90 hover:text-white'
                    } ${isActive ? '!text-framboise' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={CONTACT.phoneHref}
              className={`flex items-center gap-2 text-[13px] font-medium ${
                solid ? 'text-navy' : 'text-white'
              }`}
            >
              <Phone size={15} strokeWidth={2} />
              {CONTACT.phoneDisplay}
            </a>
            <Link to="/contact" className="btn-primary !px-5 !py-3">
              Devis gratuit
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden ${solid ? 'text-navy' : 'text-white'}`}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy/98 lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-1 px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 font-display text-3xl text-cream transition-colors ${
                        isActive ? 'text-framboise-soft' : 'hover:text-framboise-soft'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                href={CONTACT.phoneHref}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex items-center gap-2 text-gold"
              >
                <Phone size={16} /> {CONTACT.phoneDisplay}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
