// 빌드 후 라우트별 정적 <head> 메타를 dist/**/index.html 에 주입한다.
// 본문(body)은 프리렌더하지 않는다 — LandingPage 의 useMediaQuery 가 레이아웃을 분기하는데
// SSR 환경(window 없음)에서는 세 분기 변수가 모두 false가 되어 실제로 존재할 수 없는 조합이
// 만들어지고, 이는 hydration mismatch로 이어진다. 자세한 이유는 src/seo/README.md 참고.
//
// 새 의존성을 추가하지 않기 위해 vite 의 JS API(ssrLoadModule)로 routes.ts 를 로드한다.
// routes.ts 가 .webp/.png 에셋을 import하는 데이터 모듈을 참조하므로 plain node import로는
// 실패하며, ssrLoadModule 이 vite의 에셋 처리 파이프라인을 그대로 태워준다.
import { createServer } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const distDir = path.join(rootDir, 'dist')

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeJsonLdForScript(json) {
  // </script> 로 조기 종료되는 것을 막기 위해 슬래시를 이스케이프한다.
  return JSON.stringify(json).replace(/</g, '\\u003c')
}

function replaceOrInsert(html, pattern, replacement) {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement)
  }
  return html.replace('</head>', `  ${replacement}\n  </head>`)
}

function applyMeta(template, route, siteUrl) {
  const canonicalUrl = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  const title = escapeHtml(route.title)
  const description = escapeHtml(route.description)
  const url = escapeHtml(canonicalUrl)

  let html = template

  html = replaceOrInsert(html, /<title>.*?<\/title>/s, `<title>${title}</title>`)

  html = replaceOrInsert(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  )

  html = replaceOrInsert(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
  )

  html = replaceOrInsert(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  )

  html = replaceOrInsert(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  )

  html = replaceOrInsert(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
  )

  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  )

  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`,
  )

  const jsonLdBlocks = (route.jsonLd ?? [])
    .map((entry) => `<script type="application/ld+json">${escapeJsonLdForScript(entry)}</script>`)
    .join('\n  ')

  if (jsonLdBlocks) {
    html = html.replace('</head>', `  ${jsonLdBlocks}\n  </head>`)
  }

  return html
}

async function writeRouteHtml(route, template, siteUrl) {
  const html = applyMeta(template, route, siteUrl)
  const outPath =
    route.path === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.path, 'index.html')

  await mkdir(path.dirname(outPath), { recursive: true })
  await writeFile(outPath, html, 'utf-8')
}

function buildSitemap(routes, siteUrl) {
  const urls = routes
    .map((route) => {
      const loc = escapeHtml(`${siteUrl}${route.path === '/' ? '/' : route.path}`)
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

async function main() {
  const vite = await createServer({
    root: rootDir,
    server: { middlewareMode: true },
    appType: 'custom',
  })

  const { routes } = await vite.ssrLoadModule('/src/seo/routes.ts')
  const { SITE_URL } = await vite.ssrLoadModule('/src/seo/siteMeta.ts')

  await vite.close()

  const template = await readFile(path.join(distDir, 'index.html'), 'utf-8')

  for (const route of routes) {
    await writeRouteHtml(route, template, SITE_URL)
  }

  await writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(routes, SITE_URL), 'utf-8')

  console.log(`prerender: ${routes.length}개 라우트 메타 생성 완료`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
