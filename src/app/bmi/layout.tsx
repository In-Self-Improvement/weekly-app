import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/bmi");

export default function BMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}