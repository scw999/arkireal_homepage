'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { company } from '@/lib/company';

const navItems: { label: string; href: string }[] = [
  { label: '홈', href: '/' },
  { label: '프로젝트', href: '/projects' },
  { label: '회사소개', href: '/about' },
  { label: '상담문의', href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-paper-line bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label={company.name}>
          <Image
            src="/images/brand/logo-color.png"
            alt={company.name}
            width={640}
            height={120}
            priority
            className="h-9 w-auto md:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition hover:text-ink ${
                isActive(item.href) ? 'text-ink' : 'text-ink-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${company.phone.replace(/[^0-9]/g, '')}`}
            className="text-sm font-medium text-ink-muted"
          >
            T. {company.phone}
          </a>
          <Link href="/contact" className="btn-primary h-10 px-5 text-[13px]">
            상담 문의하기
          </Link>
        </div>

        <Link href="/contact" className="btn-primary h-10 px-4 text-[13px] md:hidden">
          상담
        </Link>
      </div>

      <div className="border-t border-paper-line md:hidden">
        <nav className="container-page flex items-center justify-between py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-medium ${
                isActive(item.href) ? 'text-ink' : 'text-ink-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
