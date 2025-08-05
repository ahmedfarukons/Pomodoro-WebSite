import React from 'react';
import { CheckCircle, Trash2, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import Timer from './Timer';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onRemove: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onRemove }) => {
  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'low':
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Düşük
          </span>
        );
      case 'medium':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Orta
          </span>
        );
      case 'high':
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
            Yüksek
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-md mb-3 border-l-4 ${
        task.completed 
          ? 'border-green-500 bg-green-50'
          : task.isLate
            ? 'border-red-500'
            : task.priority === 'high'
              ? 'border-red-400'
              : task.priority === 'medium'
                ? 'border-blue-400'
                : 'border-green-400'
      } transition-all duration-300`}
    >
      <div className="flex justify-between mb-2">
        <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.title}
        </h3>
        <div className="flex gap-1">
          {getPriorityBadge()}
          <div className="flex items-center justify-center bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
            {task.completed && task.isLate 
              ? `${Math.floor(task.goldReward / 2)} altın`
              : `${task.goldReward} altın`
            }
          </div>
        </div>
      </div>
      
      {task.description && (
        <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
          {task.description}
        </p>
      )}
      
      <div className="flex justify-between items-center">
        <Timer deadline={task.deadline} isCompleted={task.completed} />
        
        <div className="flex gap-2">
          {!task.completed && (
            <button
              onClick={() => onComplete(task.id)}
              className="text-green-600 hover:text-green-800 transition-colors duration-200"
              title="Tamamla"
            >
              <CheckCircle className="h-5 w-5" />
            </button>
          )}
          
          <button
            onClick={() => onRemove(task.id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            title="Sil"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {task.isLate && !task.completed && (
        <div className="mt-2 flex items-center gap-1 text-red-600 text-xs">
          <AlertCircle className="h-4 w-4" />
          <span>Görev süresi doldu! Tamamlarsan sadece {Math.floor(task.goldReward / 2)} altın kazanabilirsin.</span>
        </div>
      )}
    </div>
  );
};

export default TaskItem;