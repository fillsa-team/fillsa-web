import { type ReactNode, useEffect, useState } from 'react'
import fillsaLogo from '../assets/fillsa-logo.svg'
import { landingCssVariables } from '../landing/cssVariables'
import { LandingFooter } from '../landing/LandingFooter'
import { MobileNavigationMenu } from '../landing/MobileNavigationMenu'
import { titleForPath } from '../seo/routes'
import './team-notes.css'

interface TeamNotesLayoutProps {
  children: ReactNode
}

export function TeamNotesLayout({ children }: TeamNotesLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.document.title = titleForPath(window.location.pathname)
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="team-notes-page" style={landingCssVariables}>
      <header className="team-header">
        <a
          className="team-logo"
          href="/"
          aria-label="필사 홈으로 이동"
          onClick={() => setMenuOpen(false)}
        >
          <img src={fillsaLogo} width="64" height="30" alt="필사 Fillsa" />
        </a>
        <button
          className="team-hamburger"
          type="button"
          aria-label="메뉴"
          aria-expanded={menuOpen}
          aria-controls="team-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNavigationMenu
        id="team-menu"
        open={menuOpen}
        linkToLanding
        onClose={() => setMenuOpen(false)}
      />

      {children}

      <LandingFooter />
    </div>
  )
}
