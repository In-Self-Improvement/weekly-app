import { Metadata } from 'next';
import { generateMetadata } from '@/shared/metadata';

export const metadata: Metadata = generateMetadata('/age');

export default function AgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}