import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBriefingById } from '@/lib/mockData';
import SendButtons from '@/components/SendButtons';

interface BriefingDetailPageProps {
  params: {
    id: string;
  };
}

export default function BriefingDetailPage({ params }: BriefingDetailPageProps) {
  const briefing = getBriefingById(params.id);

  if (!briefing) {
    notFound();
  }

  const formattedDate = new Date(briefing.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          대시보드로 돌아가기
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">{briefing.stockName}</h1>
            <span className="bg-dark-card border border-dark-border px-3 py-1 rounded-full text-sm font-semibold">
              {briefing.symbol}
            </span>
          </div>
          <p className="text-gray-400">{formattedDate}</p>
        </div>

        {/* 브리핑 이미지 */}
        <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden mb-6">
          <img
            src={briefing.imageUrl}
            alt={`${briefing.stockName} 브리핑`}
            className="w-full h-auto"
          />
        </div>

        {/* 리포트 텍스트 */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">브리핑 요약</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{briefing.summary}</p>

          {briefing.keyPoints && briefing.keyPoints.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">주요 포인트</h3>
              <ul className="space-y-2">
                {briefing.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-stock-up mt-1">•</span>
                    <span className="text-gray-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {briefing.newsSummary && (
            <div>
              <h3 className="text-xl font-semibold mb-3">뉴스 요약</h3>
              <p className="text-gray-300 leading-relaxed">{briefing.newsSummary}</p>
            </div>
          )}
        </div>

        {/* 발송 버튼 */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">브리핑 발송</h2>
          <p className="text-gray-400 mb-4">이메일 또는 Slack으로 브리핑을 발송할 수 있습니다.</p>
          <SendButtons briefingId={briefing.id} />
        </div>
      </div>
    </main>
  );
}

