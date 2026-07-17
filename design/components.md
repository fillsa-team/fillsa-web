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
