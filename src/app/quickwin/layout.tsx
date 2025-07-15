import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/quickwin");

export default function QuickWinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}