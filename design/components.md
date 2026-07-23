# 컴포넌트 스펙 (컴포넌트 ↔ Figma 노드 ↔ props)

> 디자이너가 작성. 프론트는 이 스펙대로 구현한다.

## Button
- Figma 노드: (링크)
- props: `variant: 'primary' | 'secondary'`, `size: 'sm' | 'md'`, `disabled?: boolean`
- 토큰: color.primary, color.primaryHover, color.primarySoft, radius.md, spacing.sm, typography.button

## Hero Card
- Figma 노드: (링크)
- 목적: 오늘의 문장과 상태를 보여주는 카드
- 토큰: color.surfaceAlt, color.primary, radius.xl, spacing.lg

## Design Styles (Figma)

### Text styles
- `heading01`: 32/48
- `heading02`: 28/42
- `heading03`: 24/36
- `heading04`: 20/30
- `subtitle01`: 16/24
- `subtitle02`: 14/21
- `body01`: 20/30
- `body02`: 16/24
- `body03`: 14/21
- `body04`: 12/18

### Color styles
- `page.fill`: #DEDEDE (page background)
- Groups: `light`, `dark`, `greyScale`

### Effect styles
- `shadow_01`
- `shadow_02`

> 위 스타일들은 `design/tokens.json`의 `textStyles`, `colorStyles`, `effectStyles`에 반영되어 있습니다.

---

# 랜딩페이지 컴포넌트 계약

## 디자인 원본 예외

- 이번 랜딩페이지의 승인된 디자인 원본은 `docs/(최종레퍼)fillsa-landing.html`이다.
- Figma 변수 추출 없이 위 HTML의 선택자와 실제 스타일 값을 `component.landing` 토큰으로 계약한다.
- 프론트는 정적 HTML을 `index.html`에 복사하지 않고 React 컴포넌트로 옮긴다.
- 레이아웃·문구·링크·기본 동작은 원본을 유지한다. AI 영역만 PRD에 맞춰 3개 문장 칩 선택으로 미리보기를 전환한다.

## LandingPage

- 역할: 랜딩 전체 섹션을 원본 순서대로 조합하는 페이지 진입점
- 구성: `LandingNavigation`, `LandingHero`, `ThemeMarquee`, `RenewalFeatures`, `ReflectionDemo`, `HowItWorks`, `LandingDownload`, `LandingFooter`
- 토큰: `component.landing.layout`, `component.landing.breakpoint`, `component.landing.motion`
- 상태: 모바일 여부, 소형 모바일 여부, 와이드 여부는 토큰의 반응형 기준으로 판별한다.
- 접근성: 문서 언어는 한국어, 모든 이미지에는 원본과 동일한 대체 텍스트를 제공한다.

## LandingNavigation

- 목적: 주요 섹션 앵커 이동과 모바일 메뉴 제공
- props: `items: NavigationItem[]`, `isScrolled: boolean`, `isMobileMenuOpen: boolean`, `onMenuToggle(): void`, `onNavigate(): void`
- 토큰: `component.landing.navigation`, `component.landing.motion`
- 상태:
  - 기본: `rgba(251,246,233,0.92)`
  - 스크롤 20px 초과: `rgba(251,246,233,0.97)`
  - 768px 이하: 데스크톱 링크를 숨기고 햄버거와 모바일 메뉴를 표시
- 인터랙션:
  - 햄버거로 메뉴 열기·닫기
  - 모바일 메뉴의 앵커 선택 후 메뉴 닫기
  - `배경테마 선택 → #themes`, `새로운 기능 → #new`, `사용법 → #how`, `다운로드 → #download`
- 자산: `src/assets/fillsa-logo.svg`; 원본 SVG path를 변경하지 않는다.

## LandingHero

- 목적: 서비스 가치 제안, 다운로드 CTA, 오늘의 필사 카드 노출
- props: `quotes: HeroQuote[]`, `activeQuoteIndex: number`, `typedText: string`
- 토큰: `component.landing.hero`, `component.landing.phone`, `gradient.heroCard`
- 인터랙션: 4개 문장을 타이핑 75ms → 2초 대기 → 삭제 35ms 순서로 반복한다.
- 반응형:
  - 기본 제목: `clamp(38px, 6.5vw, 76px)`
  - 480px 이하: 36px
  - 1400px 이상: 80px
- CTA:
  - Google Play 링크는 승인 원본 URL을 유지한다.
  - iOS는 `출시 예정` 비활성 표현을 유지한다.

## ThemeMarquee

- 목적: 10개의 감성 배경 테마를 무한 이동 카드로 보여준다.
- props: `items: ThemeCardItem[]`
- 토큰: `component.landing.themes`, `component.landing.motion.themeMarqueeDurationMs`
- 상태:
  - 10개 아이템을 한 번 복제해 끊김 없는 트랙을 만든다.
  - 카드별 배경은 `component.landing.themes.gradients` 배열 순서를 그대로 사용한다.
- 인터랙션:
  - 22초 선형 무한 이동
  - 트랙 hover 시 일시 정지
  - 카드 hover 시 위로 4px 이동

## RenewalFeatures

- 목적: 리뉴얼의 AI 성찰 기능과 3개의 보조 기능을 소개한다.
- props: `features: RenewalFeatureItem[]`, `reflectionItems: ReflectionItem[]`, `selectedReflectionId: string`, `onSelectReflection(id: string): void`
- 토큰: `component.landing.newFeatures`, `component.landing.reflection`
- 구성:
  - 넓은 카드: `AI 질문 & 성찰 일지` 설명 + `ReflectionDemo`
  - 작은 카드 3개: `문장 발견`, `필사 인사이트`, `감성 카드 공유`
- 반응형:
  - 기본 AI 데모는 2열
  - 768px 이하 AI 데모와 작은 카드 영역은 1열

## ReflectionDemo

- 목적: 선택한 문장을 바탕으로 성찰 일지 미리보기를 전환한다.
- props: `items: ReflectionItem[]`, `selectedId: string`, `onSelect(id: string): void`
- `ReflectionItem` 필드: `id`, `author`, `chipText`, `quote`, `date`, `source`, `question`, `answer`
- 상태:
  - 첫 번째 문장이 초기 선택
  - 3개 칩 중 하나만 `active`
  - 선택 시 인용문·날짜/출처·AI 질문·답변을 함께 갱신
- 제외: 승인 원본에 남은 채팅 입력창용 고아 스크립트와 실제 AI API 호출은 구현하지 않는다.

## HowItWorks

- 목적: 앱 화면 3개와 함께 사용 순서를 설명한다.
- props: `steps: HowStep[]`
- `HowStep` 필드: `number`, `title`, `description`, `image`, `imageAlt`, `reverse`
- 토큰: `component.landing.how`
- 자산: 승인 원본의 base64 PNG 3개를 동일한 바이트의 파일로 추출해 `src/assets`에서 import한다.
- 반응형:
  - 기본: 화면과 설명을 2열로 교차 배치
  - 768px 이하: 1열, 이미지 먼저, 중앙 정렬

## LandingDownload

- 목적: Google Play 다운로드와 App Store 출시 예정 상태 안내
- 토큰: `component.landing.download`
- 링크:
  - Google Play: 승인 원본 URL 유지, 새 탭 링크에 `rel="noopener noreferrer"` 추가
  - App Store: 원본의 `href="#"`와 비활성 표현 유지
- 자산: 스토어 아이콘 SVG를 원본 path 그대로 개별 파일로 분리한다.

## LandingFooter

- 목적: 서비스·팀·법적 고지 링크와 저작권 표시
- props: `groups: FooterLinkGroup[]`
- `FooterLinkGroup` 필드: `title`, `links`
- 토큰: `component.landing.footer`
- 링크:
  - Slashpage URL은 승인 원본을 유지하고 새 탭 링크에 안전 속성을 추가한다.
  - `기능 소개 → #features`는 현재 대상 섹션이 없지만 승인 원본 동작이므로 그대로 유지한다.
- 반응형:
  - 기본 4열
  - 768px 이하 2열
  - 480px 이하 1열

## 공통 모션 및 수명주기

- `.fade-up` 요소는 `IntersectionObserver` threshold 0.1에서 활성화하고, 관찰 대상과 observer를 정리한다.
- 스크롤 리스너, 타이머, 미디어 쿼리 리스너는 React StrictMode에서 중복 실행되지 않도록 effect cleanup을 제공한다.
- `prefers-reduced-motion: reduce`에서는 반복 마키와 타이핑/등장 모션을 정지하거나 즉시 완료 상태로 제공한다.
