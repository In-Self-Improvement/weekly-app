import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/case-converter");

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}