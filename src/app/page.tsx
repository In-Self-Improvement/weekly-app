import AppCard from "@/components/AppCard";

export default function HomePage() {
  const apps = [
    {
      id: "weather",
      name: "날씨 & 옷차림",
      description: "현재 위치의 날씨와 추천 옷차림을 확인하세요",
      icon: "🌤️",
      href: "/weather",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      id: "quickwin",
      name: "QuickWin",
      description: "간단한 할일로 성취감을 느껴보세요",
      icon: "🎯",
      href: "/quickwin",
      gradient: "bg-gradient-to-br from-green-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Weekly Apps
          </h1>
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
