export interface App {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;
}

export interface AppWithMetadata extends App {
  createdAt: Date;
  updatedAt: Date;
  version: string;
  isPublished: boolean;
}
