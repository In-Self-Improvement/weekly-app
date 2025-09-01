import type { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/percent");

export default function PercentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}