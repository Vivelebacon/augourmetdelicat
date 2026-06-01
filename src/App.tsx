import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Particuliers from './pages/Particuliers'
import Professionnels from './pages/Professionnels'
import RepasAines from './pages/RepasAines'
import CartesMenus from './pages/CartesMenus'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import Confidentialite from './pages/Confidentialite'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/particuliers" element={<Particuliers />} />
          <Route path="/professionnels" element={<Professionnels />} />
          <Route path="/repas-des-aines" element={<RepasAines />} />
          <Route path="/cartes-menus" element={<CartesMenus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-de-confidentialite" element={<Confidentialite />} />
          {/* Legacy URL aliases from the original site */}
          <Route path="/traiteur-mariage-sallanches" element={<Particuliers />} />
          <Route path="/traiteur-seminaire-entreprise-sallanches" element={<Professionnels />} />
          <Route path="/traiteur-retraite-sallanches" element={<RepasAines />} />
          <Route path="/contactez-nous" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
