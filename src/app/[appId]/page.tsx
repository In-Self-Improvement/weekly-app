import { apps } from "@/shared/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import PlaceholderIcon from "@/assets/placeholder.svg";
// import StarRating from "@/components/StarRating/StarRating";
// import AppDetails from "@/components/AppInfo/AppDetails";

interface AppPageProps {
  params: Promise<{
    appId: string;
  }>;
}

export default async function AppPage({ params }: AppPageProps) {
  const { appId } = await params;
  const app = apps.find((app) => app.id === appId);

  if (!app) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <Link
            href="/"
            className="text-blue-500 hover:underline mb-4 inline-block"
          >
            ← 돌아가기
          </Link>

          <div className="mt-4 mb-6">
            {app.thumbnail ? (
              <Image
                src={app.thumbnail}
                alt={app.name}
                width={800}
                height={400}
                className="w-full h-64 object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
                <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{app.name}</h1>
            <div className="flex items-center">
              <StarRating initialRating={app.rating || 0} readonly size="md" />
              {app.totalRatings !== undefined && (
                <span className="text-gray-500 text-sm ml-2">
                  ({app.totalRatings}개 평가)
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-700 mb-8">{app.description}</p>

          <div className="mb-8">
            <AppDetails app={app} />
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">앱 평가하기</h2>
            <div className="mb-4">
              <StarRating
                initialRating={0}
                size="lg"
                onRatingChange={(newRating) =>
                  console.log("새 평점:", newRating)
                }
              />
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md mb-3"
              rows={3}
              placeholder="앱에 대한 평가를 남겨주세요..."
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              평가 제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
