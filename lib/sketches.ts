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

// One image per PROCESS step, drawn from the 12-stage technical pipeline
// in /public/images/process/ so the section mirrors the real work order:
// 01 도면/계획 → 02 드론 토지 분석 → 03 3D 렌더링(완성 미리보기)
// → 04 3D 자재 시뮬레이션 → 05 시공 현장.
export const processSketches: string[] = [
  '/images/process/7.plan.png',
  '/images/process/1.drone.png',
  '/images/process/8.3d_rendering.png',
  '/images/process/4.3d_designm.png',
  '/images/process/11.construction.png',
];

/**
 * Multi-image variant of processSketches. Steps 01-02 stay light (1 photo
 * each) because 자금 / 부지 don't need visual proof; 03-05 go heavy so
 * 설계 · 시공 · 감리 get the real weight the user asked for.
 * `main` drives the hero frame; `gallery` becomes a thumbnail strip.
 */
export const processMedia: { main: string; gallery?: string[] }[] = [
  // 01 자금 — plan/blueprint alone keeps the step text-led
  { main: '/images/process/7.plan.png' },
  // 02 부지 — drone + 조망 체크
  {
    main: '/images/process/1.drone.png',
    gallery: ['/images/process/2.view_check.png'],
  },
  // 03 완성 모습 — 렌더링 2장 + VR 1장
  {
    main: '/images/process/8.3d_rendering.png',
    gallery: [
      '/images/process/9.3d_rendering.png',
      '/images/process/10.VR.png',
    ],
  },
  // 04 자재 시뮬 — 3D 디자인 4장(자재 배치별)
  {
    main: '/images/process/4.3d_designm.png',
    gallery: [
      '/images/process/3.3d_designm.png',
      '/images/process/5.3d_designm.png',
      '/images/process/6.3d_designm.png',
    ],
  },
  // 05 시공·감리 — 현장 전 과정 (기초 → 골조 → 외장 → 마감 → 완공). 있는 거 전부.
  {
    main: '/images/process/11.construction.png',
    gallery: [
      '/images/process/11.construction2.png',
      '/images/process/11.construction3.png',
      '/images/process/11.construction4.png',
      '/images/process/11.construction5.png',
      '/images/process/11.construction6.png',
      '/images/process/11.construction7.png',
      '/images/process/11.construction8.png',
      '/images/process/11.construction9.png',
      '/images/process/11.construction10.png',
      '/images/process/11.construction11.png',
      '/images/process/11.construction12.png',
      '/images/process/11.construction13.png',
      '/images/process/11.construction14.png',
      '/images/process/11.construction15.png',
      '/images/process/12.complete.png',
    ],
  },
];

/** Process photo bound to each TECH card in the Design-to-Reality section. */
export const techImages: Record<string, string> = {
  BIM: '/images/process/3.3d_designm.png',
  '3D/VR': '/images/process/10.VR.png',
  DRONE: '/images/process/1.drone.png',
  MATERIAL: '/images/process/6.3d_designm.png',
  SUPERVISION: '/images/process/11.construction8.png',
  BRAND: '/images/process/12.complete.png',
};

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
