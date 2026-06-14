# CLAUDE.md — fillsa-web 기획→디자인→프론트 AI 협업 파이프라인

필사 홈페이지를 **기획(PRD) → 디자인(Figma) → 프론트(React+TS)** 순으로 AI와 함께 만든다.
팀원(백엔드+PM / 디자이너 / 앱개발자)이 각자 Claude Code/Cowork를 직접 사용한다.
AI는 작업 시작 전에 **"지금 어느 단계인지"** 를 판별하고, 그 단계의 입력/출력 경계를 넘지 않는다.

---

## 0. 황금 규칙

1. **원본(SSOT)은 외부 도구에 있다.** 기획 원본=Notion, 디자인 원본=Figma. Git에는 "AI가 읽을 미러 + 코드"만 둔다.
2. **단계 간 데이터는 계약 파일로만** 주고받는다. 프론트는 Figma를 직접 읽지 않고 `design/tokens.json` / `design/components.md` 만 신뢰한다.
3. **자기 소유 폴더 밖은 수정하지 않는다** (CODEOWNERS 참고).
4. **단계 전환은 PR 머지로만.** AI가 임의로 다음 단계까지 진행 금지.
5. 커밋 메시지에 단계 태그: `[PLAN]` / `[DESIGN]` / `[FE]`.

---

## 1. 단계 판별 (AI가 시작 시 self-check)

| 신호 | 단계 | 진입점 |
|---|---|---|
| `docs/` 수정, "기획/PRD/유저플로우" | **PLAN** | §2 |
| `design/` 수정, "디자인/토큰/컴포넌트/Figma" | **DESIGN** | §3 |
| `src/` 수정, "구현/컴포넌트 코드/화면 개발" | **FE** | §4 |

모호하면 **사용자에게 먼저 물어본다.**

---

## 2. PLAN 단계 (기획)

- **Owner**: PM (= 백엔드+PM 담당)
- **원본**: Notion (실제 기획 문서)
- **Git 산출물 (AI용 미러)**:
  - `docs/prd.md` — Notion 핵심을 마크다운으로 옮긴 사본
  - `docs/user-flows.md` — 유저 플로우
- **PRD 포맷**:
  ```
  [화면명]
  - 목적:
  - 진입 경로:
  - 구성요소:
    - [요소명] 설명 / 상태 / 인터랙션
  - 예외/엣지케이스:
  ```
- **완료**: `[PLAN]` 커밋 + PR 머지. 머지 전 DESIGN 진행 금지.
- **금지**: 색상/픽셀값 등 디자인 결정 (DESIGN 침범).

---

## 3. DESIGN 단계 (디자인)

- **Owner**: 디자이너
- **원본**: Figma (실제 디자인)
- **입력**: 머지된 `docs/prd.md`
- **도구**: Figma MCP (`use_figma`, `get_design_context`, `get_variable_defs`)
- **흐름**:
  1. `docs/prd.md` 화면 목록 읽기
  2. Figma에서 화면/컴포넌트 작업
  3. `get_variable_defs` 로 변수 추출 → `design/tokens.json` 갱신
  4. 컴포넌트 ↔ Figma 노드 매핑을 `design/components.md` 에 기록
- **Git 산출물 (계약)**:
  - `design/figma-link.md` — Figma 원본 링크
  - `design/tokens.json` — ★ 단계 간 핵심 계약
  - `design/components.md` — 컴포넌트 스펙
- **tokens.json 스키마 (고정)**:
  ```json
  {
    "color": { "primary": "#...", "bg": "#...", "text": "#..." },
    "typography": { "h1": { "size": 32, "weight": 700, "lineHeight": 40 } },
    "spacing": { "xs": 4, "sm": 8, "md": 16, "lg": 24 },
    "radius": { "sm": 4, "md": 8, "full": 9999 }
  }
  ```
- **완료**: `[DESIGN]` 커밋 + PR. **프론트가 리뷰**(구현 가능 확인) 후 머지.
- **금지**: `src/` 수정. 토큰을 코드로 직접 작성 (JSON 계약만).

---

## 4. FE 단계 (프론트)

- **Owner**: 프론트 담당 (= 미정/AI 주도 가능)
- **스택**: React + TypeScript (Vite)
- **입력 (계약만 신뢰)**:
  - `docs/prd.md` — 동작 명세
  - `design/tokens.json` — 스타일 값의 유일한 출처(SSOT)
  - `design/components.md` — 컴포넌트 스펙
- **Figma 직접 안 읽음.** 픽셀값은 `tokens.json` 에서. 없으면 디자이너에게 토큰 추가 요청, 하드코딩 금지.
- **흐름**:
  1. `design/tokens.json` → `src/theme/tokens.ts` 로 로드/갱신
  2. `design/components.md` 스펙대로 `src/components/` 구현
  3. `docs/prd.md` 동작/엣지케이스 반영
- **규칙**:
  - 색/간격/타이포는 토큰 참조. 매직넘버 금지.
  - props 타입 명시, 기본값 제공.
- **완료**: `[FE]` 커밋 + PR. **디자이너가 리뷰**(디자인 일치) 후 머지.

---

## 5. 변경 전파 (디자인이 바뀌면)

1. 디자이너 Figma 수정 → `design/tokens.json` 갱신 PR (`[DESIGN]`)
2. CI가 `tokens.json` diff 코멘트
3. 프론트는 `src/theme/tokens.ts` 재생성 → 토큰 참조 컴포넌트 자동 반영
4. breaking 변경이면 `components.md` 에 마이그레이션 노트

---

## 6. 배포 (Cloudflare Pages)

- `src/` 만 빌드 대상. `docs/`, `design/` 은 빌드가 import 안 하므로 결과물에서 자동 제외.
- push → Cloudflare Pages 자동 빌드 → 배포. PR은 미리보기 URL 자동 생성.
- 서버에는 `dist/` (빌드 결과)만 올라간다.

---

## 7. 폴더 소유권 / 커밋 컨벤션

```
docs/     → PM
design/   → 디자이너
src/      → 프론트 담당
CLAUDE.md → 공동 (변경 시 합의)
```

- 커밋: `[PLAN|DESIGN|FE] 요약`
- PR은 단계 하나만 포함. 리뷰어는 인접 단계 담당자.
