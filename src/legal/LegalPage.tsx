import { useEffect, useState } from 'react'
import fillsaLogo from '../assets/fillsa-logo.svg'
import { landingCssVariables } from '../landing/cssVariables'
import { LandingFooter } from '../landing/LandingFooter'
import { MobileNavigationMenu } from '../landing/MobileNavigationMenu'
import { titleForPath } from '../seo/routes'
import { privacyDocument, termsDocument, type LegalTable } from './legalDocuments'
import './legal.css'

type LegalPageProps = {
  document: 'terms' | 'privacy'
}

function DocumentTable({ table }: { table: LegalTable }) {
  return (
    <div className="legal-table-scroll" tabIndex={0} aria-label="표 좌우 스크롤 영역">
      <table>
        <thead>
          <tr>
            {table.headers.map((header) => (
              <th key={header} scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`}>
                  {cell.split('\n').map((line, lineIndex) => <span key={`${lineIndex}-${line}`}>{line}</span>)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function linkedParagraph(text: string) {
  const email = 'pillsaappstore@gmail.com'
  const urls = ['https://kopico.go.kr', 'https://privacy.kisa.or.kr', 'https://spo.go.kr', 'https://ecrm.police.go.kr']
  const parts = text.split(new RegExp(`(${email}|${urls.map((url) => url.replace(/[./]/g, '\\$&')).join('|')})`, 'g'))

  return parts.map((part) => {
    if (part === email) {
      return <a key={part} href={`mailto:${email}`}>{part}</a>
    }

    if (urls.includes(part)) {
      return <a key={part} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
    }

    return part
  })
}

export function LegalPage({ document: documentType }: LegalPageProps) {
  const legalDocument = documentType === 'terms' ? termsDocument : privacyDocument
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.document.title = titleForPath(`/${documentType}`)
    window.scrollTo(0, 0)
  }, [documentType])

  return (
    <div className="legal-page" style={landingCssVariables}>
      <header className="legal-header">
        <a
          className="legal-logo"
          href="/"
          aria-label="Fillsa 홈으로 이동"
          onClick={() => setMenuOpen(false)}
        >
          <img src={fillsaLogo} width="64" height="30" alt="Fillsa" />
        </a>
        <button
          className="legal-hamburger"
          type="button"
          aria-label="메뉴"
          aria-expanded={menuOpen}
          aria-controls="legal-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileNavigationMenu
        id="legal-menu"
        open={menuOpen}
        linkToLanding
        onClose={() => setMenuOpen(false)}
      />

      <main className="legal-main">
        <div className="legal-heading">
          <p>법적 고지</p>
          <h1>{legalDocument.title}</h1>
          <span>시행일 {legalDocument.effectiveDate}</span>
        </div>

        <article className="legal-document">
          {legalDocument.sections.map((section, sectionIndex) => (
            <section className="legal-section" key={`${section.title}-${sectionIndex}`}>
              {section.chapter && <h2>{section.chapter}</h2>}
              {section.title && <h3>{section.title}</h3>}
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${paragraphIndex}-${paragraph}`}>{linkedParagraph(paragraph)}</p>
              ))}
              {section.tables?.map((table, tableIndex) => (
                <DocumentTable key={`${table.headers.join('-')}-${tableIndex}`} table={table} />
              ))}
            </section>
          ))}
        </article>
      </main>

      <LandingFooter />
    </div>
  )
}
