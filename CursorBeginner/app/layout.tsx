import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '당신이 잠든 사이 - 미국주식 데일리 브리핑',
  description: '미국주식 투자자를 위한 데일리 브리핑 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}

