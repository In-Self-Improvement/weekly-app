import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] flex-col">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
