import type { Metadata } from 'next';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: '상담문의 | 아키리얼 종합건설',
  description:
    '부지만 있으셔도, 설계만 있으셔도 괜찮습니다. 어느 단계든 편하게 문의하세요.',
};

const stages = ['부지만 있는 단계', '도면을 받은 단계', '시공사를 찾는 단계', '아직 결정 전'];
const useTypes = ['단독주택', '전원주택', '주택단지', '상가주택', '숙박시설', '상업공간', '기타'];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-paper-line bg-paper-warm">
        <div className="container-page py-20 md:py-24">
          <span className="eyebrow">CONTACT</span>
          <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.3] tracking-tightish text-ink md:text-[2.6rem]">
            어느 단계든, 편하게 문의하셔도 됩니다
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-[1.9] text-ink-muted md:text-[1.0625rem]">
            부지만 있으신 분, 도면을 받으신 분, 아직 아무것도 결정하지 않으신 분 — 모두 같은
            창구로 문의하실 수 있습니다. 건축 계획이 아직 구체적이지 않아도 괜찮습니다. 부지, 규모,
            용도, 예산에 대한 고민부터 함께 검토하실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="border-b border-paper-line">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1.3fr_1fr] md:py-24">
          <form className="grid gap-6" action="/api/contact" method="post">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="성함" required name="name" />
              <Field label="연락처" required name="phone" type="tel" />
              <Field label="이메일" name="email" type="email" />
              <Field label="부지 위치" name="site" placeholder="예: 경기도 여주시" />
            </div>

            <SelectField
              label="건축 용도"
              name="useType"
              options={useTypes}
              placeholder="선택해주세요"
            />

            <SelectField
              label="현재 단계"
              name="stage"
              options={stages}
              placeholder="선택해주세요"
            />

            <Field label="예상 일정" name="schedule" placeholder="예: 6개월 내 착공 희망" />

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-ink-muted" htmlFor="message">
                문의 내용
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="border border-paper-line bg-white p-4 text-[14.5px] text-ink outline-none transition focus:border-ink"
                placeholder="편하게 작성해주세요. 아직 구체적이지 않아도 괜찮습니다."
              />
            </div>

            <div className="flex items-start gap-3 border-t border-paper-line pt-6">
              <button type="submit" className="btn-primary">
                문의 보내기
              </button>
              <p className="text-[12.5px] leading-[1.8] text-ink-subtle">
                작성해주신 내용은 담당자가 검토 후 1~2영업일 안에 회신드립니다.
                <br />
                급하신 경우 전화로 직접 문의해주세요.
              </p>
            </div>
          </form>

          <aside className="flex flex-col gap-10">
            <div>
              <span className="eyebrow">DIRECT CONTACT</span>
              <h2 className="mt-4 text-[1.2rem] font-semibold text-ink">직접 연락</h2>
              <ul className="mt-6 space-y-4 text-[14px] text-ink-muted">
                <li>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle">전화</p>
                  <p className="mt-1 text-ink">{company.phone}</p>
                </li>
                <li>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle">이메일</p>
                  <p className="mt-1 text-ink">{company.email}</p>
                </li>
                <li>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ink-subtle">
                    상담 시간
                  </p>
                  <p className="mt-1 text-ink">평일 09:00 – 18:00</p>
                </li>
              </ul>
            </div>

            <div className="border border-paper-line bg-paper-warm p-6">
              <p className="text-[13.5px] leading-[1.9] text-ink-muted">
                클라이언트께서 모든 것을 정리한 뒤 문의하실 필요는 없습니다. 아키리얼은 첫 단계의
                고민부터 함께 검토해 보다 명확하고 신뢰할 수 있는 방향으로 건축 계획을 세울 수
                있도록 돕습니다.
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
      <label className="text-[12px] font-medium text-ink-muted" htmlFor={name}>
        {label}
        {required ? <span className="ml-1 text-ink">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-12 border border-paper-line bg-white px-4 text-[14.5px] text-ink outline-none transition focus:border-ink"
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
      <label className="text-[12px] font-medium text-ink-muted" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="h-12 border border-paper-line bg-white px-4 text-[14.5px] text-ink outline-none transition focus:border-ink"
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
