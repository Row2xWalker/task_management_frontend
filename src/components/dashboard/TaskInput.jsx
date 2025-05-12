"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";

export default function TaskInput({ handleAddTask }) {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const onAdd = () => {
    if (!task.trim()) {
      setError('Please enter a task');
      return;
    }
    handleAddTask({ name: task, completed: false });
    setTask('');
    setError('');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add a Task</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1"
          />
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={onAdd}
          >
            <FaPlus />
          </Button>
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </CardContent>
    </Card>

  );
}