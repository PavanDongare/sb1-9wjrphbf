import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Task } from '../types/Task';

interface TimerPopupProps {
  task: Task;
  isOpen: boolean;
  onClose: (result: { completed: boolean; task: Task }) => void;
}

export const TimerPopup: React.FC<TimerPopupProps> = ({ task, isOpen, onClose }) => {
  const [remainingTime, setRemainingTime] = useState(task.duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;
        task.timeSpent = Math.floor((task.duration * 60 - newTime) / 60);
        
        if (newTime <= 0) {
          clearInterval(timer);
          onClose({ completed: true, task });
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [task]);

  const handleComplete = () => {
    task.completed = true;
    onClose({ completed: true, task });
  };

  const handleAbort = () => {
    onClose({ completed: false, task });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-blue-500/95" aria-hidden="true" />
      
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 mx-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 break-words">
              {task.name}
            </h2>
            
            <div className="py-8">
              <div className="text-[6rem] sm:text-[8rem] font-bold font-mono tracking-wider text-blue-500 leading-none">
                {formatTime(remainingTime)}
              </div>
              <div className="text-xl sm:text-2xl text-gray-600 mt-4 font-medium">
                remaining
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-lg mx-auto">
              <button
                onClick={handleAbort}
                className="p-4 sm:p-6 border-2 border-red-500 text-red-500 rounded-2xl text-xl font-bold hover:bg-red-50 transition-colors"
              >
                Abort
              </button>
              <button
                onClick={handleComplete}
                className="p-4 sm:p-6 bg-blue-500 text-white rounded-2xl text-xl font-bold hover:bg-blue-600 transition-colors"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};