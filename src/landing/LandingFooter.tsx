import { useEffect, useRef, useState } from 'react'
import fillsaLogoFooter from '../assets/fillsa-logo-footer.svg'
import { footerLinkGroups } from './data'

export function LandingFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const visibilityTarget = document.getElementById('download') ?? footer

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasReachedTarget = entry.isIntersecting || entry.boundingClientRect.top < 0
        setShowScrollTop(hasReachedTarget)
      },
      { threshold: 0.1 },
    )

    observer.observe(visibilityTarget)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="site-footer" ref={footerRef}>
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
      </div>
      <button
        className={`scroll-top-button${showScrollTop ? ' visible' : ''}`}
        type="button"
        onClick={scrollToTop}
        aria-label="페이지 맨 위로 이동"
        aria-hidden={!showScrollTop}
        tabIndex={showScrollTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span>
        맨 위로
      </button>
    </footer>
  )
}
