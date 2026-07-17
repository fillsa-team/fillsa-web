# Design Tokens

이 폴더의 목적은 Figma에서 정의한 디자인 스타일을 코드에서 재사용 가능한 토큰으로 유지하는 것입니다.

## 포함된 파일

- `tokens.json` - 디자인 토큰의 실제 값. 색상, 타이포, 간격, 반경, 그림자, 그라디언트 등을 정의합니다.
- `components.md` - 주요 컴포넌트와 Figma 스타일 매핑 문서.

## 사용 방법

프론트 코드에서는 `src/theme/tokens.ts`를 통해 `design/tokens.json`을 가져옵니다.
예:

```ts
import { theme } from './theme/tokens'

console.log(theme.color.primary)
```

## Figma에서 토큰 추출 방법

### 1. Figma Tokens 플러그인 사용 (권장)

1. Figma 파일을 엽니다.
2. 오른쪽 상단 메뉴에서 `Plugins` → `Figma Tokens`를 실행합니다.
3. 플러그인 내부에서 `Styles` 또는 `Tokens`를 동기화합니다.
4. 텍스트 스타일, 컬러 스타일, 이펙트 스타일을 가져옵니다.
5. `Export` → `JSON`로 내보냅니다.
6. 내보낸 JSON을 `design/tokens.json`으로 병합하거나 필요한 값만 복사해서 업데이트합니다.

### 2. Figma REST API 사용 (자동화용)

1. Figma 개인 액세스 토큰을 생성합니다.
2. Figma 파일 키를 찾습니다. URL에서 `/file/` 뒤 첫 번째 경로 부분이 파일 키입니다.
3. 다음 API를 사용하여 스타일 정보를 가져옵니다:

```bash
curl -H "X-Figma-Token: $FIGMA_TOKEN" "https://api.figma.com/v1/files/$FIGMA_FILE_KEY/styles"
```

4. 필요한 스타일 항목을 파싱하여 `design/tokens.json` 스키마로 매핑합니다.

> 참고: API 결과는 raw data이므로 실제 토큰 구조로 가공하는 스크립트가 필요합니다.

## PR 및 커밋 가이드

- `design/tokens.json`과 `design/README.md`는 같은 PR에 포함하는 것이 좋습니다.
- `design/tokens.json`은 실제 토큰 값이 변경되는 파일입니다.
- `design/README.md`는 팀원들이 토큰을 사용하는 방법과 Figma 동기화 절차를 안내하는 문서입니다.
- 토큰 변경 시 PR 제목에 `[DESIGN]`을 붙이고, 해당 값이 어디에 쓰이는지를 설명하세요.

## 토큰 변경 시 검토 항목

- `design/tokens.json`에 값이 올바르게 들어갔는지
- `src/theme/tokens.ts`가 여전히 정상적으로 import 되는지
- `src/` 코드가 여전히 빌드되는지
- 컴포넌트가 토큰 대신 매직 값으로 작성되어 있지 않은지
