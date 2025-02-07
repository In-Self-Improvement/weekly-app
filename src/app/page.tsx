import AppCard from "@/components/appCard/AppCard";
import { apps } from "@/shared/constants";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">앱 선택</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} {...app} />
        ))}
      </div>
    </div>
  );
}
