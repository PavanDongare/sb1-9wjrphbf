import React, { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TimerPopup } from './components/TimerPopup';
import { TaskList } from './components/TaskList';
import { Task } from './types/Task';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const totalTimeSpent = tasks.reduce((sum, task) => sum + task.timeSpent, 0);

  const handleTaskStart = (task: Task) => {
    setCurrentTask(task);
  };

  const handleTimerClose = (result: { completed: boolean; task: Task }) => {
    if (result.completed) {
      setTasks(prev => [result.task, ...prev]);
    }
    setCurrentTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Work Logger</h1>
      </div>

      {/* Total Time */}
      <div className="bg-white border-b p-4">
        <div className="text-gray-600">Total Time Spent</div>
        <div className="text-2xl font-bold">{totalTimeSpent} minutes</div>
      </div>

      {/* Task List */}
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />

      {/* New Task Button */}
      <div className="p-4">
        <button
          onClick={() => setShowTaskForm(true)}
          className="w-full p-4 bg-blue-500 text-white rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors"
        >
          + New Task
        </button>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        onSubmit={handleTaskStart}
      />

      {/* Timer Popup */}
      {currentTask && (
        <TimerPopup
          task={currentTask}
          isOpen={true}
          onClose={handleTimerClose}
        />
      )}
    </div>
  );
}