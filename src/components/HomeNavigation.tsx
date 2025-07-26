'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function HomeNavigation() {
  const pathname = usePathname();
  
  // 루트 페이지에서는 숨김
  if (pathname === '/') {
    return null;
  }

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={handleHomeClick}
        className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <span className="text-lg">🏠</span>
        <span className="font-medium">홈으로 돌아가기</span>
        <span className="text-sm opacity-80">(다른 서비스도 더보기!)</span>
      </Button>
    </div>
  );
}