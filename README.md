# fillsa-web

필사(Fillsa) 홈페이지 프론트엔드. **기획 → 디자인 → 프론트** 를 AI 협업 파이프라인으로 진행한다.

- 스택: React + TypeScript (Vite)
- 배포: Cloudflare Pages (`src/` 빌드 결과물만 배포)
- 협업 규약: [`CLAUDE.md`](./CLAUDE.md) 참고

## 구조

```
fillsa-web/
├── CLAUDE.md          # AI 협업 파이프라인 규약 (작업 전 필독)
├── CODEOWNERS         # 폴더별 리뷰어 자동 지정
├── docs/              # 기획 — Notion 원본의 AI용 미러
│   ├── prd.md
│   └── user-flows.md
├── design/            # 디자인 — Figma 원본 + 추출 토큰
│   ├── figma-link.md  # Figma 원본 링크 (SSOT)
│   ├── tokens.json    # 디자인 토큰 (단계 간 계약)
│   └── components.md  # 컴포넌트 ↔ Figma 노드 매핑
└── src/               # ★ 프론트 코드 (배포 대상)
    ├── theme/tokens.ts   # tokens.json → TS 변환본
    └── components/
```

## 원본은 어디 있나 (중요)

| 산출물 | 원본(SSOT) | Git에 두는 것 |
|---|---|---|
| 기획(PRD) | Notion | AI가 읽을 핵심 미러 (`docs/prd.md`) |
| 디자인 | Figma | 링크 + 추출 토큰 (`design/`) |
| 프론트 코드 | **이 레포** | 전체 (`src/`) |

→ `docs/`, `design/` 는 빌드에서 제외되어 **서버엔 `src/` 결과물만** 올라간다.

## 빠른 시작

```bash
npm install
npm run dev      # 로컬 개발
npm run build    # dist/ 생성 (배포 대상)
```
