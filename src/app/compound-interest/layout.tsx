import { Metadata } from 'next';
import { generateMetadata } from '@/shared/metadata';

export const metadata: Metadata = generateMetadata('/compound-interest');

export default function CompoundInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}