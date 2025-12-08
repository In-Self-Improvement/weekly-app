import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/only-three");

export default function OnlyThreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
