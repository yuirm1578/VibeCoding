import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">브리핑을 찾을 수 없습니다</h1>
        <p className="text-gray-400 mb-6">요청하신 브리핑이 존재하지 않거나 삭제되었습니다.</p>
        <Link
          href="/"
          className="inline-block bg-stock-up hover:bg-stock-up/90 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          대시보드로 돌아가기
        </Link>
      </div>
    </main>
  );
}

