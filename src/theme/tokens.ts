// design/tokens.json 에서 생성된 타입 안전 미러.
// 디자인 토큰이 바뀌면 design/tokens.json 을 고치고 이 파일을 재생성한다.
// 컴포넌트는 매직넘버 대신 반드시 이 토큰을 참조한다.
import tokens from '../../design/tokens.json'

export const theme = tokens
export type Theme = typeof tokens
