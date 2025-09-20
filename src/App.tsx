import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { useAppSelector, useAppDispatch } from './hooks'
import { addTask, toggleTask, removeTask } from './features/tasksSlice'

function TaskApp() {
  const tasks = useAppSelector(state => state.tasks.list)
  const dispatch = useAppDispatch()
  const [newTask, setNewTask] = useState('')

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask.trim()))
      setNewTask('')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">📋 Task Manager</h1>
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="הקלד משימה חדשה..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            disabled={!newTask.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            ➕ הוסף
          </button>
        </div>
        <button
          onClick={() => dispatch(addTask('משימה חדשה'))}
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          ➕ הוסף משימה מהירה
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <span
              className={`flex-1 cursor-pointer ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}
              onClick={() => dispatch(toggleTask(task.id))}
            >
              {task.title}
            </span>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="text-red-500 hover:text-red-700 p-1"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          אין משימות. הוסף משימה חדשה!
        </p>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <TaskApp />
        </div>
      </div>
    </Provider>
  )
}
