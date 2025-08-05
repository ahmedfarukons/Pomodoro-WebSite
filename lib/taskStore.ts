import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  goldReward: number;
}

interface TaskState {
  tasks: Task[];
  gold: number;
  totalGoldEarned: number;
  
  // Actions
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  addGold: (amount: number) => void;
  spendGold: (amount: number) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      gold: 0,
      totalGoldEarned: 0,
      
      addTask: (text: string) => {
        const newTask: Task = {
          id: Date.now().toString(),
          text,
          completed: false,
          createdAt: new Date(),
          goldReward: Math.floor(Math.random() * 10) + 5 // 5-15 altın
        };
        set(state => ({
          tasks: [...state.tasks, newTask]
        }));
      },
      
      toggleTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        }));
      },
      
      deleteTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        }));
      },
      
      completeTask: (id: string) => {
        const state = get();
        const task = state.tasks.find(t => t.id === id);
        
        if (task && !task.completed) {
          set(state => ({
            tasks: state.tasks.map(t =>
              t.id === id 
                ? { ...t, completed: true, completedAt: new Date() }
                : t
            ),
            gold: state.gold + task.goldReward,
            totalGoldEarned: state.totalGoldEarned + task.goldReward
          }));
        }
      },
      
      addGold: (amount: number) => {
        set(state => ({
          gold: state.gold + amount,
          totalGoldEarned: state.totalGoldEarned + amount
        }));
      },
      
      spendGold: (amount: number) => {
        set(state => ({
          gold: Math.max(0, state.gold - amount)
        }));
      }
    }),
    {
      name: 'pomodoro-task-store',
      partialize: (state) => ({
        tasks: state.tasks,
        gold: state.gold,
        totalGoldEarned: state.totalGoldEarned
      })
    }
  )
); 