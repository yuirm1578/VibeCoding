# 당신이 잠든 사이 - 대시보드

미국주식 투자자를 위한 데일리 브리핑 대시보드입니다.

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React 18**

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
.
├── app/
│   ├── briefing/[id]/     # 브리핑 상세 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 대시보드
├── components/
│   ├── BriefingCard.tsx   # 브리핑 카드 컴포넌트
│   ├── BriefingHistory.tsx # 브리핑 히스토리 컴포넌트
│   ├── CreateBriefingButton.tsx # 브리핑 생성 버튼
│   ├── SendButtons.tsx    # 발송 버튼 컴포넌트
│   └── StockCard.tsx      # 주식 카드 컴포넌트
└── lib/
    └── mockData.ts        # 목업 데이터
```

## 주요 기능

1. **메인 대시보드**
   - 오늘의 화제 종목 카드
   - 선정 기준 표시
   - 최근 브리핑 히스토리
   - 수동 브리핑 생성 버튼

2. **브리핑 상세 페이지**
   - 브리핑 이미지 미리보기
   - 리포트 텍스트
   - 이메일/Slack 발송 버튼

## 디자인 특징

- 다크 모드 기본
- 주식 상승(녹색)/하락(빨간색) 컬러 시스템
- 카드 기반 레이아웃
- 모바일 반응형 디자인

## 빌드

```bash
npm run build
```

## 배포

Vercel에 배포하는 것을 권장합니다:

```bash
npm install -g vercel
vercel
```

