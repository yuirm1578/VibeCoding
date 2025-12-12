import Link from 'next/link';
import Image from 'next/image';
import { Briefing } from '@/lib/mockData';

interface BriefingCardProps {
  briefing: Briefing;
}

export default function BriefingCard({ briefing }: BriefingCardProps) {
  const formattedDate = new Date(briefing.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Link href={`/briefing/${briefing.id}`}>
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden transition-all hover:border-dark-border/80 hover:shadow-lg cursor-pointer">
        <div className="relative h-48 bg-dark-bg">
          <Image
            src={briefing.imageUrl}
            alt={`${briefing.stockName} 브리핑`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-dark-card/90 text-white px-2 py-1 rounded text-xs font-semibold">
              {briefing.symbol}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">{briefing.stockName}</h3>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          <p className="text-gray-300 text-sm line-clamp-2">{briefing.summary}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded ${
              briefing.status === 'completed' 
                ? 'bg-stock-up/20 text-stock-up' 
                : 'bg-yellow-500/20 text-yellow-500'
            }`}>
              {briefing.status === 'completed' ? '완료' : '처리중'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

