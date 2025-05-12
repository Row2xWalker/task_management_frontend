"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FaEdit, FaTrashAlt, FaCheck } from "react-icons/fa";

export default function TaskList({ tasks, handleDeleteTask, handleUpdateTask }) {
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState('');

  if (!tasks.length) {
    return <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>;
  }

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditedText(text);
  };

  const saveEdit = async (id) => {
    await handleUpdateTask(id, { name: editedText });
    setEditId(null);
    setEditedText('');
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task._id}>
          <CardContent className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 w-full">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleUpdateTask(task._id, { completed: !task.completed })}
              />
              {editId === task._id ? (
                <Input
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="flex-1"
                />
              ) : (
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.name}
                </span>
              )}
            </div>

            {editId === task._id ? (
              <Button className="hover:cursor-pointer" size="sm" variant="outline" onClick={() => saveEdit(task._id)}>
                <FaCheck />
              </Button>
            ) : (
              <>
                <Button className="hover:cursor-pointer" size="sm" variant="outline" onClick={() => handleEdit(task._id, task.name)}>
                  <FaEdit />
                </Button>
                <Button className="hover:cursor-pointer" size="sm" variant="outline" onClick={() => handleDeleteTask(task._id)}>
                  <FaTrashAlt />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
