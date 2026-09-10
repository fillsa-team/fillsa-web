import { useEffect, useMemo, useRef, useState } from 'react'
import appStoreIcon from '../assets/app-store.svg'
import fillsaLogo from '../assets/fillsa-logo.svg'
import fillsaLogoFooter from '../assets/fillsa-logo-footer.svg'
import googlePlayIcon from '../assets/google-play.svg'
import renewalCalendar from '../assets/landing/renewal-calendar.png'
import renewalDarkCalendar from '../assets/landing/renewal-dark-calendar.png'
import renewalDarkHome from '../assets/landing/renewal-dark-home.png'
import renewalDarkWrite from '../assets/landing/renewal-dark-write.png'
import renewalHome from '../assets/landing/renewal-home.png'
import renewalKeyboard from '../assets/landing/renewal-keyboard.png'
import renewalWrite from '../assets/landing/renewal-write.png'
import { theme } from '../theme/tokens'
import { landingCssVariables } from './cssVariables'
import {
  GOOGLE_PLAY_URL,
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

type ScreenMode = 'light' | 'dark'
type ScreenKind = 'home' | 'write' | 'calendar'

const screenAssets: Record<ScreenMode, Record<ScreenKind, string>> = {
  light: { home: renewalHome, write: renewalWrite, calendar: renewalCalendar },
  dark: { home: renewalDarkHome, write: renewalDarkWrite, calendar: renewalDarkCalendar },
}

function RenewalScreen({
  kind,
  mode,
  alt,
}: {
  kind: ScreenKind
  mode: ScreenMode
  alt: string
}) {
  const src = screenAssets[mode][kind]

  if (kind === 'write') {
    return (
      <div className="write-composite">
        <div className="write-main">
          <div className="write-content">
            <img src={src} alt={alt} />
          </div>
          <div className="write-spacer" />
          <div className="write-toolbar" aria-hidden="true">
            <img src={src} alt="" />
          </div>
        </div>
        <div className="write-keyboard" aria-hidden="true">
          <img src={renewalKeyboard} alt="" />
        </div>
      </div>
    )
  }

  return <img className={`renewal-screen renewal-screen-${kind}`} src={src} alt={alt} />
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
  const [screenMode, setScreenMode] = useState<ScreenMode>('light')
  const screenAssetPromisesRef = useRef(new Map<string, Promise<void>>())
  const modeChangeIdRef = useRef(0)
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

  const ensureScreenAssetReady = (src: string) => {
    const existingPromise = screenAssetPromisesRef.current.get(src)
    if (existingPromise) {
      return existingPromise
    }

    const promise = new Promise<void>((resolve) => {
      const image = new Image()
      image.onload = () => {
        void image.decode().catch(() => undefined).finally(resolve)
      }
      image.onerror = () => resolve()
      image.src = src
    })

    screenAssetPromisesRef.current.set(src, promise)
    return promise
  }

  const changeScreenMode = async (mode: ScreenMode) => {
    if (mode === screenMode) {
      return
    }

    const changeId = ++modeChangeIdRef.current
    await Promise.all(Object.values(screenAssets[mode]).map(ensureScreenAssetReady))

    if (changeId === modeChangeIdRef.current) {
      setScreenMode(mode)
    }
  }

  useEffect(() => {
    const allScreenAssets = Object.values(screenAssets).flatMap((assets) => Object.values(assets))
    void Promise.all(allScreenAssets.map(ensureScreenAssetReady))
  }, [])

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
    screenMode === 'dark' ? 'dark-mode' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const closeMobileMenu = () => setMobileMenuOpen(false)
  const pageStyle =
    screenMode === 'dark'
      ? {
          ...landingCssVariables,
          '--cream': '#212121',
          '--cream-dark': '#2c2c2c',
          '--cream-mid': '#292929',
          '--ink-60': 'rgba(255,255,255,.62)',
          '--ink-30': 'rgba(255,255,255,.38)',
          '--ink-10': 'rgba(255,255,255,.08)',
          '--purple': '#a39af8',
          '--purple-pale': 'rgba(92,101,255,.18)',
          '--landing-nav-bg': 'rgba(33,33,33,.92)',
          '--landing-nav-bg-scrolled': 'rgba(33,33,33,.97)',
          '--landing-nav-border': 'rgba(255,255,255,.08)',
        }
      : landingCssVariables

  return (
    <main ref={pageRef} className={pageClasses} style={pageStyle}>
      <nav id="main-nav" className={isScrolled ? 'nav-scrolled' : undefined}>
        <a href="#" className="nav-logo" aria-label="필사 홈" onClick={closeMobileMenu}>
          <img
            src={screenMode === 'dark' ? fillsaLogoFooter : fillsaLogo}
            width="64"
            height="30"
            alt="필사 Fillsa"
          />
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

        <div className="phone-showcase fade-up" aria-label="리뉴얼 앱 화면 모션 미리보기">
          <div className="mode-control">
            <div className="mode-buttons" role="group" aria-label="앱 화면 모드 선택">
              {(['light', 'dark'] as const).map((mode) => (
                <button
                  className="mode-button"
                  type="button"
                  key={mode}
                  aria-pressed={screenMode === mode}
                  onClick={() => void changeScreenMode(mode)}
                >
                  {mode === 'light' ? '라이트 모드' : '다크 모드'}
                </button>
              ))}
            </div>
          </div>
          <div className="motion-viewport">
            <div className="motion-track">
              {[false, true].map((duplicate) => (
                <div className="motion-set" key={String(duplicate)} aria-hidden={duplicate || undefined}>
                  {(['home', 'write', 'calendar'] as const).map((kind) => (
                    <figure className="motion-card" key={kind}>
                      <div className="motion-screen">
                        <RenewalScreen
                          kind={kind}
                          mode={screenMode}
                          alt={
                            duplicate
                              ? ''
                              : kind === 'home'
                                ? '리뉴얼 홈 화면'
                                : kind === 'write'
                                  ? '리뉴얼 필사 화면'
                                  : '리뉴얼 캘린더 화면'
                          }
                        />
                      </div>
                      <figcaption>
                        {kind === 'home' ? '오늘의 홈' : kind === 'write' ? '필사하기' : '기록 캘린더'}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
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
              <div className="step-row" key={step.number}>
                <div className="step-screen">
                  <div className="screen-card">
                    <div className="demo-screen">
                      <RenewalScreen
                        kind={step.screenKind}
                        mode={screenMode}
                        alt={step.imageAlt}
                      />
                    </div>
                  </div>
                </div>
                <div className="step-content">
                  <div className="step-num">{step.number}</div>
                  <div className="step-text">
                    <div className="step-title">{step.title}</div>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
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
