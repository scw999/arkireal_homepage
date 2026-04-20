import Image from 'next/image';
import { company } from '@/lib/company';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg px-5 pb-9 pt-12 md:px-8 lg:px-14">
      <div className="mx-auto grid w-full max-w-page grid-cols-2 gap-8 text-[13px] leading-[1.8] text-fg-mute md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/brand/logo-color.png"
            alt={company.name}
            width={640}
            height={120}
            className="mb-3 h-7 w-auto"
          />
          <p>{company.descriptor}</p>
        </div>
        <div>
          <strong className="mb-1 block font-semibold text-fg">대표</strong>
          {company.representative}
          <br />
          면허 {company.licenseNumber}
        </div>
        <div>
          <strong className="mb-1 block font-semibold text-fg">Contact</strong>
          T. {company.phone}
        </div>
        <div>
          <strong className="mb-1 block font-semibold text-fg">본사</strong>
          {company.address}
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-page border-t border-line pt-5 font-mono text-[12px] tracking-mono text-fg-mute">
        © {new Date().getFullYear()} {company.legalName}. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
