import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [goldReward, setGoldReward] = useState(10);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !deadline) return;
    
    onAddTask({
      title,
      description,
      deadline: new Date(deadline),
      goldReward,
      priority
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDeadline('');
    setGoldReward(10);
    setPriority('medium');
    setIsFormOpen(false);
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (!isFormOpen) {
    return (
      <button
        onClick={() => setIsFormOpen(true)}
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg shadow-md hover:from-amber-500 hover:to-amber-600 transition-all duration-300 font-medium"
      >
        <PlusCircle className="h-5 w-5" />
        Yeni Görev Ekle
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4 animate-fadeIn">
      <div className="mb-3">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Görev
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Görev başlığı..."
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Açıklama
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="Görev açıklaması..."
          rows={2}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Son Tarih
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={deadline}
            min={getMinDateTime()}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>
        
        <div>
          <label htmlFor="goldReward" className="block text-sm font-medium text-gray-700 mb-1">
            Altın Ödülü
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="goldReward"
              min="5"
              max="50"
              step="5"
              value={goldReward}
              onChange={(e) => setGoldReward(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
            <span className="ml-2 text-amber-600 font-bold">{goldReward}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Öncelik
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority('low')}
            className={`flex-1 py-1 px-3 rounded-md ${
              priority === 'low' 
                ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Düşük
          </button>
          <button
            type="button"
            onClick={() => setPriority('medium')}
            className={`flex-1 py-1 px-3 rounded-md ${
              priority === 'medium' 
                ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Orta
          </button>
          <button
            type="button"
            onClick={() => setPriority('high')}
            className={`flex-1 py-1 px-3 rounded-md ${
              priority === 'high' 
                ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            Yüksek
          </button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-md hover:from-amber-500 hover:to-amber-600 transition-all duration-300"
        >
          Görevi Ekle
        </button>
        <button
          type="button"
          onClick={() => setIsFormOpen(false)}
          className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
        >
          İptal
        </button>
      </div>
    </form>
  );
};

export default TaskForm;