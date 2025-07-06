"use client";

import Link from "next/link";
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
  return (
    <Link href={href}>
      <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${gradient}`}>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{icon}</div>
          <CardTitle className="text-white">{name}</CardTitle>
          <CardDescription className="text-white/80">
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