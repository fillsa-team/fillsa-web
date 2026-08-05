import { useEffect, useMemo, useRef, useState } from 'react'
import appStoreIcon from '../assets/app-store.svg'
import fillsaLogo from '../assets/fillsa-logo.svg'
import googlePlayIcon from '../assets/google-play.svg'
import { theme } from '../theme/tokens'
import { landingCssVariables } from './cssVariables'
import {
  GOOGLE_PLAY_URL,
  heroQuotes,
  howSteps,
  navigationItems,
  reflectionItems,
  renewalFeatures,
  themeCards,
} from './data'
import { useMediaQuery } from './useMediaQuery'
import { LandingFooter } from './LandingFooter'
import { MobileNavigationMenu } from './MobileNavigationMenu'
import './landing.css'

function useTypewriter() {
  const [text, setText] = useState(heroQuotes[0].text)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reducedMotion) {
      setText(heroQuotes[0].text)
      return
    }

    let quoteIndex = 0
    let characterIndex = 0
    let deleting = false
    let timeoutId = 0

    const tick = () => {
      const quote = heroQuotes[quoteIndex].text

      if (!deleting) {
        setText(quote.slice(0, characterIndex))
        characterIndex += 1

        if (characterIndex > quote.length) {
          deleting = true
          timeoutId = window.setTimeout(tick, theme.component.landing.motion.typewriterPauseMs)
          return
        }
      } else {
        setText(quote.slice(0, characterIndex))
        characterIndex -= 1

        if (characterIndex < 0) {
          deleting = false
          quoteIndex = (quoteIndex + 1) % heroQuotes.length
          characterIndex = 0
        }
      }

      timeoutId = window.setTimeout(
        tick,
        deleting
          ? theme.component.landing.motion.typewriterDeletingIntervalMs
          : theme.component.landing.motion.typewriterTypingIntervalMs,
      )
    }

    tick()
    return () => window.clearTimeout(timeoutId)
  }, [reducedMotion])

  return text
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export function LandingPage() {
  const pageRef = useRef<HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedReflectionId, setSelectedReflectionId] = useState(reflectionItems[0].id)
  const typedQuote = useTypewriter()
  const breakpoints = theme.component.landing.breakpoint
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.mobile}px)`)
  const isCompact = useMediaQuery(`(max-width: ${breakpoints.compact}px)`)
  const isWide = useMediaQuery(`(min-width: ${breakpoints.wide}px)`)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const selectedReflection = useMemo(
    () =>
      reflectionItems.find((item) => item.id === selectedReflectionId) ??
      reflectionItems[0],
    [selectedReflectionId],
  )

  useEffect(() => {
    const updateScrolled = () =>
      setIsScrolled(window.scrollY > theme.component.landing.motion.navigationScrollThreshold)

    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false)
    }
  }, [isMobile])

  useEffect(() => {
    const page = pageRef.current
    if (!page) {
      return
    }

    const elements = [...page.querySelectorAll<HTMLElement>('.fade-up')]

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: theme.component.landing.motion.fadeUpThreshold },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [reducedMotion])

  const pageClasses = [
    'landing-page',
    isMobile ? 'is-mobile' : '',
    isCompact ? 'is-compact' : '',
    isWide ? 'is-wide' : '',
    reducedMotion ? 'reduce-motion' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <main ref={pageRef} className={pageClasses} style={landingCssVariables}>
      <nav id="main-nav" className={isScrolled ? 'nav-scrolled' : undefined}>
        <a href="#" className="nav-logo" aria-label="Fillsa 홈" onClick={closeMobileMenu}>
          <img src={fillsaLogo} width="64" height="30" alt="Fillsa" />
        </a>
        <ul className="nav-links">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-cta" />
        <button
          className="hamburger"
          type="button"
          aria-label="메뉴"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <MobileNavigationMenu
        id="mobile-menu"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
      />

      <section className="hero">
        <div className="hero-badge">리뉴얼 출시</div>
        <h1 className="hero-title">
          하루 한 문장,
          <br />
          <span className="highlight">생각을 남기고</span> 감정을 정리해요.
        </h1>
        <p className="hero-sub">
          좋아하는 문장을 직접 필사하고,
          <br />
          AI와 함께 나만의 생각으로 발전시켜 보세요.
        </p>
        <div className="hero-actions">
          <div className="hero-store-stack">
            <ExternalLink href={GOOGLE_PLAY_URL} className="btn-primary">
              ▶ Google Play
            </ExternalLink>
            <p>iOS 출시 예정</p>
          </div>
        </div>

        <div className="hero-mockup fade-up">
          <div className="phone-frame">
            <div className="phone-status">
              <img src={fillsaLogo} width="64" height="30" alt="Fillsa" />
              <div className="phone-streak">
                <span>🔥</span> 100일
              </div>
            </div>
            <div className="quote-card">
              <div className="quote-card-label">오늘의 필사</div>
              <div className="quote-card-text">{typedQuote}</div>
              <div className="quote-card-source">파울로 코엘료, 연금술사</div>
            </div>
            <div className="streak-row" aria-label="주간 필사 기록">
              {['월', '화', '수', '목', '금'].map((day) => (
                <div className="streak-dot done" key={day}>
                  {day}
                </div>
              ))}
              <div className="streak-dot today">토</div>
              <div className="streak-dot empty">일</div>
            </div>
          </div>
        </div>
      </section>

      <section className="themes" id="themes">
        <div className="container">
          <div className="themes-header fade-up">
            <div className="section-eyebrow">배경테마 선택</div>
            <h2 className="section-title">
              오늘의 감성으로
              <br />
              나만의 필사 카드를
            </h2>
            <p className="section-desc themes-description">
              기분에 맞는 배경을 골라서 저장해보세요.
            </p>
          </div>
        </div>
        <div className="themes-scroll-wrap fade-up">
          <div className="themes-track">
            {[...themeCards, ...themeCards].map((card, index) => (
              <div
                className={`theme-card ${card.id}`}
                key={`${card.id}-${index}`}
                aria-hidden={index >= themeCards.length}
              >
                <div className="card-text">
                  {card.lines[0]}
                  <br />
                  {card.lines[1]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="new-features" id="new">
        <div className="container">
          <div className="fade-up">
            <div className="section-eyebrow">리뉴얼 신기능</div>
            <h2 className="section-title">
              깊이 사유할 수 있는 필사 <span className="new-badge">NEW</span>
            </h2>
            <p className="new-section-description">
              AI의 질문에 대답하고 내면의 생각을 발견하세요.
            </p>
          </div>

          <div className="new-grid fade-up">
            <div className="new-card wide ai-demo-card">
              <div className="ai-demo-header">
                <div className="new-icon" aria-hidden="true">
                  🤔
                </div>
                <h3 className="new-title">AI 질문 &amp; 성찰 일지</h3>
                <p className="new-desc">
                  필사한 문장을 바탕으로 AI가 생각을 확장하는 질문을 던집니다.
                  질문에 답하며 나만의 해석과 감상을 성찰 일지에 기록해 보세요.
                </p>
              </div>

              <div className="ai-demo-body">
                <div className="ai-demo-left">
                  <div className="ai-quote-chips">
                    {reflectionItems.map((item) => {
                      const active = item.id === selectedReflection.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`ai-chip${active ? ' active' : ''}`}
                          aria-pressed={active}
                          onClick={() => setSelectedReflectionId(item.id)}
                        >
                          <span className="chip-author">{item.author}</span>
                          <span className="chip-text">{item.chipText}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="ai-demo-right" aria-live="polite">
                  <div className="reflection-demo">
                    <div className="rdemo-label">성찰 일지 미리보기</div>
                    <div className="rdemo-row">
                      <div className="rdemo-dot" />
                      <div>
                        <div className="rdemo-text">
                          “{selectedReflection.quote}”
                        </div>
                        <div className="rdemo-date">
                          {selectedReflection.date} · {selectedReflection.source}
                        </div>
                      </div>
                    </div>
                    <div className="rdemo-ai">
                      <div className="rdemo-ai-q">
                        💬 AI: {selectedReflection.question}
                      </div>
                      <div className="rdemo-ai-a">{selectedReflection.answer}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="new-card-row">
              {renewalFeatures.map((feature) => (
                <div className="new-card new-card-sm" key={feature.title}>
                  <div className="new-icon" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="new-title">{feature.title}</h3>
                  <p className="new-desc">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <div className="container">
          <div className="how-header fade-up">
            <div className="section-eyebrow">사용법</div>
            <h2 className="section-title">나만의 필사 습관 만들기</h2>
          </div>
          <div className="steps-with-screens fade-up">
            {howSteps.map((step) => (
              <div
                className={`step-row${step.reverse ? ' step-row-reverse' : ''}`}
                key={step.number}
              >
                {step.reverse ? (
                  <>
                    <div className="step-content">
                      <div className="step-num">{step.number}</div>
                      <div className="step-text">
                        <div className="step-title">{step.title}</div>
                        <p className="step-desc">{step.description}</p>
                      </div>
                    </div>
                    <div className="step-screen">
                      <img src={step.image} alt={step.imageAlt} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="step-screen">
                      <img src={step.image} alt={step.imageAlt} />
                    </div>
                    <div className="step-content">
                      <div className="step-num">{step.number}</div>
                      <div className="step-text">
                        <div className="step-title">{step.title}</div>
                        <p className="step-desc">{step.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="download" id="download">
        <div className="container">
          <div className="fade-up">
            <div className="section-eyebrow">지금 시작하기</div>
            <h2 className="section-title">
              오늘의 문장을
              <br />
              직접 써보세요
            </h2>
            <p className="section-desc">하루 한 문장부터 시작하기</p>
          </div>
          <div className="download-btns fade-up">
            <ExternalLink href={GOOGLE_PLAY_URL} className="store-btn">
              <span className="store-icon">
                <img src={googlePlayIcon} alt="" />
              </span>
              <span className="store-label">
                <small>다운로드</small>
                Google Play
              </span>
            </ExternalLink>
            <a href="#" className="store-btn app-store-disabled" aria-disabled="true">
              <span className="store-icon">
                <img src={appStoreIcon} alt="" />
              </span>
              <span className="store-label">
                <small>출시 예정</small>
                App Store
              </span>
            </a>
          </div>
          <p className="download-note fade-up">Android 제공 · iOS 출시 예정</p>
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}
