import { Metadata } from 'next';
import { generateMetadata } from '@/shared/metadata';

export const metadata: Metadata = generateMetadata('/conversion');

export default function ConversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}