"use client";
import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  gold: number;
  duration: number; // dakika cinsinden süre
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDuration, setNewDuration] = useState(25); // varsayılan 25 dakika
  const [totalGold, setTotalGold] = useState(0);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    const gold = todos.reduce((acc, todo) => acc + (todo.completed ? todo.gold : 0), 0);
    setTotalGold(gold);
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        gold: Math.floor(Math.random() * 10) + 1,
        duration: newDuration,
      };
      setTodos([...todos, todo]);
      setNewTodo('');
      setNewDuration(25);
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

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Görevler</h2>
        <div className="flex items-center gap-2">
          <span className="text-amber-500 font-semibold">{totalGold}</span>
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 12.5l7-4-7-4v8z" />
          </svg>
        </div>
      </div>

      <form onSubmit={addTodo} className="mb-6">
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Yeni görev ekle..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-purple-500 hover:text-purple-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600 dark:text-gray-400">Süre (dakika):</label>
            <input
              type="number"
              min="1"
              max="60"
              value={newDuration}
              onChange={(e) => setNewDuration(Number(e.target.value))}
              className="w-24 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {todos.map(todo => (
          <div
            key={todo.id}
            className="group flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition ${
                todo.completed
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {todo.completed && (
                <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div className="flex-grow">
              <span
                className={`block text-gray-800 dark:text-white ${
                  todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                }`}
              >
                {todo.text}
              </span>
              <span className="text-sm text-purple-600 dark:text-purple-400">
                {todo.duration} dakika
              </span>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
              <span className="text-amber-500 font-medium">{todo.gold}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList; 