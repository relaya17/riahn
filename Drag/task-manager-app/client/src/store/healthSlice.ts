import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HealthActivity {
    id: string;
    type: 'exercise' | 'meal' | 'water' | 'break' | 'meditation';
    title: string;
    description?: string;
    scheduledTime: string;
    completed: boolean;
    duration?: number; // בדקות
    calories?: number;
    waterAmount?: number; // במ"ל
}

export interface WorkoutPlan {
    id: string;
    name: string;
    exercises: {
        name: string;
        sets: number;
        reps: number;
        weight?: number;
        duration?: number;
    }[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    targetMuscles: string[];
}

export interface MealPlan {
    id: string;
    name: string;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    ingredients: string[];
    calories: number;
    prepTime: number; // בדקות
    instructions: string[];
}

interface HealthState {
    activities: HealthActivity[];
    workoutPlans: WorkoutPlan[];
    mealPlans: MealPlan[];
    dailyStats: {
        waterIntake: number; // במ"ל
        caloriesConsumed: number;
        exerciseMinutes: number;
        breaksTaken: number;
        meditationMinutes: number;
    };
    reminders: {
        water: boolean;
        meals: boolean;
        exercise: boolean;
        breaks: boolean;
    };
}

const initialState: HealthState = {
    activities: [],
    workoutPlans: [
        {
            id: '1',
            name: 'אימון בוקר מהיר',
            exercises: [
                { name: 'סקוואט', sets: 3, reps: 15 },
                { name: 'פלאנק', sets: 3, reps: 1, duration: 30 },
                { name: 'פשיטות', sets: 3, reps: 10 },
            ],
            difficulty: 'beginner',
            targetMuscles: ['רגליים', 'בטן', 'ידיים'],
        },
        {
            id: '2',
            name: 'אימון כוח',
            exercises: [
                { name: 'דדליפט', sets: 4, reps: 8, weight: 50 },
                { name: 'בנצ\' פרס', sets: 3, reps: 10, weight: 30 },
                { name: 'פולי', sets: 3, reps: 12, weight: 25 },
            ],
            difficulty: 'intermediate',
            targetMuscles: ['גב', 'חזה', 'ידיים'],
        },
    ],
    mealPlans: [
        {
            id: '1',
            name: 'ארוחת בוקר בריאה',
            type: 'breakfast',
            ingredients: ['ביצים', 'לחם מלא', 'אבוקדו', 'עגבניה'],
            calories: 350,
            prepTime: 10,
            instructions: [
                'טוגן 2 ביצים',
                'הכן טוסט מלחם מלא',
                'הוסף אבוקדו ועגבניה',
            ],
        },
        {
            id: '2',
            name: 'סלט יווני',
            type: 'lunch',
            ingredients: ['חסה', 'עגבניה', 'מלפפון', 'זיתים', 'גבינת פטה'],
            calories: 280,
            prepTime: 15,
            instructions: [
                'חתוך את הירקות',
                'הוסף זיתים וגבינת פטה',
                'התבל בשמן זית ומלח',
            ],
        },
    ],
    dailyStats: {
        waterIntake: 0,
        caloriesConsumed: 0,
        exerciseMinutes: 0,
        breaksTaken: 0,
        meditationMinutes: 0,
    },
    reminders: {
        water: true,
        meals: true,
        exercise: true,
        breaks: true,
    },
};

const healthSlice = createSlice({
    name: 'health',
    initialState,
    reducers: {
        addActivity: (state, action: PayloadAction<Omit<HealthActivity, 'id'>>) => {
            const activity: HealthActivity = {
                ...action.payload,
                id: Date.now().toString(),
            };
            state.activities.push(activity);
        },
        completeActivity: (state, action: PayloadAction<string>) => {
            const activity = state.activities.find(a => a.id === action.payload);
            if (activity) {
                activity.completed = true;

                // עדכון סטטיסטיקות יומיות
                switch (activity.type) {
                    case 'water':
                        state.dailyStats.waterIntake += activity.waterAmount || 250;
                        break;
                    case 'meal':
                        state.dailyStats.caloriesConsumed += activity.calories || 0;
                        break;
                    case 'exercise':
                        state.dailyStats.exerciseMinutes += activity.duration || 0;
                        break;
                    case 'break':
                        state.dailyStats.breaksTaken += 1;
                        break;
                    case 'meditation':
                        state.dailyStats.meditationMinutes += activity.duration || 0;
                        break;
                }
            }
        },
        addWorkoutPlan: (state, action: PayloadAction<Omit<WorkoutPlan, 'id'>>) => {
            const plan: WorkoutPlan = {
                ...action.payload,
                id: Date.now().toString(),
            };
            state.workoutPlans.push(plan);
        },
        addMealPlan: (state, action: PayloadAction<Omit<MealPlan, 'id'>>) => {
            const plan: MealPlan = {
                ...action.payload,
                id: Date.now().toString(),
            };
            state.mealPlans.push(plan);
        },
        updateDailyStats: (state, action: PayloadAction<Partial<HealthState['dailyStats']>>) => {
            state.dailyStats = { ...state.dailyStats, ...action.payload };
        },
        toggleReminder: (state, action: PayloadAction<keyof HealthState['reminders']>) => {
            state.reminders[action.payload] = !state.reminders[action.payload];
        },
        resetDailyStats: (state) => {
            state.dailyStats = {
                waterIntake: 0,
                caloriesConsumed: 0,
                exerciseMinutes: 0,
                breaksTaken: 0,
                meditationMinutes: 0,
            };
        },
        generateHealthRecommendations: (state) => {
            // פונקציה זו לא משנה את המצב, רק מחזירה המלצות
            // נשתמש בה כפונקציה נפרדת במקום reducer
        },
    },
});

export const {
    addActivity,
    completeActivity,
    addWorkoutPlan,
    addMealPlan,
    updateDailyStats,
    toggleReminder,
    resetDailyStats,
    generateHealthRecommendations,
} = healthSlice.actions;

export default healthSlice.reducer;
