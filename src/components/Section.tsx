import type { ReactNode } from 'react'
import { theme } from '../theme/tokens'
import { Text } from './Text'

type SectionProps = {
  title: string
  description: string
  children: ReactNode
}

export function Section({ title, description, children }: SectionProps) {
  return (
    <section
      style={{
        padding: `${theme.spacing.section}px 24px`,
        background: theme.color.surface,
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Text variant="label" as="div" style={{ color: theme.color.primary, marginBottom: theme.spacing.sm, textTransform: 'uppercase', letterSpacing: theme.typography.label.letterSpacing }}>
          {title}
        </Text>
        <Text variant="heading02" as="h2" style={{ color: theme.color.text, marginBottom: theme.spacing.md }}>
          {description}
        </Text>
        <div>{children}</div>
      </div>
    </section>
  )
}
