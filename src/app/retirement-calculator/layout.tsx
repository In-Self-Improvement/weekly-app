import { generateMetadata as generateMetadataFromShared } from "@/shared/metadata";

export function generateMetadata() {
  return generateMetadataFromShared("/retirement-calculator");
}

export default function RetirementCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}