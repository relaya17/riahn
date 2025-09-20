import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Task {
    id: string
    title: string
    completed: boolean
}

interface TasksState {
    list: Task[]
}

const initialState: TasksState = {
    list: [],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.list.push({
                id: Date.now().toString(),
                title: action.payload,
                completed: false,
            })
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.list.find(t => t.id === action.payload)
            if (task) {
                task.completed = !task.completed
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(t => t.id !== action.payload)
        },
    },
})

export const { addTask, toggleTask, removeTask } = tasksSlice.actions
export default tasksSlice.reducer
