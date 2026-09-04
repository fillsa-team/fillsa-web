// 라우트별 정적 <head> 메타의 SSOT.
// src/App.tsx 의 경로 분기와 1:1로 일치해야 한다 — 라우트를 추가/변경하면 이 파일도 함께 고칠 것.
// scripts/prerender.mjs 가 빌드 시점에 이 파일을 읽어 dist/**/index.html 에 메타를 주입한다.
import { GOOGLE_PLAY_URL } from '../landing/data'
import { releaseNotes } from '../release/releaseNotesData'
import { teamNotes } from '../team/teamNotesData'
import { SITE_NAME, SITE_URL } from './siteMeta'

export interface RouteMeta {
  path: string
  title: string
  description: string
  jsonLd?: object[]
}

// 릴리즈노트/팀노트 title 선행 이모지(예: '📢 ', ZWJ로 합성된 '👩🏻‍💻🧑🏻‍💻...' 등)를 <title> 용으로 제거한다.
function stripLeadingEmoji(title: string) {
  return title
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\p{Emoji_Modifier}\u{200d}\s]+/u, '')
    .trim()
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  alternateName: ['Fillsa', 'fillsa'],
  url: SITE_URL,
}

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '필사 (Fillsa)',
  operatingSystem: 'ANDROID',
  applicationCategory: 'LifestyleApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  installUrl: GOOGLE_PLAY_URL,
  downloadUrl: GOOGLE_PLAY_URL,
}

const releaseNoteRoutes: RouteMeta[] = releaseNotes.map((note) => ({
  path: `/release-notes/${note.slug}`,
  title: `${stripLeadingEmoji(note.title)} | 필사 업데이트`,
  description: note.summary,
  jsonLd: [websiteJsonLd],
}))

const teamNoteRoutes: RouteMeta[] = teamNotes.map((note) => ({
  path: `/team-notes/${note.slug}`,
  title: `${stripLeadingEmoji(note.title)} | 필사 팀 노트`,
  description: note.summary,
  jsonLd: [websiteJsonLd],
}))

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: '필사 - 하루 한 문장, 나만의 기록 | 명언 필사 앱 Fillsa',
    description: '하루 한 문장, 생각을 남기고 감정을 정리해요. 좋아하는 문장을 필사하고 AI와 함께 나만의 생각으로 발전시켜 보세요.',
    jsonLd: [websiteJsonLd, softwareApplicationJsonLd],
  },
  {
    path: '/release-notes',
    title: '업데이트 소식 | 필사 Fillsa',
    description: '필사(Fillsa) 앱의 새로운 기능과 업데이트 소식을 확인하세요.',
    jsonLd: [websiteJsonLd],
  },
  ...releaseNoteRoutes,
  {
    path: '/team-notes',
    title: '팀 노트 | 필사 Fillsa',
    description: '필사(Fillsa)를 만드는 팀의 이야기를 전합니다.',
    jsonLd: [websiteJsonLd],
  },
  ...teamNoteRoutes,
  {
    path: '/terms',
    title: '서비스 이용약관 | 필사 Fillsa',
    description: '필사(Fillsa) 서비스 이용약관을 확인하세요.',
    jsonLd: [websiteJsonLd],
  },
  {
    path: '/privacy',
    title: '개인정보 처리방침 | 필사 Fillsa',
    description: '필사(Fillsa)의 개인정보 처리방침을 확인하세요.',
    jsonLd: [websiteJsonLd],
  },
]
