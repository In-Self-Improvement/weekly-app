import Image from "next/image";
import Link from "next/link";
import PlaceholderIcon from "@/assets/placeholder.svg";
import StarRating from "@/components/StarRating/StarRating";
import { App } from "@/types/app";

type AppCardProps = App;

export default function AppCard({
  id,
  name,
  description,
  thumbnail,
  rating,
  totalRatings,
}: AppCardProps) {
  console.log(thumbnail);
  return (
    <Link href={`/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={name}
            width={400}
            height={200}
            className="w-full h-48 object-contain"
          />
        ) : (
          <PlaceholderIcon className="w-full h-48 object-contain" />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-600 mb-3">{description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <StarRating initialRating={rating || 0} readonly size="sm" />
              {totalRatings !== undefined && (
                <span className="text-gray-500 text-sm ml-2">
                  ({totalRatings})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
