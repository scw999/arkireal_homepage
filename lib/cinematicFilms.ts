/**
 * Curated cinematic completion films. Some map to existing project slugs,
 * others are upcoming / unlisted works that only live in this section.
 */
export type CinematicFilm = {
  id: string;           // YouTube video id
  title: string;        // short location + project title
  subtitle?: string;    // building type / secondary info
  slug?: string;        // linked project slug, if any
};

export const cinematicFilms: CinematicFilm[] = [
  { id: '6VyuYGZ7h7w', title: '양평 아솔린채',     subtitle: '단독주택',         slug: 'yangpyeong-asolrinchae-house' },
  { id: 'MIlOJE6KUVc', title: '향동 아치리얼',     subtitle: '상가주택',         slug: 'hyangdong-archireal-mixed-use' },
  { id: 'D5uNxF6FZTw', title: '원주 반곡동',       subtitle: '단독주택',         slug: 'wonju-banggok-aurora-house' },
  { id: 'UXiPlPV5ygk', title: '원주 행구동 풀빌라', subtitle: '숙박시설',         slug: 'wonju-poolstay' },
  { id: 'HBZixIJ6AD4', title: '여주 점봉동',       subtitle: '세컨하우스',       slug: 'yeoju-jeombongdong-pum-house' },
  { id: 'NuV3rzFoIDM', title: '여주 나래재',       subtitle: '단독주택',         slug: 'yeoju-gangcheon-naraejae-house' },
  { id: 'tOWqv5sZgA8', title: '이천 시옷하우스',   subtitle: '단독주택',         slug: 'mojeonri-siot-house' },
  { id: 'gxDPzb8pYSs', title: '파란산책 중형',     subtitle: '전원주택 타입',    slug: 'seosan-bluewalk-medium-type' },
  { id: 'mh5nhumZS4E', title: '영종도 스카이시티', subtitle: '세컨하우스',       slug: 'yeongjongdo-skycity-second-house' },
  // Upcoming / not yet registered as projects
  { id: 'NpNYwozuc54', title: '이천 합쳐진 나무',   subtitle: '단독주택' },
  { id: '6wnLH6K_yRw', title: '파주 롱브릭 하우스', subtitle: '단독주택' },
  { id: '0_dkfYmcTB4', title: '용인 럭셔리 세컨하우스', subtitle: '세컨하우스' },
];
