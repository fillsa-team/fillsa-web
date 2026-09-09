export const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.arakene.fillsa'

export interface NavigationItem {
  label: string
  href: string
}

export interface HeroQuote {
  text: string
  source: string
}

export interface ThemeCardItem {
  id: string
  lines: [string, string]
}

export interface ReflectionItem {
  id: string
  author: string
  chipText: string
  quote: string
  date: string
  source: string
  question: string
  answer: string
}

export interface RenewalFeatureItem {
  icon: string
  title: string
  description: string
}

export interface HowStep {
  number: number
  title: string
  description: string
  screenKind: 'home' | 'write' | 'calendar'
  imageAlt: string
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}

export const navigationItems: NavigationItem[] = [
  { label: '새로운 기능', href: '#new' },
  { label: '배경테마 선택', href: '#themes' },
  { label: '사용법', href: '#how' },
  { label: '다운로드', href: '#download' },
]

export const heroQuotes: HeroQuote[] = [
  { text: '모든 사람은 자신의 우주를 만들어가고 있다.', source: '파울로 코엘료, 연금술사' },
  { text: '지금 이 순간은 다시 오지 않습니다.', source: '법정 스님' },
  { text: '두려움이 있는 곳에 꿈이 있습니다.', source: '헤르만 헤세' },
  { text: '작은 것에 감사할 수 있는 사람이 행복합니다.', source: '생텍쥐페리' },
]

export const themeCards: ThemeCardItem[] = [
  { id: 't1', lines: ['모든 시작에는', '용기가 필요하다.'] },
  { id: 't2', lines: ['파도는 멈추지 않고', '앞으로 나아간다.'] },
  { id: 't3', lines: ['작은 씨앗이', '큰 나무가 된다.'] },
  { id: 't4', lines: ['오늘도 충분히', '잘 해냈다.'] },
  { id: 't5', lines: ['따스한 오후,', '한 문장의 여유.'] },
  { id: 't6', lines: ['꽃처럼 피어나는', '나의 이야기.'] },
  { id: 't7', lines: ['자연처럼 흐르는', '나만의 시간.'] },
  { id: 't8', lines: ['깊은 밤,', '조용한 사유.'] },
  { id: 't9', lines: ['우주처럼 넓은', '상상의 세계.'] },
  { id: 't10', lines: ['고요한 어둠 속', '빛나는 한 문장.'] },
]

export const reflectionItems: ReflectionItem[] = [
  {
    id: 'coelho',
    author: '파울로 코엘료',
    chipText: '모든 사람은 자신의 우주를 만들어가고 있다.',
    quote: '모든 사람은 자신의 우주를 만들어가고 있다.',
    date: '2025. 03. 21',
    source: '파울로 코엘료',
    question: "지금 당신이 만들어가고 있는 '우주'는 어떤 모습인가요?",
    answer: '나의 우주는 아직 작지만, 매일 조금씩 넓어지고 있는 것 같다. 오늘의 필사처럼.',
  },
  {
    id: 'hesse',
    author: '헤르만 헤세',
    chipText: '두려움이 있는 곳에 꿈이 있습니다.',
    quote: '두려움이 있는 곳에 꿈이 있습니다.',
    date: '2025. 03. 20',
    source: '헤르만 헤세',
    question: '지금 가장 두려운 것은 무엇인가요? 그 두려움 너머에는 어떤 꿈이 있나요?',
    answer: '실패가 두렵지만, 그 너머에서 나만의 목소리로 새로운 시작을 만들고 싶다.',
  },
  {
    id: 'beopjeong',
    author: '법정 스님',
    chipText: '지금 이 순간은 다시 오지 않습니다.',
    quote: '지금 이 순간은 다시 오지 않습니다.',
    date: '2025. 03. 19',
    source: '법정 스님',
    question: '오늘 하루, 당신이 온전히 머물렀던 순간은 언제였나요?',
    answer: '이 문장을 천천히 필사하며 마음이 잠잠해졌던 바로 지금 이 순간.',
  },
]

export const renewalFeatures: RenewalFeatureItem[] = [
  {
    icon: '✨',
    title: '문장 발견',
    description: '나의 취향과 필사 패턴을 분석해 오늘 필사하고 싶은 문장을 추천해 드립니다.',
  },
  {
    icon: '📊',
    title: '필사 인사이트',
    description: '자주 필사하는 주제, 작가, 감정의 흐름을 시각화해 나만의 취향을 발견하세요.',
  },
  {
    icon: '🔗',
    title: '감성 카드 공유',
    description: '필사한 문장을 아름다운 카드 이미지로 만들어 SNS에 공유해 보세요.',
  },
]

export const howSteps: HowStep[] = [
  {
    number: 1,
    title: '오늘의 문장을 만나요',
    description: '날짜와 함께 하루 한 문장을 확인하고, 오늘의 질문으로 생각을 열어요.',
    screenKind: 'home',
    imageAlt: '오늘의 문장과 질문을 보여주는 리뉴얼 홈',
  },
  {
    number: 2,
    title: '천천히 따라 써요',
    description: '문장을 한 글자씩 따라 쓰며 잠시 멈추고, 오늘의 생각에 집중해요.',
    screenKind: 'write',
    imageAlt: '오늘의 문장을 따라 쓰는 필사 화면',
  },
  {
    number: 3,
    title: '쌓인 기록을 돌아봐요',
    description: '캘린더에서 날짜별 기록과 연속 필사를 한눈에 확인해요.',
    screenKind: 'calendar',
    imageAlt: '필사 기록을 보여주는 리뉴얼 캘린더',
  },
]

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: '서비스',
    links: [
      { label: '기능 소개', href: '/#new' },
      { label: '배경테마 선택', href: '/#themes' },
      { label: '새로운 기능', href: '/#new' },
      {
        label: '릴리즈 노트',
        href: '/release-notes',
      },
    ],
  },
  {
    title: '팀',
    links: [
      {
        label: '팀 노트',
        href: '/team-notes',
      },
    ],
  },
  {
    title: '법적 고지',
    links: [
      {
        label: '서비스 이용약관',
        href: '/terms',
      },
      {
        label: '개인정보처리방침',
        href: '/privacy',
      },
    ],
  },
]
