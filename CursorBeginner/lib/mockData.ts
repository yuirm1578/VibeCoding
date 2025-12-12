export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketState: string;
  selectionReason: string;
}

export interface Briefing {
  id: string;
  symbol: string;
  stockName: string;
  status: 'completed' | 'processing';
  createdAt: string;
  completedAt?: string;
  imageUrl: string;
  summary: string;
  keyPoints: string[];
  newsSummary?: string;
}

export interface StockChartData {
  date: string;
  price: number;
  volume: number;
}

export const mockTopStock: Stock = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 175.43,
  change: 2.15,
  changePercent: 1.24,
  volume: 45234567,
  marketState: 'REGULAR',
  selectionReason: '거래량 1위',
};

export const mockTop3Stocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45234567,
    marketState: 'REGULAR',
    selectionReason: '거래량 1위',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 245.67,
    change: -3.21,
    changePercent: -1.29,
    volume: 38923456,
    marketState: 'REGULAR',
    selectionReason: '거래량 2위',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 485.23,
    change: 11.60,
    changePercent: 2.45,
    volume: 32145678,
    marketState: 'REGULAR',
    selectionReason: '거래량 3위',
  },
];

export const mockBriefings: Briefing[] = [
  {
    id: 'brief_20241215_143000',
    symbol: 'AAPL',
    stockName: 'Apple Inc.',
    status: 'completed',
    createdAt: '2024-12-15T14:30:00Z',
    completedAt: '2024-12-15T14:30:15Z',
    imageUrl: 'https://picsum.photos/seed/aapl/800/600',
    summary: 'Apple Inc. (AAPL)는 오늘 거래량 45,234,567주로 가장 활발하게 거래되었습니다. 현재가 $175.43로 전일 대비 1.24% 상승했습니다.',
    keyPoints: [
      '거래량 급증: 평균 대비 86% 증가',
      '가격 상승: $173.28 → $175.43 (+1.24%)',
      '시가총액: $2.73조',
    ],
    newsSummary: '최근 뉴스에서 새로운 iPhone 기능 발표와 강한 실적 발표가 주목받고 있습니다.',
  },
  {
    id: 'brief_20241214_143000',
    symbol: 'TSLA',
    stockName: 'Tesla, Inc.',
    status: 'completed',
    createdAt: '2024-12-14T14:30:00Z',
    completedAt: '2024-12-14T14:30:18Z',
    imageUrl: 'https://picsum.photos/seed/tsla/800/600',
    summary: 'Tesla, Inc. (TSLA)는 거래량 38,923,456주로 두 번째로 활발하게 거래되었습니다. 현재가 $245.67로 전일 대비 1.29% 하락했습니다.',
    keyPoints: [
      '거래량 증가: 평균 대비 72% 증가',
      '가격 하락: $248.88 → $245.67 (-1.29%)',
      '시가총액: $7,800억',
    ],
    newsSummary: '전기차 시장 경쟁 심화와 관련된 뉴스가 주목받고 있습니다.',
  },
  {
    id: 'brief_20241213_143000',
    symbol: 'NVDA',
    stockName: 'NVIDIA Corporation',
    status: 'completed',
    createdAt: '2024-12-13T14:30:00Z',
    completedAt: '2024-12-13T14:30:12Z',
    imageUrl: 'https://picsum.photos/seed/nvda/800/600',
    summary: 'NVIDIA Corporation (NVDA)는 거래량 32,145,678주로 세 번째로 활발하게 거래되었습니다. 현재가 $485.23으로 전일 대비 2.45% 상승했습니다.',
    keyPoints: [
      '거래량 증가: 평균 대비 95% 증가',
      '가격 상승: $473.63 → $485.23 (+2.45%)',
      '시가총액: $1.2조',
    ],
    newsSummary: 'AI 칩 수요 증가와 관련된 긍정적 뉴스가 주목받고 있습니다.',
  },
];

export const mockStockChartData: StockChartData[] = [
  {
    date: '12/08',
    price: 171.25,
    volume: 38450000,
  },
  {
    date: '12/09',
    price: 172.80,
    volume: 41230000,
  },
  {
    date: '12/10',
    price: 170.95,
    volume: 39870000,
  },
  {
    date: '12/11',
    price: 173.28,
    volume: 42150000,
  },
  {
    date: '12/12',
    price: 175.43,
    volume: 45234567,
  },
];

export const getBriefingById = (id: string): Briefing | undefined => {
  return mockBriefings.find(briefing => briefing.id === id);
};

