import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const CONTACT_TO = process.env.CONTACT_EMAIL || 'scw999@gmail.com';
const CONTACT_FROM = process.env.CONTACT_FROM || 'Arkireal Contact <onboarding@resend.dev>';

function escape(v: FormDataEntryValue | null): string {
  const s = typeof v === 'string' ? v : '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const f = {
    name: escape(form.get('name')),
    phone: escape(form.get('phone')),
    email: escape(form.get('email')),
    site: escape(form.get('site')),
    useType: escape(form.get('useType')),
    budget: escape(form.get('budget')),
    stage: escape(form.get('stage')),
    message: escape(form.get('message')),
  };

  const origin = req.nextUrl.origin;

  if (!f.name || !f.phone) {
    return NextResponse.redirect(new URL('/contact?error=invalid', origin), 303);
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Plain-text fallback for logs / no-key environments
  const plain = [
    `성함: ${f.name}`,
    `연락처: ${f.phone}`,
    `이메일: ${f.email || '-'}`,
    `부지 위치: ${f.site || '-'}`,
    `건축 용도: ${f.useType || '-'}`,
    `예산 범위: ${f.budget || '-'}`,
    `현재 단계: ${f.stage || '-'}`,
    '',
    '문의 내용:',
    f.message || '-',
  ].join('\n');

  // Link-spam bots submit through this form. Three cheap signals, any one is enough:
  // the honeypot field (invisible to humans), Cyrillic text, or a payload stuffed
  // with links. Real inquiries here are Korean and rarely carry even one URL.
  const spam =
    !!form.get('company_site') ||
    /[Ѐ-ӿ]/.test(plain) ||
    (plain.match(/https?:\/\//g) ?? []).length >= 2;

  if (spam) {
    console.warn('[contact] blocked as spam:\n' + plain);
    return NextResponse.redirect(new URL('/contact?error=send', origin), 303);
  }

  // Turnstile runs after the free checks above, since it costs a network call.
  // It fails open: a Cloudflare outage or a missing secret must not swallow a
  // real inquiry, and the honeypot still covers the simple bots.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (turnstileSecret) {
    try {
      const verify = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: String(form.get('cf-turnstile-response') ?? ''),
          }),
        },
      );
      const outcome = await verify.json();

      if (!outcome.success) {
        console.warn('[contact] Turnstile rejected:', outcome['error-codes'], '\n' + plain);
        return NextResponse.redirect(new URL('/contact?error=send', origin), 303);
      }
    } catch (err) {
      console.error('[contact] Turnstile check failed, allowing through:', err);
    }
  } else {
    console.error('[contact] TURNSTILE_SECRET_KEY not set — honeypot only');
  }

  if (!apiKey) {
    // Key missing — the mail can't be sent, so don't tell the visitor it was
    // received. Log it and show the error state with the phone fallback.
    console.error('[contact] RESEND_API_KEY not set — submission NOT delivered:\n' + plain);
    return NextResponse.redirect(new URL('/contact?error=send', origin), 303);
  }

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; line-height:1.6; color:#14130e;">
      <h2 style="margin:0 0 12px;font-size:18px;">새 상담 문의</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">성함</td><td>${f.name}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">연락처</td><td>${f.phone}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">이메일</td><td>${f.email || '-'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">부지 위치</td><td>${f.site || '-'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">건축 용도</td><td>${f.useType || '-'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">예산 범위</td><td>${f.budget || '-'}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6f6b61;">현재 단계</td><td>${f.stage || '-'}</td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:15px;">문의 내용</h3>
      <div style="white-space:pre-wrap;padding:12px;background:#f5f2ec;border-radius:4px;">${f.message || '-'}</div>
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        reply_to: f.email || undefined,
        subject: `[아키리얼 문의] ${f.name}${f.useType ? ` · ${f.useType}` : ''}`,
        html,
        text: plain,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[contact] Resend error:', res.status, errText);
      return NextResponse.redirect(new URL('/contact?error=send', origin), 303);
    }
  } catch (err) {
    console.error('[contact] send failed:', err);
    return NextResponse.redirect(new URL('/contact?error=send', origin), 303);
  }

  return NextResponse.redirect(new URL('/contact?sent=1', origin), 303);
}
