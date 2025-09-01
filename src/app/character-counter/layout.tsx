import { Metadata } from 'next';
import { generateMetadata } from '@/shared/metadata';

export const metadata: Metadata = generateMetadata('/character-counter');

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}