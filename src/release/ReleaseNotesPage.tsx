import { TeamNotesLayout } from '../team/TeamNotesLayout'
import { releaseNotes } from './releaseNotesData'
import './release-notes.css'

export function ReleaseNotesPage() {
  return (
    <TeamNotesLayout>
      <main className="release-main">
        <header className="release-page-heading">
          <p>UPDATES</p>
          <h1>📓 Release Notes</h1>
          <span>새롭게 달라진 필사의 소식을 전합니다.</span>
        </header>

        <div className="release-list" aria-label="릴리즈 노트 목록">
          {releaseNotes.map((note) => (
            <article className="release-card" key={note.slug}>
              <a href={`/release-notes/${note.slug}`}>
                <div className="release-card-image">
                  <img src={note.image} alt={note.imageAlt} />
                </div>
                <div className="release-card-copy">
                  <p>{note.date}</p>
                  <h2>{note.title}</h2>
                  <span>{note.summary}</span>
                  <strong>업데이트 보기 <span aria-hidden="true">→</span></strong>
                </div>
              </a>
            </article>
          ))}
        </div>
      </main>
    </TeamNotesLayout>
  )
}
