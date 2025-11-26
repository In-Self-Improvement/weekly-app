"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "../../_types/taskType";
import TaskItem from "../task-item";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onUpdateTaskText: (id: string, text: string) => void;
}

export default function TaskList({
  tasks,
  onToggleTask,
  onUpdateTaskText,
}: TaskListProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onToggle={() => onToggleTask(task.id)}
              onUpdateText={(text) => onUpdateTaskText(task.id, text)}
            />
          ))}
        </div>

        {/* 4번째 슬롯 - 막혀있음 */}
        <div className="mt-4 pt-4 border-t border-dashed border-muted">
          <div className="flex items-center gap-3 opacity-40">
            <div className="w-6 h-6 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
              <span className="text-xs text-muted-foreground">4</span>
            </div>
            <div className="flex-1 px-3 py-2 rounded-lg bg-muted/50 text-muted-foreground text-sm italic">
              오늘은 딱 3개만! 내일 또 만나요 ✨
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
