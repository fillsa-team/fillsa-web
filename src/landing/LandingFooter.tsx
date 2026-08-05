import fillsaLogoFooter from '../assets/fillsa-logo-footer.svg'
import { footerLinkGroups } from './data'

export function LandingFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="/" aria-label="Fillsa 홈">
            <img src={fillsaLogoFooter} width="64" height="30" alt="Fillsa" />
          </a>
          <p>
            하루 한 문장, 나만의 기록.
            <br />
            <br />
            직접 쓰거나 타이핑하며,
            <br />
            머무르고 싶은 마음을 글로 남겨보세요.
          </p>
        </div>
        {footerLinkGroups.map((group) => (
          <div className="footer-col" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2025 Fillsa. All rights reserved.</span>
        <div className="footer-legal">
          <a href="/terms">이용약관</a>
          <a href="/privacy">개인정보처리방침</a>
        </div>
      </div>
    </footer>
  )
}
