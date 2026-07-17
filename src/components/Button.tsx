import type { ReactNode } from 'react'
import { theme } from '../theme/tokens'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
}

export function Button({ children, variant = 'primary', href }: ButtonProps) {
  const token = variant === 'primary' ? theme.component.button.primary : theme.component.button.secondary

  const commonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${token.paddingY}px ${token.paddingX}px`,
    borderRadius: token.radius,
    fontSize: theme.typography.button.size,
    fontWeight: theme.typography.button.weight,
    textDecoration: 'none',
    border: variant === 'secondary' ? `1px solid ${token.border}` : 'none',
    background: token.bg,
    color: token.text,
    boxShadow: variant === 'primary' ? theme.shadow.cardSoft : 'none',
  } as const

  if (href) {
    return (
      <a href={href} style={commonStyle}>
        {children}
      </a>
    )
  }

  return <button style={commonStyle}>{children}</button>
}
