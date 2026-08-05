import releaseDarkMode from '../assets/release-dark-mode.webp'
import releaseLaunch from '../assets/release-launch.webp'
import releaseShareStyles from '../assets/release-share-styles.webp'

export interface ReleaseSection {
  title: string
  items: string[]
}

export interface ReleaseNote {
  slug: string
  title: string
  date: string
  summary: string
  image: string
  imageAlt: string
  intro: string
  sections: ReleaseSection[]
  outro: string[]
  downloadLink?: boolean
}

export const releaseNotes: ReleaseNote[] = [
  {
    slug: 'dark-mode',
    title: '📢 다크 모드 신규 추가',
    date: '2025년 9월 23일',
    summary: '휴대폰 설정과 연동되는 다크 모드를 추가해 야간에도 편안하게 필사할 수 있습니다.',
    image: releaseDarkMode,
    imageAlt: 'Fillsa 앱 다크 모드 화면',
    intro: '안녕하세요, 필사를 사랑해주시는 여러분 🙇‍♀️ 여러분의 요청에 힘입어, 다크 모드 기능이 새롭게 추가되었습니다 🌙✨',
    sections: [
      {
        title: '✨ 신규 기능 내용',
        items: [
          '라이트 모드 ↔ 다크 모드 전환 가능',
          '시스템 설정과 연동되어, 휴대폰 모드에 맞춰 자동 전환 지원',
          '눈이 편안한 어두운 화면으로, 야간에도 집중도 높은 필사 경험 제공',
        ],
      },
      {
        title: '📱 이용 방법',
        items: ['[My page] → [테마] → 라이트 / 다크 / 시스템 중 선택'],
      },
    ],
    outro: [
      '낮에는 밝고 산뜻하게, 밤에는 차분하고 감성적으로. 이제는 상황에 맞는 화면 모드로 더욱 편안하게 필사를 즐겨보세요 💌',
      '감사합니다.',
      '- 필사팀 드림',
    ],
  },
  {
    slug: 'share-image-styles',
    title: '📢 공유 이미지 스타일 업데이트',
    date: '2025년 8월 5일',
    summary: '필사한 문장을 공유할 때 선택할 수 있는 이미지 스타일을 1개에서 10개로 확대했습니다.',
    image: releaseShareStyles,
    imageAlt: 'Fillsa 앱 공유 이미지 스타일 선택 화면',
    intro: '안녕하세요, 필사를 사랑해주시는 여러분 🙇‍♀️ 이제 필사한 문장을 지인들과 공유할 때, 더 다양한 이미지 스타일을 선택할 수 있게 되었습니다 🎨',
    sections: [
      {
        title: '✨ 업데이트 내용',
        items: [
          '기존 1개 스타일 → 10개 스타일로 확대',
          '감성적인 분위기부터 미니멀, 따뜻한 무드까지 다양하게 제공',
          '상황과 취향에 맞는 이미지로 공유 가능',
        ],
      },
      {
        title: '📱 이용 방법',
        items: ['[Home 화면] → [공유하기 버튼] → 공유하기 화면에서 원하는 스타일 선택'],
      },
    ],
    outro: [
      '이제는 취향에 맞게 다양한 이미지를 선택하여, 나만의 필사 기록을 더 멋지게 공유해보세요 💌',
      '감사합니다.',
      '- 필사팀 드림',
    ],
  },
  {
    slug: 'official-launch',
    title: '📢 필사(Fillsa) 정식 출시 안내',
    date: '2025년 7월 2일',
    summary: '하루 한 문장과 나만의 기록을 담는 Fillsa가 Android에 정식 출시되었습니다.',
    image: releaseLaunch,
    imageAlt: 'Google Play에서 다운로드할 수 있는 Fillsa 앱 출시 안내',
    intro: '안녕하세요, 필사를 사랑해주시는 여러분 🙇‍♀️ 드디어! 여러분께 정식으로 필사 앱 출시 소식을 전하게 되었습니다.',
    sections: [
      {
        title: '📱 출시 플랫폼',
        items: ['Android (구글 플레이스토어)', 'iOS는 추후 지원 예정입니다.'],
      },
      {
        title: '✨ 주요 기능',
        items: [
          '하루 한 문장, 나만의 기록 — 매일 한 문장의 명언을 직접 타이핑하며 필사할 수 있어요.',
          '손글씨 사진 업로드 기능 — 종이에 직접 필사한 손글씨를 사진으로 남겨보세요.',
          '내 기록 모아보기 — 내가 필사한 문장을 달력과 목록으로 다시 볼 수 있어요.',
          "좋아요와 공유 — 마음에 드는 명언은 '좋아요'로 저장하거나, 지인과 공유해보세요.",
        ],
      },
    ],
    outro: [
      '앞으로도 더 나은 경험을 제공하기 위해 꾸준히 업데이트해 나가겠습니다. 많은 관심과 응원 부탁드립니다 🙏',
      '감사합니다.',
      '- 필사팀 드림',
    ],
    downloadLink: true,
  },
]
