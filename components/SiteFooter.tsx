import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/lib/company';

export function SiteFooter() {
  return (
    <footer className="border-t border-paper-line bg-paper-warm">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Image
            src="/images/brand/logo-color.png"
            alt={company.name}
            width={640}
            height={120}
            className="mb-5 h-10 w-auto"
          />
          <p className="text-sm font-semibold tracking-tightish text-ink">{company.legalName}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{company.descriptor}</p>

          <dl className="mt-6 space-y-1.5 text-[13px] text-ink-muted">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-ink-subtle">{company.licenseLabel}</dt>
              <dd>{company.licenseNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-ink-subtle">{company.businessRegLabel}</dt>
              <dd>{company.businessRegNumber}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-ink-subtle">대표자</dt>
              <dd>{company.representative}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-ink-subtle">본사 주소</dt>
              <dd>{company.address}</dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-[13px] text-ink-muted">
            <li>T. {company.phone}</li>
            <li>E. {company.email}</li>
            <li>상담 가능 시간: 평일 09:00 – 18:00</li>
          </ul>
          <Link
            href="/contact"
            className="mt-6 inline-flex text-[13px] font-medium text-ink underline underline-offset-4"
          >
            상담 문의 바로가기 →
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            Sitemap
          </p>
          <ul className="mt-4 space-y-2 text-[13px] text-ink-muted">
            <li>
              <Link href="/">홈</Link>
            </li>
            <li>
              <Link href="/projects">프로젝트</Link>
            </li>
            <li>
              <Link href="/about">회사소개</Link>
            </li>
            <li>
              <Link href="/contact">상담문의</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 text-[12px] text-ink-subtle md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <p>설계와 시공을 함께 책임지는 종합건설사</p>
        </div>
      </div>
    </footer>
  );
}
