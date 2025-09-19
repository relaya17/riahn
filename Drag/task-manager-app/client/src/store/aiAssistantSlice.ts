import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AIRecommendation {
    id: string;
    type: 'priority' | 'time' | 'health' | 'productivity';
    title: string;
    message: string;
    action?: string;
    priority: 'low' | 'medium' | 'high';
    timestamp: string;
    read: boolean;
}

export interface AICoach {
    isActive: boolean;
    currentMood: 'motivated' | 'tired' | 'focused' | 'stressed';
    dailyGoal: string;
    productivityScore: number; // 0-100
    suggestions: AIRecommendation[];
}

interface AIAssistantState {
    coach: AICoach;
    recommendations: AIRecommendation[];
    isCoachMode: boolean;
    dailyInsights: {
        tasksCompleted: number;
        tasksPending: number;
        productivityTrend: 'up' | 'down' | 'stable';
        focusTime: number; // בדקות
        breaksTaken: number;
    };
}

const initialState: AIAssistantState = {
    coach: {
        isActive: false,
        currentMood: 'focused',
        dailyGoal: 'השלם את המשימות החשובות ביותר',
        productivityScore: 75,
        suggestions: [],
    },
    recommendations: [],
    isCoachMode: false,
    dailyInsights: {
        tasksCompleted: 0,
        tasksPending: 0,
        productivityTrend: 'stable',
        focusTime: 0,
        breaksTaken: 0,
    },
};

const aiAssistantSlice = createSlice({
    name: 'aiAssistant',
    initialState,
    reducers: {
        toggleCoachMode: (state) => {
            state.isCoachMode = !state.isCoachMode;
        },
        setCoachMood: (state, action: PayloadAction<AICoach['currentMood']>) => {
            state.coach.currentMood = action.payload;
        },
        addRecommendation: (state, action: PayloadAction<Omit<AIRecommendation, 'id' | 'timestamp' | 'read'>>) => {
            const recommendation: AIRecommendation = {
                ...action.payload,
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                read: false,
            };
            state.recommendations.unshift(recommendation);
            state.coach.suggestions.unshift(recommendation);
        },
        markRecommendationAsRead: (state, action: PayloadAction<string>) => {
            const recommendation = state.recommendations.find(r => r.id === action.payload);
            if (recommendation) {
                recommendation.read = true;
            }
        },
        updateProductivityScore: (state, action: PayloadAction<number>) => {
            state.coach.productivityScore = Math.max(0, Math.min(100, action.payload));
        },
        updateDailyInsights: (state, action: PayloadAction<Partial<AIAssistantState['dailyInsights']>>) => {
            state.dailyInsights = { ...state.dailyInsights, ...action.payload };
        },
        generateSmartRecommendations: (state, action: PayloadAction<{
            tasks: any[];
            currentTime: string;
            completedToday: number;
        }>) => {
            const { tasks, currentTime, completedToday } = action.payload;
            const pendingTasks = tasks.filter(t => !t.completed);

            // המלצות חכמות
            if (pendingTasks.length > 5) {
                state.recommendations.push({
                    id: Date.now().toString(),
                    type: 'productivity',
                    title: 'עומס משימות גבוה',
                    message: 'יש לך הרבה משימות פתוחות. מומלץ להתמקד ב-3 החשובות ביותר',
                    priority: 'high',
                    timestamp: new Date().toISOString(),
                    read: false,
                });
            }

            if (completedToday === 0 && new Date(currentTime).getHours() > 10) {
                state.recommendations.push({
                    id: (Date.now() + 1).toString(),
                    type: 'productivity',
                    title: 'התחל עם משהו קטן',
                    message: 'עדיין לא התחלת היום. נסה משימה קצרה של 15 דקות',
                    priority: 'medium',
                    timestamp: new Date().toISOString(),
                    read: false,
                });
            }

            // בדיקת משימות שעברו תאריך יעד
            const overdueTasks = pendingTasks.filter(t =>
                t.dueDate && new Date(t.dueDate) < new Date()
            );

            if (overdueTasks.length > 0) {
                state.recommendations.push({
                    id: (Date.now() + 2).toString(),
                    type: 'priority',
                    title: 'משימות שעברו תאריך יעד',
                    message: `יש ${overdueTasks.length} משימות שעברו תאריך יעד. מומלץ לטפל בהן בהקדם`,
                    priority: 'high',
                    timestamp: new Date().toISOString(),
                    read: false,
                });
            }
        },
    },
});

export const {
    toggleCoachMode,
    setCoachMood,
    addRecommendation,
    markRecommendationAsRead,
    updateProductivityScore,
    updateDailyInsights,
    generateSmartRecommendations,
} = aiAssistantSlice.actions;

export default aiAssistantSlice.reducer;
