import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// src/ 만 빌드 대상. docs/ design/ 은 import 체인에 없으므로 결과물에서 자동 제외됨.
export default defineConfig({
  plugins: [react()],
})
