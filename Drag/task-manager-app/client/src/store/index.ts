import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import aiAssistantReducer from './aiAssistantSlice';
import healthReducer from './healthSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        aiAssistant: aiAssistantReducer,
        health: healthReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
