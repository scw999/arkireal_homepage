'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { company } from '@/lib/company';

const navItems = [
  { label: '프로젝트', href: '/projects' },
  { label: '프로세스', href: '/#process' },
  { label: '기술 역량', href: '/#tech' },
  { label: '회사소개', href: '/about' },
  { label: '상담문의', href: '/contact' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line px-5 py-4 backdrop-blur-md md:px-8 lg:px-14"
        style={{ background: 'rgba(245,242,236,0.85)' }}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label={company.name}>
          <Image
            src="/images/brand/logo-color.png"
            alt={company.name}
            width={640}
            height={120}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 min-[900px]:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[14px] font-medium text-fg transition hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2.5 text-[13px] font-semibold text-bg transition hover:opacity-90"
          >
            상담 문의 →
          </Link>
          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(true)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-[22px] text-fg min-[900px]:hidden"
          >
            ≡
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[120] flex flex-col gap-6 bg-bg px-8 pb-10 pt-20">
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center text-[28px] text-fg"
          >
            ×
          </button>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-[24px] font-medium text-fg"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4 self-start"
          >
            상담 문의하기 →
          </Link>
        </div>
      ) : null}
    </>
  );
}
