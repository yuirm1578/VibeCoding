import { Stock, StockChartData } from '@/lib/mockData';
import StockChart from './StockChart';

interface StockCardProps {
  stock: Stock;
  isLarge?: boolean;
  chartData?: StockChartData[];
}

export default function StockCard({ stock, isLarge = false, chartData }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? 'text-stock-up' : 'text-stock-down';
  const bgColor = isPositive ? 'bg-stock-up/10' : 'bg-stock-down/10';
  const borderColor = isPositive ? 'border-stock-up/30' : 'border-stock-down/30';

  return (
    <div
      className={`bg-dark-card border border-dark-border rounded-lg p-6 ${
        isLarge ? 'md:p-8' : 'p-4'
      } transition-all hover:border-dark-border/80`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className={`font-bold ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'} mb-1`}>
            {stock.name}
          </h2>
          <p className={`text-gray-400 ${isLarge ? 'text-lg' : 'text-sm'}`}>
            {stock.symbol}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${bgColor} ${changeColor}`}>
          {stock.selectionReason}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className={`font-bold ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
            ${stock.price.toFixed(2)}
          </span>
          <span className={`font-semibold ${changeColor} ${isLarge ? 'text-xl' : 'text-lg'}`}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-border">
          <div>
            <p className="text-gray-400 text-sm mb-1">거래량</p>
            <p className={`font-semibold ${isLarge ? 'text-lg' : 'text-base'}`}>
              {stock.volume.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">시장 상태</p>
            <p className={`font-semibold ${isLarge ? 'text-lg' : 'text-base'}`}>
              {stock.marketState === 'REGULAR' ? '정규장' : 
               stock.marketState === 'PRE' ? '프리마켓' :
               stock.marketState === 'POST' ? '애프터마켓' : '휴장'}
            </p>
          </div>
        </div>
      </div>

      {/* 차트 섹션 */}
      {chartData && chartData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-dark-border">
          <h3 className="text-lg font-semibold mb-2">최근 5일 주가 추이</h3>
          <StockChart data={chartData} isPositive={isPositive} />
        </div>
      )}
    </div>
  );
}

