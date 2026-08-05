import appStoreIcon from '../assets/app-store.svg'
import googlePlayIcon from '../assets/google-play.svg'
import { GOOGLE_PLAY_URL, navigationItems } from './data'

type MobileNavigationMenuProps = {
  id: string
  open: boolean
  linkToLanding?: boolean
  onClose: () => void
}

export function MobileNavigationMenu({
  id,
  open,
  linkToLanding = false,
  onClose,
}: MobileNavigationMenuProps) {
  return (
    <div className={`mobile-menu${open ? ' open' : ''}`} id={id}>
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={linkToLanding ? `/${item.href}` : item.href}
          onClick={onClose}
        >
          {item.label}
        </a>
      ))}
      <div className="mobile-menu-downloads">
        <a
          className="store-btn"
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="store-icon">
            <img src={googlePlayIcon} alt="" />
          </span>
          <span className="store-label">
            <small>다운로드</small>
            Google Play
          </span>
        </a>
        <span className="store-btn app-store-disabled" aria-disabled="true">
          <span className="store-icon">
            <img src={appStoreIcon} alt="" />
          </span>
          <span className="store-label">
            <small>출시 예정</small>
            App Store
          </span>
        </span>
      </div>
    </div>
  )
}
