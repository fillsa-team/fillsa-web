import teamNoteAppGuide from '../assets/team-note-app-guide.webp'
import teamNoteCelebration from '../assets/team-note-celebration.webp'
import { GOOGLE_PLAY_URL } from '../landing/data'
import { TeamNotesLayout } from './TeamNotesLayout'

export function TeamNoteDetailPage() {
  return (
    <TeamNotesLayout>
      <main className="team-main team-detail-main">
        <a className="team-back-link" href="/team-notes">← 팀 노트 목록</a>

        <article className="team-article">
          <div className="team-article-heading">
            <p>Fillsa · 2025년 8월 6일</p>
            <h1>👩🏻‍💻🧑🏻‍💻👩🏻‍💻우리가 필사(Fillsa)를 만든 이유</h1>
          </div>

          <a
            className="team-article-image-link"
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Play에서 필사 다운로드"
          >
            <img
              className="team-article-image"
              src={teamNoteAppGuide}
              alt="필사 앱 사용 방법을 설명하는 세 개의 모바일 화면"
            />
          </a>

          <div className="team-copy">
            <p>
              안녕하세요, 여러분! 😄<br />
              어느덧 필사(Fillsa)를 출시한 지 한 달이 넘었어요!<br />
              (⏱️ 시간은 왜 이렇게 빠른지…)
            </p>
            <p className="team-lead">📚 오늘은 우리가 Fillsa 앱 프로젝트를 시작하게 된 계기에 대해 이야기해 보려 해요!</p>
            <p>
              자, 보자보자~<br />
              그럼 이 이야기는 약 9개월 전, 바람이 차갑게 불던 겨울로 거슬러 올라갑니다. 🥶
            </p>
            <p>
              우리 팀원 중, 이 프로젝트를 먼저 제안했다는 이유로 대표를 맡고 있는 친구가 있는데요,<br />
              (아주 책임감 있게 역할을 톡톡히 해내고 있습니다! 인정 뱃지 드립니다🎖️)
            </p>
            <p>
              Anyway! 이 대표 친구가 앱을 만들고 싶어 고민하던 중,<br />
              자신의 관심사에서 출발한 프로젝트라면 실현 가능성이 있다고 판단했대요.<br />
              평소 책을 좋아했던 터라 필사를 자연스럽게 접하게 되었고,<br />
              이런 경험을 바탕으로 '꼭 책 필사가 아니어도 되잖아?' 라는 생각을 하게 되었다고 합니다.
            </p>
            <p className="team-highlight">그래서 우리 Fillsa는 명언 필사 입니다.</p>

            <aside className="team-origin-note">
              <span>곁들인 스토리 🖋️</span>
              <h3>Fillsa 이름의 유래</h3>
              <p>
                하루 한 문장씩 명언을 제공하며, 명언을 필사한 후 감상을 메모할 수 있습니다.<br />
                그래서 ‘나만의 필사로 채우다’ ➡️ <strong>Fill(채우다)</strong>를 활용한 언어유희로<br />
                Fillsa라는 이름이 탄생하게 되었어요.
              </p>
            </aside>

            <p>
              이후 합류한 멤버로는 디자이너와 앱 개발자가 있습니다. 대표님은 백엔드 개발자라네요(속닥속닥😪).<br />
              처음엔 "프로젝트 하나 만들어보자~" 하고 시작했는데,<br />
              구축하고 출시하다 보니 이 필사 앱이 아기처럼 소중하고... (네...) 막 그러네요. 🤣
            </p>

            <figure>
              <img
                className="team-article-image"
                src={teamNoteCelebration}
                alt="출시 기념 회식 후 세 팀원이 손으로 브이 포즈를 한 모습"
              />
              <figcaption>출시기념 회식 후 브이 한 컷✌️</figcaption>
            </figure>

            <p>
              앞으로도 들려드리고 싶은,<br />
              그리고 들려드릴 수 있는 이야기가 많으니<br />
              우리 Fillsa, 쭉 지켜봐 주세요!
            </p>

            <div className="team-download-callout">
              <h3>🏝️8월 무더위를 날려버리는 방법은?</h3>
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
                🔗필사 다운로드!
              </a>
              <p>(현재 안드로이드만 지원하며, iOS는 추후 지원예정입니다.)</p>
            </div>

            <p>감사합니다.</p>
            <p className="team-signoff">-필사팀 드림</p>
          </div>
        </article>
      </main>
    </TeamNotesLayout>
  )
}
