import { theme } from '../theme/tokens'
import { Text } from './Text'

export function HeroCard() {
  return (
    <div
      style={{
        background: theme.gradient.heroCard,
        borderRadius: theme.component.heroCard.radius,
        padding: theme.component.heroCard.padding,
        color: theme.color.textInverse,
      }}
    >
      <Text variant="label" as="div" style={{ marginBottom: theme.spacing.sm, opacity: 0.8, textTransform: 'uppercase', letterSpacing: theme.typography.label.letterSpacing }}>
        오늘의 문장
      </Text>
      <Text variant="body01" as="p" style={{ marginBottom: theme.spacing.md, lineHeight: 1.7 }}>
        “작은 습관이 만드는 큰 변화.”
      </Text>
      <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: theme.radius.full,
            background: 'rgba(255,255,255,0.2)',
            fontSize: 12,
          }}
        >
          7일 연속
        </span>
        <span
          style={{
            padding: '4px 8px',
            borderRadius: theme.radius.full,
            background: 'rgba(255,255,255,0.2)',
            fontSize: 12,
          }}
        >
          AI 요약
        </span>
      </div>
    </div>
  )
}
