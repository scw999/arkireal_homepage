/**
 * Project slug → sketch image mapping. Sketches are photo-derived, so we
 * never place them side-by-side with their source photo — only as hover
 * reveals, carousel alternates, process thumbnails, or stand-alone bands.
 *
 * Paths point at files in /public/images/sketch/ (Korean filenames are
 * served as-is; Next.js URL-encodes them automatically).
 */
export const projectSketches: Record<string, string> = {
  'hyangdong-archireal-mixed-use': '/images/sketch/아치리얼_스케치1.png',
  'beondong-mixed-use': '/images/sketch/번동상가주택_스케치3.png',
  'yeoju-jeombongdong-pum-house': '/images/sketch/점봉동_스케치4.png',
  'wonju-banggok-aurora-house': '/images/sketch/원주_스케치1.png',
  'yangpyeong-asolrinchae-house': '/images/sketch/양평_스케치1.png',
  'pocheon-damhwajae-stay': '/images/sketch/담화재_스케치1.png',
  'pocheon-damhwajae-cafe': '/images/sketch/담화재_스케치7.png',
  'wonju-poolstay': '/images/sketch/원주_풀스테이_스케치1.png',
  'yeongjongdo-skycity-second-house': '/images/sketch/인천_스케치2.png',
  'okcheon-maple-mixed-use': '/images/sketch/메이플동물병원_스케치1.png',
  'yeoju-gangcheon-naraejae-house': '/images/sketch/나래재_스케치1.png',
  'yeoju-gangcheon-gangsanjae-second-house': '/images/sketch/강산재_스케치2.png',
  'yeoju-hyeonamdong-courtyard-house': '/images/sketch/현암동_스케치4.png',
  'seosan-bluewalk-medium-type': '/images/sketch/파란산책_중형_스케치1.png',
  'seosan-bluewalk-small-type': '/images/sketch/파란산책_경형_스케치2.png',
};

export const processSketches: string[] = [
  '/images/sketch/양평_스케치3.png',
  '/images/sketch/파란산책_중형_스케치1-1.png',
  '/images/sketch/담화재_스케치3.png',
  '/images/sketch/나래재_스케치2.png',
  '/images/sketch/원주_스케치2.png',
];

export const bandSketches = {
  afterInterior: '/images/sketch/양평_스케치5.png',
  afterConcerns: '/images/sketch/원주_풀스테이_스케치3.png',
};

export const heroSketches = [
  '/images/sketch/강산재_스케치3.png',
  '/images/sketch/담화재_스케치4.png',
  '/images/sketch/인천_스케치4.png',
  '/images/sketch/점봉동_스케치1.png',
];
