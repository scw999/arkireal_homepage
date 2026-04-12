# Arkireal Homepage

아키리얼 종합건설의 새 메인 홈페이지 프로젝트입니다.

이 프로젝트는 기존 워드프레스 테마를 직접 수정하는 방식이 아니라,  
별도의 프론트엔드 홈페이지를 새로 구축하는 방식으로 진행합니다.

초기 버전은 정적 데이터 기반으로 빠르게 구현하고,  
이후 워드프레스 REST API와 연동할 수 있도록 구조를 분리하는 것을 목표로 합니다.

---

## 프로젝트 목표

- `arkireal.com`의 메인 홈페이지를 새롭게 구축
- 기존 워드프레스는 `/wordpress` 경로에서 CMS/관리용으로 유지
- 신뢰감 있는 한국형 종합건설사 홈페이지 구축
- 프로젝트 중심의 카탈로그형 UI 구현
- 향후 워드프레스 포트폴리오 연동 가능 구조 설계

---

## 핵심 방향

이 사이트는 다음 인상을 주어야 합니다.

### 1차 인상
- 믿을 수 있는 종합건설사
- 책임감 있고 안정적인 회사
- 실제 시공을 잘 이해하는 회사

### 2차 인상
- 설계와 시공을 함께 보는 회사
- 결과를 더 잘 예측하게 도와주는 회사
- 디자인 감도와 완성도를 함께 갖춘 회사

즉,  
**“신뢰성 있는 시공회사”가 먼저,  
“설계와 디자인까지 이해하는 회사”가 그 다음**이어야 합니다.

---

## 기술 스택

- Next.js
- TypeScript
- App Router
- JSON / TypeScript data layer
- 추후 WordPress REST API 연동 예정
- Vercel 배포 기준

---

## 페이지 구성

- Home
- Projects
- Project Detail
- About
- Contact

---

## 홈 화면 핵심 섹션

1. Hero  
2. 회사 소개 / 포지셔닝  
3. 고객 문제 섹션  
4. 아키리얼의 해결 방식  
5. 역량 / 준비 방식  
6. 대표 프로젝트  
7. 신뢰 섹션  
8. 상담 유도 CTA

---

## 로컬 실행

```
npm install
npm run dev
```

개발 서버는 http://localhost:3000 에서 실행됩니다.

---

## 프로젝트 구조

```
app/
  layout.tsx              글로벌 레이아웃 (Header/Footer)
  page.tsx                홈 (Hero → 포지셔닝 → 불안 → 해결 → 준비 → 프로젝트 → 신뢰 → CTA)
  projects/
    page.tsx              프로젝트 목록 (카테고리 필터)
    [slug]/page.tsx       프로젝트 상세 (v1 간소화 버전)
  about/page.tsx          회사소개 + 4가지 원칙 + 회사 정보
  contact/page.tsx        상담문의 폼 + 직통 연락
components/
  SiteHeader.tsx
  SiteFooter.tsx
  SectionHeader.tsx
  ProjectCard.tsx
lib/
  company.ts              회사 정보 (면허/주소/연락처)
  projects.ts             프로젝트 로더 (소스 무관 API)
  projectMapper.ts        raw → Project 매퍼
  wordpress.ts            v2용 REST API 로더 (스텁)
  types.ts                Project / Hero 타입 정의
data/
  projects.json           프로젝트 데이터 (WordPress에서 추출 + 큐레이션)
  sections.json           홈 섹션 데이터 (레거시)
public/images/projects/   실제 WordPress 업로드에서 복사한 프로젝트 이미지
```

---

## 프로젝트 데이터

1차 구축에서는 로컬 JSON (`data/projects.json`)을 소스로 사용합니다.
UI는 `lib/projects.ts`를 통해 접근하므로 데이터 소스가 바뀌어도 UI는 동일합니다.

### 실제 데이터 추출 결과

`C:\Users\scw99\work\arkireal_homepage\wordpress_content\buildtree.sql`의
WordPress SQL 덤프를 파싱해 다음을 확인했습니다.

- post_type: `portfolio-item` (hiroshi-core 플러그인)
- publish 상태 포트폴리오: 134개 (데모 포함)
- 한국어 제목 실제 프로젝트: 33개
- 큐레이션 대상 10개 프로젝트의 실제 대표 이미지 + 갤러리 이미지를 `public/images/projects/{slug}/` 경로로 복사 완료

본문 텍스트는 `content.md`의 금지 표현과 톤 규칙에 맞춰 이미 큐레이션된 `data/projects.json`을 유지했습니다.
(WordPress 본문에는 "럭셔리", "꿈의", "모던" 등 금지 표현이 포함되어 있어 그대로 쓰지 않았습니다.)

프로젝트 데이터 구조 예시:

```json
{
  "id": 1,
  "slug": "yeoju-second-house-village",
  "title": "여주 세컨하우스 주택단지",
  "region": "경기도 여주",
  "type": "주택단지",
  "summary": "자연 환경과 조화를 이루도록 계획한 전원형 주택단지 프로젝트",
  "description": "프로젝트 상세 설명",
  "featuredImage": "/images/projects/example/main.jpg",
  "gallery": [
    "/images/projects/example/01.jpg",
    "/images/projects/example/02.jpg"
  ],
  "keyPoints": [
    "핵심 포인트 1",
    "핵심 포인트 2",
    "핵심 포인트 3"
  ],
  "year": "2024",
  "scope": "설계, 시공",
  "status": "완료"
}
