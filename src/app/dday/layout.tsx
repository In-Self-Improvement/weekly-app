import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/dday");

export default function DdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}