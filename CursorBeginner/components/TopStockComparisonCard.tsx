import Link from 'next/link';
import { Stock } from '@/lib/mockData';

interface TopStockComparisonCardProps {
  stock: Stock;
  rank: number;
}

export default function TopStockComparisonCard({ stock, rank }: TopStockComparisonCardProps) {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-stock-up' : 'text-stock-down';
  const bgColor = isPositive ? 'bg-stock-up/10' : 'bg-stock-down/10';
  const borderColor = isPositive ? 'border-stock-up/30' : 'border-stock-down/30';

  const rankColors = [
    'bg-yellow-500 text-black', // 1위
    'bg-gray-400 text-black',   // 2위
    'bg-amber-700 text-white',  // 3위
  ];

  const rankBadgeColor = rankColors[rank - 1] || 'bg-gray-600 text-white';

  return (
    <Link href={`/stock/${stock.symbol}`}>
      <div
        className={`bg-dark-card border ${borderColor} rounded-lg p-6 transition-all hover:border-opacity-80 hover:shadow-xl hover:scale-[1.02] cursor-pointer group relative overflow-hidden`}
      >
        {/* 순위 뱃지 */}
        <div className="absolute top-4 right-4">
          <div className={`${rankBadgeColor} w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg`}>
            {rank}
          </div>
        </div>

        {/* 종목 정보 */}
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-1 group-hover:text-gray-200 transition-colors">
            {stock.name}
          </h3>
          <p className="text-gray-400 text-sm">{stock.symbol}</p>
        </div>

        {/* 주가 정보 */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-bold text-3xl">${stock.price.toFixed(2)}</span>
          </div>
          <div className={`font-semibold ${changeColor} text-lg`}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </div>
        </div>

        {/* 비교 항목 */}
        <div className="space-y-3 pt-4 border-t border-dark-border">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">거래량</span>
            <span className="font-semibold">{(stock.volume / 1000000).toFixed(2)}M</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">변동률</span>
            <span className={`font-semibold ${changeColor}`}>
              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">시장</span>
            <span className="font-semibold text-sm">
              {stock.marketState === 'REGULAR' ? '정규장' : 
               stock.marketState === 'PRE' ? '프리마켓' :
               stock.marketState === 'POST' ? '애프터마켓' : '휴장'}
            </span>
          </div>
        </div>

        {/* 호버 시 상세 정보 툴팁 */}
        <div className="mt-4 pt-4 border-t border-dark-border opacity-0 group-hover:opacity-100 transition-opacity">
          <div className={`${bgColor} rounded-lg p-3`}>
            <p className="text-xs text-gray-300 mb-1">선정 사유</p>
            <p className="text-sm font-semibold">{stock.selectionReason}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

