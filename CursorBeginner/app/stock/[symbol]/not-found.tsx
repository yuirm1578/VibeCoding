import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">종목을 찾을 수 없습니다</h2>
        <p className="text-gray-400 mb-8">
          요청하신 종목이 존재하지 않거나 삭제되었습니다.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-dark-card border border-dark-border px-6 py-3 rounded-lg hover:border-dark-border/80 transition-colors"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </main>
  );
}

