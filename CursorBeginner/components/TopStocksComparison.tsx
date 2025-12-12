import { Stock } from '@/lib/mockData';
import TopStockComparisonCard from './TopStockComparisonCard';

interface TopStocksComparisonProps {
  stocks: Stock[];
}

export default function TopStocksComparison({ stocks }: TopStocksComparisonProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">화제 종목 TOP 3</h2>
        <p className="text-gray-400 text-sm">오늘 가장 활발하게 거래된 상위 3개 종목을 비교해보세요</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.slice(0, 3).map((stock, index) => (
          <TopStockComparisonCard 
            key={stock.symbol} 
            stock={stock} 
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

