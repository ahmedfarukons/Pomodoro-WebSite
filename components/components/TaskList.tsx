import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { ListTodo } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onRemoveTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onCompleteTask, 
  onRemoveTask 
}) => {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <ListTodo className="h-12 w-12 mb-3" />
        <p className="text-lg">Henüz görev eklenmedi</p>
        <p className="text-sm">Yeni bir görev ekleyerek başlayın</p>
      </div>
    );
  }

  return (
    <div>
      {activeTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-3 border-b pb-2">Aktif Görevler</h2>
          {activeTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onCompleteTask}
              onRemove={onRemoveTask}
            />
          ))}
        </div>
      )}
      
      {completedTasks.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-700 mb-3 border-b pb-2">Tamamlanan Görevler</h2>
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={onCompleteTask}
              onRemove={onRemoveTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;