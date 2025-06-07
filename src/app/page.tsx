'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<{ task: string }[]>([]);
  const [newTask, setNewTask] = useState('');

  const API_URL = 'https://testbackend-2tk9.onrender.com';

  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to load tasks:", err));
  }, []);

  const addTask = async () => {
    if (newTask.trim() === '') return;

    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask })
    });

    if (response.ok) {
      setTasks(prev => [...prev, { task: newTask }]);
      setNewTask('');
    } else {
      console.error("❌ Failed to add task");
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📝 Task List</h1>
      <div>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button onClick={addTask} style={{ padding: '0.5rem' }}>
          Add Task
        </button>
      </div>
      <ul style={{ marginTop: '1rem' }}>
        {tasks.map((task, index) => (
          <li key={index}>✅ {task.task}</li>
        ))}
      </ul>
    </main>
  );
}
