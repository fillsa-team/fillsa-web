# CLAUDE.md — fillsa-web 기획→디자인→프론트 AI 협업 파이프라인

필사 홈페이지를 **기획(PRD) → 디자인(Figma) → 프론트(React+TS)** 순으로 AI와 함께 만든다.
**2인 팀**: 디자이너(기획+디자인 담당) / 프론트 개발자. 각자 Claude Code/Cowork를 직접 사용한다.
AI는 작업 시작 전에 **"지금 어느 단계인지"** 를 판별하고, 그 단계의 입력/출력 경계를 넘지 않는다.

---

## 0. 황금 규칙

1. **SSOT 위치**: 기획 원본=Git(`docs/`), 디자인 원본=Figma. 기획은 여기(Git)가 원본이고, 디자인 값만 외부(Figma)에서 계약 파일로 가져온다.
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

- **Owner**: 디자이너 (기획+디자인 겸임)
- **원본(SSOT)**: Git의 `docs/` — 기획 문서는 여기서 직접 작성·관리한다 (외부 도구 사본 아님).
- **Git 산출물**:
  - `docs/prd.md` — 화면별 PRD (원본)
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

- **Owner**: 프론트 개발자
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

## 6. 배포 (미정 — 추후 결정)

- **배포 플랫폼은 아직 정하지 않았다.** 정해지면 이 섹션을 갱신한다.
- 확정 사항(플랫폼 무관):
  - `src/` 만 빌드 대상. `docs/`, `design/` 은 빌드가 import 안 하므로 결과물에서 자동 제외.
  - 빌드 결과물은 `dist/` 만 배포된다.

---

## 7. 폴더 소유권 / 커밋 컨벤션

```
docs/     → 디자이너 (기획)
design/   → 디자이너 (디자인)
src/      → 프론트 개발자
CLAUDE.md → 공동 (변경 시 합의)
```

리뷰어 자동 지정은 `CODEOWNERS` 파일이 처리한다 (경로 → GitHub 핸들).
2인 팀이라 PLAN·DESIGN PR은 프론트 개발자가, FE PR은 디자이너가 교차 리뷰한다.

---

## 8. GitHub 협업 전략

> 비개발자 팀 기준. **규칙은 AI가 맞추고 사람은 눈으로 확인만** 한다.
> 복잡한 Git Flow 안 쓴다. `main` + 작업용 단계 브랜치만.

### 8.1 브랜치 전략

```
main  ← 항상 배포 가능 상태 유지
 ├─ plan/<요약>     예: plan/로그인-prd      (디자이너)
 ├─ design/<요약>   예: design/로그인-토큰    (디자이너)
 └─ fe/<요약>       예: fe/로그인-화면        (프론트 개발자)
```

- 브랜치 이름 = `단계/작업요약` → §1 단계 태그와 1:1.
- **`main` 직접 커밋 금지.** 항상 브랜치 → PR → 머지 (황금규칙 4).
- 머지된 브랜치는 삭제한다 (히스토리 정리).

### 8.2 커밋 메시지

```
[단계] 요약        예: [FE] 로그인 버튼 컴포넌트 추가
```

- 단계 태그 필수: `[PLAN]` / `[DESIGN]` / `[FE]` / `[CHORE]`(설정·CI 등 단계 무관 작업).
- 한글 요약 OK. "무엇을 했는지" 한 줄. AI가 형식을 맞추므로 외울 필요 없다.

### 8.3 PR 규칙

- **PR 1개 = 단계 1개** (§7). 제목도 `[단계] 요약`.
- 리뷰어는 `CODEOWNERS`가 자동 지정. 리뷰어 = 인접 단계 담당자.
- **머지는 Squash merge.** 브랜치의 여러 커밋이 `main`엔 1개로 합쳐져 히스토리가 깔끔하다.
- PR 본문에 변경 요약 + (있으면) 미리보기 URL.

### 8.4 main 보호 (예정)

- 현재는 **문서 규칙으로만** 운영하고 GitHub 강제 설정은 적용하지 않는다.
- 팀이 익숙해지면 적용: `main` 직접 push 차단 + PR 승인 1명 필수 + CODEOWNERS 승인 강제.
