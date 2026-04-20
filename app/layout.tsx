import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ClientEffects } from '@/components/ClientEffects';

export const metadata: Metadata = {
  title: '아키리얼 종합건설 | 설계부터 시공까지, 한 팀이 끝까지 맡습니다',
  description:
    '부지 검토·설계·3D·VR 시뮬레이션·시공·감리까지 — 한 팀이 처음부터 끝까지 함께하는 종합건설사 아키리얼.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-bg text-fg">
        <ClientEffects />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
