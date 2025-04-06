export interface App {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;
  rating?: number;
  totalRatings?: number;
}

export interface AppWithMetadata extends App {
  createdAt: Date;
  updatedAt: Date;
  version: string;
  isPublished: boolean;
  userRatings?: UserRating[];
}

export interface UserRating {
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}
