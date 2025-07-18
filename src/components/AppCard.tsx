"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AppCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
}

export default function AppCard({ 
  name, 
  description, 
  icon, 
  href, 
  gradient 
}: AppCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && typeof window !== 'undefined') {
      const remoji = (window as unknown as { remoji?: { parse: (element: Element, options?: { font?: string; className?: string }) => void } }).remoji;
      if (remoji) {
        remoji.parse(cardRef.current, {
          font: 'tossface',
          className: 'toss-emoji block mx-auto w-12 h-12'
        });
      }
    }
  }, []);

  return (
    <Link href={href}>
      <Card ref={cardRef} className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${gradient}`}>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle className="text-white">{name}</CardTitle>
          <CardDescription className="text-white/80 line-clamp-2 min-h-[2.5rem]">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-white/70 text-sm">
            클릭하여 앱 실행
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}