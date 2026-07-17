import { theme } from './theme/tokens'
import { Button } from './components/Button'
import { HeroCard } from './components/HeroCard'
import { Section } from './components/Section'
import { Text } from './components/Text'

export default function App() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: theme.color.bg,
        color: theme.color.text,
        fontFamily: theme.typography.fontFamily.sans,
      }}
    >
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: `${theme.spacing.hero}px 24px ${theme.spacing.section}px`,
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: theme.spacing.xl,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              padding: '6px 12px',
              borderRadius: theme.radius.full,
              background: theme.color.primarySoft,
              color: theme.color.primary,
              marginBottom: theme.spacing.md,
            }}
          >
            <Text variant="label" as="div">✦ 필사 디자인 시스템</Text>
          </div>
          <Text variant="heading01" as="h1" style={{ maxWidth: 680, margin: `0 0 ${theme.spacing.md}px`, color: theme.color.text }}>
            하루 한 문장, 나만의 기록
          </Text>
          <Text variant="body02" as="p" style={{ maxWidth: 520, marginBottom: theme.spacing.lg, color: theme.color.textMuted }}>
            기획부터 디자인, 프론트까지 하나의 토큰 기반 흐름으로 연결된 경험을 제공합니다.
          </Text>
          <div style={{ display: 'flex', gap: theme.spacing.sm, flexWrap: 'wrap' }}>
            <Button href="#">시작하기</Button>
            <Button variant="secondary" href="#">
              둘러보기
            </Button>
          </div>
        </div>

        <div
          style={{
            background: theme.color.surfaceAlt,
            borderRadius: theme.radius.xl,
            padding: theme.spacing.lg,
            boxShadow: theme.shadow.card,
          }}
        >
          <HeroCard />
        </div>
      </section>

      <Section title="Features" description="디자인 토큰 기반의 섹션 구성">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: theme.spacing.lg }}>
          {[
            ['토큰 관리', '색상/폰트/간격을 한곳에서 관리합니다.'],
            ['컴포넌트 재사용', '버튼과 카드 같은 UI를 조합해 구성합니다.'],
            ['확장성', '새 섹션을 추가해도 같은 패턴으로 확장할 수 있습니다.'],
          ].map(([title, body]) => (
            <div
              key={title}
              style={{
                background: theme.color.surface,
                border: `1px solid ${theme.color.border}`,
                borderRadius: theme.radius.lg,
                padding: theme.spacing.lg,
              }}
            >
              <h3 style={{ marginBottom: theme.spacing.sm, color: theme.color.text }}>{title}</h3>
              <p style={{ color: theme.color.textMuted, lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
