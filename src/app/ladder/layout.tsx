import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/ladder");

export default function LadderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}