"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Task } from "../../_types/taskType";

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: () => void;
  onUpdateText: (text: string) => void;
}

export default function TaskItem({
  task,
  index,
  onToggle,
  onUpdateText,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (inputValue.trim() !== task.text) {
      onUpdateText(inputValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setInputValue(task.text);
      setIsEditing(false);
    }
  };

  const placeholders = [
    "첫 번째 목표를 입력하세요",
    "두 번째 목표를 입력하세요",
    "세 번째 목표를 입력하세요",
  ];

  return (
    <div className="flex items-center gap-3 group">
      {/* 체크박스 */}
      <button
        onClick={onToggle}
        className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center
          transition-all duration-200 flex-shrink-0
          ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-muted-foreground/30 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950"
          }
        `}
      >
        {task.completed && <Check className="w-4 h-4" />}
      </button>

      {/* 텍스트 입력/표시 */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[index]}
          className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-input focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
          maxLength={100}
        />
      ) : (
        <div
          onClick={() => !task.completed && setIsEditing(true)}
          className={`
            flex-1 px-3 py-2 rounded-lg cursor-text
            transition-all duration-200
            ${
              task.completed
                ? "line-through text-muted-foreground bg-muted/30"
                : task.text
                ? "text-foreground hover:bg-muted/50"
                : "text-muted-foreground italic hover:bg-muted/50"
            }
          `}
        >
          {task.text || placeholders[index]}
        </div>
      )}
    </div>
  );
}
