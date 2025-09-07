import type { Metadata } from "next";
import { generateMetadata as generateSharedMetadata } from "@/shared/metadata";

export const metadata: Metadata = generateSharedMetadata("/dashboard");

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}