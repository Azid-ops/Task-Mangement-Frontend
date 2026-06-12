"use client";
import { useState, useEffect } from "react";

// API ka base URL (Development mein localhost:3001)
const API_URL = "http://my-nest-api.com/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [input, setInput] = useState("");

  // 1. Data Fetch karna
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // 2. Add Task (API call)
  const addTask = async () => {
    if (!input.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setInput("");
  };

  // 3. Delete Task (API call)
  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-8">
      <main className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-black dark:text-zinc-50">Task Manager</h1>
        
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white"
            placeholder="New task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button 
            onClick={addTask}
            className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-lg font-medium hover:opacity-80"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className="flex justify-between items-center p-3 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <span>{task.text}</span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold ml-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}