import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/stock-average-calculator");

export default function StockAverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}