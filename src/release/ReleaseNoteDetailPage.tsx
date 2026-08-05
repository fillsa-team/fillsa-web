import { GOOGLE_PLAY_URL } from '../landing/data'
import { TeamNotesLayout } from '../team/TeamNotesLayout'
import { releaseNotes } from './releaseNotesData'
import './release-notes.css'

interface ReleaseNoteDetailPageProps {
  slug: string
}

export function ReleaseNoteDetailPage({ slug }: ReleaseNoteDetailPageProps) {
  const note = releaseNotes.find((item) => item.slug === slug)

  if (!note) {
    return <ReleaseNotesPageFallback />
  }

  return (
    <TeamNotesLayout title={`${note.title.replace('📢 ', '')} | Fillsa`}>
      <main className="release-main release-detail-main">
        <a className="release-back-link" href="/release-notes">← 릴리즈 노트 목록</a>

        <article className="release-article">
          <header className="release-article-heading">
            <p>Fillsa · {note.date}</p>
            <h1>{note.title}</h1>
          </header>

          <div className="release-article-body">
            <div className="release-detail-image">
              <img src={note.image} alt={note.imageAlt} />
            </div>

            <div className="release-detail-copy">
              <p className="release-intro">{note.intro}</p>

              {note.sections.map((section) => (
                <section className="release-section" key={section.title}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              ))}

              {note.downloadLink && (
                <a className="release-download-link" href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
                  Google Play에서 Fillsa 다운로드 →
                </a>
              )}

              <div className="release-outro">
                {note.outro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </article>
      </main>
    </TeamNotesLayout>
  )
}

function ReleaseNotesPageFallback() {
  return (
    <TeamNotesLayout title="Release Notes | Fillsa">
      <main className="release-main release-empty">
        <h1>릴리즈 노트를 찾을 수 없습니다.</h1>
        <a href="/release-notes">릴리즈 노트 목록으로 돌아가기</a>
      </main>
    </TeamNotesLayout>
  )
}
