# SEO — 라우트별 정적 메타 프리렌더

## 무엇을 하는가

SPA(`src/App.tsx`)는 `window.location.pathname` 을 직접 읽어 분기하는 순수 클라이언트 사이드
라우팅이라, 빌드 산출물은 원래 모든 경로에서 동일한 `dist/index.html`(제목 "Fillsa" 고정)을
서빙했다. 검색엔진/SNS 스크래퍼는 대부분 JS를 실행하지 않거나 실행하더라도 `<head>` 를
최초 응답 기준으로 캐시하므로, 라우트별로 다른 `<title>`/`description`/OG 태그가 필요했다.

`scripts/prerender.mjs` 가 `vite build` 직후 실행되어, `src/seo/routes.ts` 에 정의된 라우트
목록을 순회하며 각 라우트의 정적 `index.html` 을 생성한다 (`dist/release-notes/dark-mode/index.html`
등). Cloudflare Workers static assets 는 경로와 일치하는 디렉터리의 `index.html` 을 그대로
서빙하므로 서버 측 라우팅 설정이 추가로 필요 없다.

## 본문(body) 프리렌더는 하지 않는 이유

`src/landing/LandingPage.tsx` 의 `useMediaQuery` 훅이 `isMobile`/`isCompact`/`isWide` 값으로
**레이아웃 구조 자체를 분기**한다 (`LandingPage.tsx:102-105`). 브라우저에서는 이 중 정확히
하나(또는 `isWide` 만 별도)가 참이 되도록 미디어쿼리가 상호 배타적으로 설계되어 있지만,
Node.js 프리렌더 환경에는 `window`/`matchMedia` 가 없다. 즉 SSR로 `renderToString` 을 돌리면
세 값이 모두 `false`가 되는, 브라우저에서는 절대 나올 수 없는 조합의 HTML이 만들어진다.
브라우저가 이 HTML을 `hydrateRoot` 로 이어받으려 하면 React가 서버 HTML과 클라이언트
렌더 결과가 다르다고 판단해 hydration mismatch 경고와 함께 전체를 다시 그린다 — 프리렌더의
이점(첫 페인트 콘텐츠)이 사라지고 깜빡임만 남는다.

그래서 이 프로젝트는:
- **`<head>` 메타만 라우트별로 정적 생성**한다 (SEO/SNS 카드에는 이것만으로 충분).
- `#root` 는 **빈 상태로 유지**하고, 브라우저에서 기존과 동일하게 `createRoot` 로 클라이언트
  렌더링한다.
- `src/main.tsx` 의 `createRoot` 를 `hydrateRoot` 로 바꾸지 않는다.
- `renderToString` 등으로 body를 채우지 않는다.

향후 진짜 body 프리렌더/SSR이 필요해지면, 먼저 `useMediaQuery` 를 SSR 세이프하게(예: 서버에서는
고정 브레이크포인트를 가정하거나 CSS 컨테이너 쿼리로 전환) 만드는 작업이 선행되어야 한다.

## 라우트 추가 시 절차

새 라우트는 `src/App.tsx` 의 경로 분기와 `src/seo/routes.ts` 의 `routes` 배열 양쪽에 함께
반영해야 한다. 한쪽만 고치면:
- `App.tsx` 에만 추가 → 그 라우트는 항상 루트(`/`)의 메타(`필사 - 하루 한 문장...`)를 보여준다.
- `routes.ts` 에만 추가 → 프리렌더가 존재하지 않는 라우트의 HTML을 `dist/` 에 만들어 낭비된다.

릴리즈노트/팀노트처럼 데이터 배열에서 파생되는 라우트는 `releaseNotesData.ts`/`teamNotesData.ts`
를 고치면 `routes.ts` 가 자동으로 따라간다 (하드코딩 금지 — 데이터 드리프트 방지).

## 코드로 해결 불가 — 수동 조치 필요

- **apex `fillsa.com` → `www` 301 리다이렉트**: 현재 apex와 `www` 둘 다 200 응답을 반환한다.
  중복 도메인은 검색엔진이 링크 신호를 분산시켜 SEO에 불리하다. Cloudflare 대시보드의
  Redirect Rules(또는 Bulk Redirects)에서 `fillsa.com/*` → `https://www.fillsa.com/$1` 301을
  설정해야 한다. 이 저장소의 빌드 산출물만으로는 도메인 리다이렉트를 만들 수 없다.
- **Search Console에 sitemap 제출**: `dist/sitemap.xml` 은 빌드마다 생성되지만, Google Search
  Console(및 필요 시 Naver 서치어드바이저)에 최초 1회 수동으로 등록해야 크롤링 대상에 잡힌다.
