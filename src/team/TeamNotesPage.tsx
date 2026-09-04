import { TeamNotesLayout } from './TeamNotesLayout'
import { teamNotes } from './teamNotesData'

export function TeamNotesPage() {
  return (
    <TeamNotesLayout>
      <main className="team-main team-list-main">
        <header className="team-page-heading">
          <p>TEAM</p>
          <h1>📝 Team Notes</h1>
          <span>필사를 만들어가는 팀의 발자취를 남깁니다.</span>
        </header>

        <div className="team-note-list" aria-label="팀 노트 목록">
          {teamNotes.map((note) => (
            <article className="team-note-card" key={note.slug}>
              <a className="team-note-card-link" href={`/team-notes/${note.slug}`}>
                <div className="team-note-card-image-wrap">
                  <img src={note.coverImage} alt={note.coverAlt} />
                </div>
                <div className="team-note-card-copy">
                  <p>{note.author} · {note.date}</p>
                  <h2>{note.title}</h2>
                  <span>{note.summary}</span>
                  <strong>읽어보기 <span aria-hidden="true">→</span></strong>
                </div>
              </a>
            </article>
          ))}
        </div>
      </main>
    </TeamNotesLayout>
  )
}
