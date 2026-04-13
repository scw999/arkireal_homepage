/**
 * "3D 디자인 → 실제 시공" — Arkireal's strongest differentiator.
 * Full-width video comparing 3D design with actual build, plus the
 * tech pipeline grid showing every tool used before construction.
 */

const techStack = [
  {
    label: 'BIM 설계',
    body: '건물 정보를 3D로 통합 관리하여 간섭과 오류를 시공 전에 잡습니다.',
  },
  {
    label: '3D 모델링 · VR 투어',
    body: '스케치업으로 공간을 만들고, VR로 미리 걸어볼 수 있습니다.',
  },
  {
    label: '드론 합성',
    body: '토지를 드론으로 촬영하고, 설계한 건물을 합성하여 완성된 모습을 미리 봅니다.',
  },
  {
    label: '자재 시뮬레이션',
    body: '인테리어 자재를 실제로 배치한 3D 영상으로 마감 결과를 확인합니다.',
  },
  {
    label: '3D 프린터 모형',
    body: '필요시 건물 모형을 3D 프린터로 제작하여 입체적으로 검토합니다.',
  },
  {
    label: '디자인 감리',
    body: '설계자가 직접 현장을 방문하여 디자인 의도대로 시공되는지 확인합니다.',
  },
];

export function DesignToReality() {
  return (
    <section className="border-b border-paper-line bg-ink text-white">
      <div className="container-page py-20 md:py-28">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
          Design to Reality
        </p>
        <h2 className="mt-4 text-[1.95rem] font-semibold leading-[1.22] tracking-tightish md:text-[2.7rem]">
          3D로 디자인한 그대로,
          <br />
          현장에서 구현합니다.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.9] text-white/75 md:text-[1.0625rem]">
          아키리얼은 BIM과 3D 모델링, VR 시뮬레이션, 드론 합성, 3D 프린터 모형까지
          활용하여 짓기 전에 완성된 건물을 먼저 보여드립니다. 설계 의도가 시공 결과까지
          그대로 이어지도록 디자인 감리까지 직접 합니다.
        </p>

        {/* 3D design vs actual build comparison — full width */}
        <div className="mt-12 aspect-video w-full overflow-hidden bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/pZ-Q6uQaud4?rel=0&modestbranding=1"
            title="3D 디자인 vs 실제 시공 비교"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        {/* Tech pipeline grid */}
        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((item) => (
            <div key={item.label} className="border-t border-white/15 pt-5">
              <h3 className="text-[1rem] font-semibold leading-snug">{item.label}</h3>
              <p className="mt-3 text-[13.5px] leading-[1.85] text-white/65">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
