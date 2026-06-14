import { theme } from './theme/tokens'

export default function App() {
  return (
    <main
      style={{
        background: theme.color.bg,
        color: theme.color.text,
        padding: theme.spacing.xl,
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: theme.typography.h1.size }}>필사</h1>
      <p style={{ color: theme.color.muted }}>기획 → 디자인 → 프론트 파이프라인 시작점.</p>
    </main>
  )
}
