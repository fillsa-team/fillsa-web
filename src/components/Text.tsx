import type { ReactNode, CSSProperties } from 'react'
import { theme } from '../theme/tokens'

type Variant =
  | 'heading01'
  | 'heading02'
  | 'heading03'
  | 'heading04'
  | 'subtitle01'
  | 'subtitle02'
  | 'body01'
  | 'body02'
  | 'body03'
  | 'body04'
  | 'label'

type TextProps = {
  children: ReactNode
  variant?: Variant
  as?: keyof JSX.IntrinsicElements
  style?: CSSProperties
}

export function Text({ children, variant = 'body02', as: Comp = 'p', style }: TextProps) {
  const ts = (theme as any).textStyles?.[variant]
  const baseStyle: CSSProperties = {
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: ts ? ts.size : theme.typography.body.size,
    lineHeight: ts ? `${ts.lineHeight}px` : `${theme.typography.body.lineHeight}px`,
    margin: 0,
    color: theme.color.text,
  }

  // lightweight weight mapping
  const weightMap: Record<string, number> = {
    heading01: theme.typography.fontWeight.light,
    heading02: theme.typography.fontWeight.light,
    heading03: theme.typography.fontWeight.light,
    heading04: theme.typography.fontWeight.light,
    subtitle01: theme.typography.fontWeight.regular,
    subtitle02: theme.typography.fontWeight.regular,
    body01: theme.typography.fontWeight.regular,
    body02: theme.typography.fontWeight.regular,
    body03: theme.typography.fontWeight.regular,
    body04: theme.typography.fontWeight.regular,
    label: theme.typography.fontWeight.medium,
  }

  const merged = { ...baseStyle, fontWeight: weightMap[variant] ?? theme.typography.fontWeight.regular, ...style }

  return <Comp style={merged}>{children}</Comp>
}
