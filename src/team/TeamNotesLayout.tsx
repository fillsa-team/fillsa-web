import { type ReactNode, useEffect, useState } from 'react'
import fillsaLogo from '../assets/fillsa-logo.svg'
import fillsaLogoFooter from '../assets/fillsa-logo-footer.svg'
import { landingCssVariables } from '../landing/cssVariables'
import { MobileNavigationMenu } from '../landing/MobileNavigationMenu'
import './team-notes.css'

interface TeamNotesLayoutProps {
  children: ReactNode
  title: string
}

export function TeamNotesLayout({ children, title }: TeamNotesLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.document.title = title
    window.scrollTo(0, 0)
  }, [title])

  return (
    <div className="team-notes-page" style={landingCssVariables}>
      <header className="team-header">
        <a
          className="team-logo"
          href="/"
          aria-label="Fillsa 홈으로 이동"
          onClick={() => setMenuOpen(false)}
        >
          <img src={fillsaLogo} width="64" height="30" alt="Fillsa" />
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

      <footer className="team-footer">
        <div className="team-footer-inner">
          <a href="/" aria-label="Fillsa 홈으로 이동">
            <img src={fillsaLogoFooter} width="64" height="30" alt="Fillsa" />
          </a>
          <span>© 2025 Fillsa. All rights reserved.</span>
          <div>
            <a href="/terms">이용약관</a>
            <a href="/privacy">개인정보처리방침</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
