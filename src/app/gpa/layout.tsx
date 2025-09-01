import { Metadata } from "next";
import { generateMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateMetadata("/gpa");

export default function GPALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}