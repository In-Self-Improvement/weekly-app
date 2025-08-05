import AppCard from "@/components/AppCard";

export default function HomePage() {
  const apps = [
    {
      id: "weather",
      name: "날씨 & 옷차림",
      description: "현재 위치의 날씨와 추천 옷차림을 확인하세요",
      icon: "🌤️",
      href: "/weather",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      id: "quickwin",
      name: "QuickWin",
      description: "간단한 할일로 성취감을 느껴보세요",
      icon: "🎯",
      href: "/quickwin",
      gradient: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      id: "ladder",
      name: "사다리타기",
      description: "공정한 선택을 위한 사다리타기 게임",
      icon: "🪜",
      href: "/ladder",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
    {
      id: "bmi",
      name: "BMI 계산기",
      description: "키와 몸무게로 체질량지수를 계산하고 건강 상태를 확인하세요",
      icon: "📏",
      href: "/bmi",
      gradient: "bg-gradient-to-br from-rose-500 to-orange-600",
    },
    {
      id: "age",
      name: "나이 계산기",
      description: "생년월일로 정확한 나이와 생일까지 남은 날을 계산하세요",
      icon: "🎂",
      href: "/age",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
    },
    {
      id: "compound-interest",
      name: "복리 계산기",
      description: "투자의 마법, 복리 효과를 미리 체험해보세요",
      icon: "💰",
      href: "/compound-interest",
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      id: "conversion",
      name: "평수 변환기",
      description: "평수와 제곱미터를 쉽게 변환하세요",
      icon: "🏠",
      href: "/conversion",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
    },
    {
      id: "percent",
      name: "퍼센트 계산기",
      description: "다양한 퍼센트 계산을 간편하게 수행하세요",
      icon: "📊",
      href: "/percent",
      gradient: "bg-gradient-to-br from-slate-700 to-black",
    },
    {
      id: "vat-calculator",
      name: "부가세 계산기",
      description: "공급가액과 부가세 포함 금액을 정확하게 계산하세요",
      icon: "🧮",
      href: "/vat-calculator",
      gradient: "bg-gradient-to-br from-gray-800 to-black",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Weekly Apps</h1>
          <p className="text-gray-600 text-lg">
            유용한 앱들을 한 곳에서 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <AppCard
              key={app.id}
              id={app.id}
              name={app.name}
              description={app.description}
              icon={app.icon}
              href={app.href}
              gradient={app.gradient}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            더 많은 앱들이 추가될 예정입니다
          </p>
        </div>
      </div>
    </div>
  );
}
