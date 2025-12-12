import Link from 'next/link';
import { mockTop3Stocks } from '@/lib/mockData';
import { notFound } from 'next/navigation';

interface StockDetailPageProps {
  params: {
    symbol: string;
  };
}

export default function StockDetailPage({ params }: StockDetailPageProps) {
  const stock = mockTop3Stocks.find(s => s.symbol === params.symbol);

  if (!stock) {
    notFound();
  }

  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-stock-up' : 'text-stock-down';
  const bgColor = isPositive ? 'bg-stock-up/10' : 'bg-stock-down/10';

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          대시보드로 돌아가기
        </Link>

        {/* Stock Header */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{stock.name}</h1>
              <p className="text-gray-400 text-xl">{stock.symbol}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${bgColor}`}>
              <span className="text-sm text-gray-400">선정 사유</span>
              <p className="font-semibold mt-1">{stock.selectionReason}</p>
            </div>
          </div>

          {/* Price Info */}
          <div className="mb-6">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="font-bold text-5xl">${stock.price.toFixed(2)}</span>
              <span className={`font-semibold text-2xl ${changeColor}`}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)}
              </span>
            </div>
            <div className={`font-semibold text-xl ${changeColor}`}>
              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-dark-border">
            <div>
              <p className="text-gray-400 text-sm mb-2">거래량</p>
              <p className="font-bold text-xl">{stock.volume.toLocaleString()}</p>
              <p className="text-gray-400 text-xs mt-1">{(stock.volume / 1000000).toFixed(2)}M</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">시장 상태</p>
              <p className="font-bold text-xl">
                {stock.marketState === 'REGULAR' ? '정규장' : 
                 stock.marketState === 'PRE' ? '프리마켓' :
                 stock.marketState === 'POST' ? '애프터마켓' : '휴장'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">변동</p>
              <p className={`font-bold text-xl ${changeColor}`}>
                {isPositive ? '▲' : '▼'} {Math.abs(stock.changePercent).toFixed(2)}%
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder for future content */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">상세 정보</h2>
          <p className="text-gray-400">
            {stock.symbol}에 대한 상세 정보가 곧 추가될 예정입니다.
          </p>
        </div>
      </div>
    </main>
  );
}

