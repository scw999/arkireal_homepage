import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: '아키리얼 종합건설 | 설계와 시공을 함께 책임지는 종합건설사',
  description:
    '부지 검토부터 설계, 시뮬레이션, 시공, 감리까지 한 흐름으로 진행하는 종합건설사 아키리얼. 짓기 전에 결과를 먼저 검토합니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
