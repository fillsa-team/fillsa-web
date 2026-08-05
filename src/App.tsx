import { LandingPage } from './landing/LandingPage'
import { LegalPage } from './legal/LegalPage'
import { ReleaseNoteDetailPage } from './release/ReleaseNoteDetailPage'
import { ReleaseNotesPage } from './release/ReleaseNotesPage'
import { TeamNoteDetailPage } from './team/TeamNoteDetailPage'
import { TeamNotesPage } from './team/TeamNotesPage'

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/terms') {
    return <LegalPage document="terms" />
  }

  if (pathname === '/privacy') {
    return <LegalPage document="privacy" />
  }

  if (pathname === '/release-notes') {
    return <ReleaseNotesPage />
  }

  if (pathname.startsWith('/release-notes/')) {
    return <ReleaseNoteDetailPage slug={pathname.replace('/release-notes/', '')} />
  }

  if (pathname === '/team-notes') {
    return <TeamNotesPage />
  }

  if (pathname === '/team-notes/why-we-built-fillsa') {
    return <TeamNoteDetailPage />
  }

  return <LandingPage />
}
