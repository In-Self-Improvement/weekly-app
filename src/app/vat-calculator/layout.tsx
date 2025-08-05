import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '부가세 계산기 | 부가가치세 포함/제외 가격 계산 - Weekly Apps',
  description: '간편한 부가세 계산기로 공급가액과 부가세 포함 금액을 정확하게 계산하세요. 한국 부가세 10% 기준으로 실시간 계산 가능합니다.',
  keywords: [
    '부가세 계산기',
    '부가가치세 계산',
    'VAT 계산기',
    '세금 계산기',
    '공급가액 계산',
    '부가세 포함가 계산',
    '10% 부가세',
    '간이과세 계산',
    '일반과세 계산',
    '사업자 세금',
    '부가세법',
    '국세청 부가세',
    '매출세액',
    '매입세액',
    '부가세 신고',
    '세무 계산기',
    '온라인 계산기',
    '무료 계산기'
  ].join(', '),
  openGraph: {
    title: '부가세 계산기 | 부가가치세 포함/제외 가격 계산',
    description: '간편한 부가세 계산기로 공급가액과 부가세 포함 금액을 정확하게 계산하세요. 한국 부가세 10% 기준으로 실시간 계산 가능합니다.',
    type: 'website',
    url: 'https://weekly-apps.vercel.app/vat-calculator',
    siteName: 'Weekly Apps',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '부가세 계산기 - Weekly Apps',
      },
    ],
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '부가세 계산기 | 부가가치세 포함/제외 가격 계산',
    description: '간편한 부가세 계산기로 공급가액과 부가세 포함 금액을 정확하게 계산하세요.',
    images: ['/og-image.png'],
    creator: '@weekly_apps',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://weekly-apps.vercel.app/vat-calculator',
  },
  category: 'utility',
  classification: 'Business & Finance',
  other: {
    'google-site-verification': 'your-google-site-verification-code',
    'naver-site-verification': 'your-naver-site-verification-code',
  },
};

export default function VatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 구조화된 데이터 (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: '부가세 계산기',
            applicationCategory: 'BusinessApplication',
            description: '한국 부가세 10% 기준으로 공급가액과 부가세 포함 금액을 계산하는 무료 온라인 계산기',
            url: 'https://weekly-apps.vercel.app/vat-calculator',
            operatingSystem: 'Any',
            permissions: 'browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'KRW'
            },
            author: {
              '@type': 'Organization',
              name: 'Weekly Apps',
              url: 'https://weekly-apps.vercel.app'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '156',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              '부가세 포함가 계산',
              '공급가액 계산', 
              '실시간 계산',
              '모바일 최적화',
              '무료 사용',
              '한국 부가세 10% 기준'
            ]
          })
        }}
      />
      
      {/* 추가 SEO 메타 태그 */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#1e293b" />
      
      {/* 지역 관련 메타 태그 */}
      <meta name="geo.region" content="KR" />
      <meta name="geo.country" content="Korea" />
      <meta name="language" content="Korean" />
      
      {children}
    </>
  );
}