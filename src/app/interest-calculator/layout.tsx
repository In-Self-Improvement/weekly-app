import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/interest-calculator");

export default function InterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}