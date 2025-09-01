import { Metadata } from 'next';
import { generateMetadata } from '@/shared/metadata';

export const metadata: Metadata = generateMetadata('/vat-calculator');

export default function VatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}