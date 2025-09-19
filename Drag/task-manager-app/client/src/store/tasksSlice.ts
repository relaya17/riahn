import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import dayjs from 'dayjs';

export interface Subtask {
    id: number;
    title: string;
    completed: boolean;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'inProgress' | 'done';
    dueDate?: string;
    category: string;
    subtasks: Subtask[];
    createdAt: string;
    estimatedTime?: number; // זמן מוערך בדקות
    aiPriority?: number; // עדיפות מחושבת על ידי AI
    timeBlock?: string; // חלון זמן מוקצה
}

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    topTasks: Task[]; // Top 3 tasks for today
    focusMode: boolean;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
    topTasks: [],
    focusMode: false,
};

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('http://localhost:5000/api/tasks');
    return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Partial<Task>) => {
    const response = await axios.post('http://localhost:5000/api/tasks', task);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
    const response = await axios.put(`http://localhost:5000/api/tasks/${task.id}`, task);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    return id;
});

// AI Priority calculation
const calculateAIPriority = (task: Task): number => {
    let score = 0;

    // עדיפות ידנית
    switch (task.priority) {
        case 'high': score += 30; break;
        case 'medium': score += 20; break;
        case 'low': score += 10; break;
    }

    // דחיפות לפי תאריך יעד
    if (task.dueDate) {
        const daysUntilDue = dayjs(task.dueDate).diff(dayjs(), 'day');
        if (daysUntilDue <= 0) score += 40; // איחור
        else if (daysUntilDue <= 1) score += 35; // היום או מחר
        else if (daysUntilDue <= 3) score += 25; // השבוע
        else if (daysUntilDue <= 7) score += 15; // השבוע הבא
    }

    // מורכבות (זמן מוערך)
    if (task.estimatedTime) {
        if (task.estimatedTime <= 30) score += 10; // משימה קצרה
        else if (task.estimatedTime <= 120) score += 5; // משימה בינונית
        else score += 0; // משימה ארוכה
    }

    // קטגוריה
    switch (task.category) {
        case 'development': score += 15; break;
        case 'learning': score += 12; break;
        case 'meeting': score += 8; break;
        default: score += 5; break;
    }

    return score;
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setFocusMode: (state, action: PayloadAction<boolean>) => {
            state.focusMode = action.payload;
        },
        calculateTopTasks: (state) => {
            const today = dayjs().format('YYYY-MM-DD');
            const pendingTasks = state.tasks.filter(task =>
                !task.completed && task.status !== 'done'
            );

            // חישוב עדיפות AI לכל משימה
            const tasksWithPriority = pendingTasks.map(task => ({
                ...task,
                aiPriority: calculateAIPriority(task)
            }));

            // מיון לפי עדיפות AI
            const sortedTasks = tasksWithPriority.sort((a, b) =>
                (b.aiPriority || 0) - (a.aiPriority || 0)
            );

            state.topTasks = sortedTasks.slice(0, 3);
        },
        assignTimeBlock: (state, action: PayloadAction<{ taskId: number; timeBlock: string }>) => {
            const task = state.tasks.find(t => t.id === action.payload.taskId);
            if (task) {
                task.timeBlock = action.payload.timeBlock;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'שגיאה בטעינת משימות';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    },
});

export const { setFocusMode, calculateTopTasks, assignTimeBlock } = tasksSlice.actions;
export default tasksSlice.reducer;
