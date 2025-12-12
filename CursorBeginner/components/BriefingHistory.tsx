import { Briefing } from '@/lib/mockData';
import BriefingCard from './BriefingCard';

interface BriefingHistoryProps {
  briefings: Briefing[];
}

export default function BriefingHistory({ briefings }: BriefingHistoryProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">최근 브리핑 히스토리</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {briefings.map((briefing) => (
          <BriefingCard key={briefing.id} briefing={briefing} />
        ))}
      </div>
    </div>
  );
}

