import React from 'react';
import { format } from 'date-fns';
import { Task } from '../types/Task';
import { TrashIcon } from './icons/TrashIcon';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <div className="flex-1 overflow-auto">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border-b flex justify-between items-center">
          <div>
            <div className="font-semibold text-lg">{task.name}</div>
            <div className="text-gray-600">{task.timeSpent} minutes</div>
            <div className="text-sm text-gray-500">
              {format(task.timestamp, 'PPp')}
            </div>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            aria-label="Delete task"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 p-8">
          No tasks logged yet
        </div>
      )}
    </div>
  );
};