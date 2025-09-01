import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/fraction-calculator");

export default function FractionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}