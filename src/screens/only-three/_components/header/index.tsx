"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDarkMode, onToggleDarkMode }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          OnlyThree
        </h1>
        <p className="text-sm text-muted-foreground">
          오늘 딱 3가지만 하세요
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleDarkMode}
        className="rounded-full"
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </header>
  );
}
