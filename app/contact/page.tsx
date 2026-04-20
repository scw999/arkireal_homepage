import type { Metadata } from 'next';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: '상담문의 | 아키리얼 종합건설',
  description:
    '부지만 있으셔도, 설계만 있으셔도 괜찮습니다. 어느 단계든 편하게 문의하세요.',
};

const USE_TYPES = [
  '단독주택',
  '전원주택',
  '주택단지',
  '상가주택',
  '세컨하우스',
  '숙박시설',
  '상업공간',
  '기타',
];

const BUDGET_RANGES = [
  '~ 3억',
  '3억 ~ 5억',
  '5억 ~ 10억',
  '10억 ~ 20억',
  '20억 이상',
  '아직 미정',
];

const STAGES = ['부지만 있는 단계', '도면을 받은 단계', '시공사를 찾는 단계', '아직 결정 전'];

type Props = {
  searchParams?: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const sp = (await searchParams) ?? {};
  const sent = sp.sent === '1';
  const error = sp.error;

  return (
    <>
      {/* Hero */}
      <section
        className="border-b border-line"
        style={{ padding: '120px clamp(20px, 5vw, 60px) 56px' }}
      >
        <div className="mx-auto max-w-page">
          <div className="eyebrow mb-4">— Contact</div>
          <h1
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.04,
              fontSize: 'clamp(36px, 6vw, 84px)',
              margin: 0,
              textWrap: 'balance',
            }}
          >
            어디부터 <span className="em-serif">시작</span>해야 할지
            <br />
            몰라도 괜찮습니다.
          </h1>
          <p className="body-copy mt-6 max-w-[680px]">
            부지만 있으신 분도, 도면을 받으신 분도,{' '}
            <span className="em-hl">아직 아무것도 결정하지 못하신 분</span>도 같은 창구로
            문의하실 수 있습니다. 부지·규모·용도·예산에 대한 고민부터 함께 검토합니다.
          </p>
        </div>
      </section>

      {/* Form + info */}
      <section className="pad-tight">
        <div className="mx-auto grid max-w-page gap-14 md:grid-cols-[1.3fr_1fr]">
          <form className="grid gap-6" action="/api/contact" method="post">
            {sent ? (
              <div
                className="rounded-[6px] border-l-[3px] border-accent bg-bg-alt px-5 py-4 text-[14px] text-fg"
                role="status"
              >
                <strong className="font-semibold">문의가 접수되었습니다.</strong>
                <span className="ml-1 text-fg-mute">
                  담당자가 검토 후 1~2영업일 안에 회신드리겠습니다.
                </span>
              </div>
            ) : null}
            {error ? (
              <div
                className="rounded-[6px] border-l-[3px] border-[#b94a3c] bg-bg-alt px-5 py-4 text-[14px] text-fg"
                role="alert"
              >
                <strong className="font-semibold">전송에 실패했습니다.</strong>
                <span className="ml-1 text-fg-mute">
                  {error === 'invalid'
                    ? '성함과 연락처를 입력해주세요.'
                    : `잠시 후 다시 시도하시거나 ${company.phone}으로 전화 주세요.`}
                </span>
              </div>
            ) : null}
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="성함" required name="name" />
              <Field label="연락처" required name="phone" type="tel" />
              <Field label="이메일" name="email" type="email" />
              <Field
                label="부지 위치"
                name="site"
                placeholder="예: 경기도 여주시"
              />
            </div>

            <SelectField
              label="건축 용도"
              name="useType"
              options={USE_TYPES}
              placeholder="선택해주세요"
            />

            <SelectField
              label="예산 범위"
              name="budget"
              options={BUDGET_RANGES}
              placeholder="선택해주세요"
            />

            <SelectField
              label="현재 단계"
              name="stage"
              options={STAGES}
              placeholder="선택해주세요"
            />

            <div className="flex flex-col gap-2">
              <label
                className="font-mono text-[11px] tracking-mono text-fg-mute"
                htmlFor="message"
              >
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="border border-line bg-bg p-4 text-[14.5px] text-fg outline-none transition focus:border-fg"
                placeholder="편하게 작성해주세요. 아직 구체적이지 않아도 괜찮습니다."
              />
            </div>

            <div className="flex flex-col items-start gap-3 border-t border-line pt-6 md:flex-row md:items-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-white transition hover:opacity-90"
                style={{
                  padding: '14px 26px',
                  background: '#2F4A38',
                  borderRadius: 2,
                }}
              >
                문의 보내기 →
              </button>
              <p className="text-[12.5px] leading-[1.7] text-fg-mute">
                작성해주신 내용은 담당자가 검토 후 1~2영업일 안에 회신드립니다.
                <br />
                급하신 경우 전화로 직접 문의해주세요.
              </p>
            </div>
          </form>

          <aside className="flex flex-col gap-10">
            <div>
              <div className="eyebrow mb-4">— Direct Contact</div>
              <ul className="space-y-5 text-[14.5px]">
                <li>
                  <div className="font-mono text-[11px] tracking-mono text-fg-mute">
                    전화
                  </div>
                  <div className="mt-1 text-fg">T. {company.phone}</div>
                </li>
                <li>
                  <div className="font-mono text-[11px] tracking-mono text-fg-mute">
                    본사
                  </div>
                  <div className="mt-1 text-fg">{company.address}</div>
                </li>
                <li>
                  <div className="font-mono text-[11px] tracking-mono text-fg-mute">
                    상담 시간
                  </div>
                  <div className="mt-1 text-fg">평일 09:00 – 18:00</div>
                </li>
              </ul>
            </div>

            <div
              className="rounded-[10px] border-t-2 border-accent bg-bg-alt"
              style={{ padding: '28px 24px' }}
            >
              <p className="body-copy text-fg">
                모든 것을 정리한 뒤 문의하실 필요는 없습니다. 아키리얼은{' '}
                <span className="em-hl">첫 단계의 고민</span>부터 함께 검토해, 명확하고
                신뢰할 수 있는 방향으로 계획을 잡도록 돕습니다.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-[11px] tracking-mono text-fg-mute"
        htmlFor={name}
      >
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 border border-line bg-bg px-4 text-[14.5px] text-fg outline-none transition focus:border-fg"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-[11px] tracking-mono text-fg-mute"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="h-12 border border-line bg-bg px-4 text-[14.5px] text-fg outline-none transition focus:border-fg"
      >
        <option value="" disabled>
          {placeholder ?? '선택해주세요'}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
