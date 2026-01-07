'use client';

import { useState } from 'react';
import { useAccentColor } from '../providers/ThemeProvider';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const { accentColor } = useAccentColor();

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Accent color'a göre renk sınıfları
  const getColorClasses = (color: string) => {
    switch (color) {
      case '#22c55e': // Yeşil
        return {
          button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
          checkbox: 'text-green-600 focus:ring-green-500'
        };
      case '#3b82f6': // Mavi
        return {
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          checkbox: 'text-blue-600 focus:ring-blue-500'
        };
      case '#ec4899': // Pembe
        return {
          button: 'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500',
          checkbox: 'text-pink-600 focus:ring-pink-500'
        };
      default: // Mor (varsayılan)
        return {
          button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
          checkbox: 'text-indigo-600 focus:ring-indigo-500'
        };
    }
  };

  const colors = getColorClasses(accentColor);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Görevler</h2>
      
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Yeni görev ekle..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className={`px-4 py-2 ${colors.button} text-white rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 font-medium`}
        >
          ➕ Ekle
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg shadow"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className={`h-5 w-5 ${colors.checkbox} rounded`}
              />
              <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 