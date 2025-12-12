import StockCard from '@/components/StockCard';
import BriefingHistory from '@/components/BriefingHistory';
import CreateBriefingButton from '@/components/CreateBriefingButton';
import TopStocksComparison from '@/components/TopStocksComparison';
import { mockTopStock, mockBriefings, mockStockChartData, mockTop3Stocks } from '@/lib/mockData';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">당신이 잠든 사이</h1>
              <p className="text-gray-400">미국주식 데일리 브리핑 대시보드</p>
            </div>
            <CreateBriefingButton />
          </div>
        </div>

        {/* 오늘의 화제 종목 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">오늘의 화제 종목</h2>
          <StockCard stock={mockTopStock} isLarge={true} chartData={mockStockChartData} />
        </div>

        {/* 화제 종목 TOP 3 비교 */}
        <div className="mb-8">
          <TopStocksComparison stocks={mockTop3Stocks} />
        </div>

        {/* 최근 브리핑 히스토리 */}
        <BriefingHistory briefings={mockBriefings} />
      </div>
    </main>
  );
}

