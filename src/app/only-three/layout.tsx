import { generateMetadata } from "@/shared/metadata";
import { Metadata } from "next";

export const metadata: Metadata = generateMetadata("/only-three");

export default function OnlyThreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
