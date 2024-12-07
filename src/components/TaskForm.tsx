import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Task } from '../types/Task';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) {
      alert('Please enter a task name');
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      name: taskName.trim(),
      duration,
      timeSpent: 0,
      timestamp: new Date()
    };

    onSubmit(task);
    setTaskName('');
    setDuration(30);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
          <Dialog.Title className="text-3xl font-bold mb-6 text-gray-900">New Task</Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="taskName" className="block text-sm font-semibold text-gray-700 mb-2">
                Task Name
              </label>
              <input
                id="taskName"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full p-3 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration: <span className="text-blue-600 font-bold">{duration} minutes</span>
              </label>
              <input
                type="range"
                min="1"
                max="120"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 min</span>
                <span>120 min</span>
              </div>
            </div>
            
            <div className="space-y-3 pt-4">
              <button
                type="submit"
                className="w-full p-4 bg-blue-500 text-white text-lg font-bold rounded-xl hover:bg-blue-600 transform transition-all duration-200 hover:scale-[1.02]"
              >
                Start Task
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full p-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};