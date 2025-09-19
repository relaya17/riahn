import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testFunc } from './test';

// טעינת משתני סביבה
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// נתיב בדיקה
app.get('/test', (_req, res) => {
    res.json({ message: testFunc() });
});

// נתיב ראשי
app.get('/', (_req, res) => {
    res.json({ message: 'שרת ניהול משימות מתקדם פועל בהצלחה!' });
});

// נתיבים לניהול משימות מתקדם
let tasks = [
    {
        id: 1,
        title: 'למד React',
        description: 'לימוד React hooks ו-components',
        completed: false,
        priority: 'high',
        status: 'todo',
        dueDate: '2024-02-15',
        category: 'learning',
        subtasks: [
            { id: 1, title: 'Hooks', completed: false },
            { id: 2, title: 'Components', completed: true }
        ],
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'בנה פרויקט',
        description: 'בניית אפליקציה מלאה',
        completed: true,
        priority: 'medium',
        status: 'done',
        dueDate: '2024-02-10',
        category: 'development',
        subtasks: [],
        createdAt: new Date().toISOString()
    }
];

// קבלת כל המשימות
app.get('/api/tasks', (req, res) => {
    const { status, priority, category } = req.query;
    let filteredTasks = [...tasks];

    if (status) {
        filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    if (priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    if (category) {
        filteredTasks = filteredTasks.filter(task => task.category === category);
    }

    res.json(filteredTasks);
});

// קבלת משימה לפי ID
app.get('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        return res.status(404).json({ error: 'משימה לא נמצאה' });
    }

    res.json(task);
});

// הוספת משימה חדשה
app.post('/api/tasks', (req, res) => {
    const {
        title,
        description = '',
        priority = 'medium',
        status = 'todo',
        dueDate,
        category = 'general',
        subtasks = []
    } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'כותרת המשימה היא שדה חובה' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
        priority,
        status,
        dueDate,
        category,
        subtasks,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// עדכון משימה
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        completed,
        priority,
        status,
        dueDate,
        category,
        subtasks
    } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'משימה לא נמצאה' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(priority && { priority }),
        ...(status && { status }),
        ...(dueDate && { dueDate }),
        ...(category && { category }),
        ...(subtasks && { subtasks })
    };

    res.json(tasks[taskIndex]);
});

// מחיקת משימה
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'משימה לא נמצאה' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'משימה נמחקה בהצלחה' });
});

// עדכון subtask
app.put('/api/tasks/:id/subtasks/:subtaskId', (req, res) => {
    const { id, subtaskId } = req.params;
    const { completed, title } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'משימה לא נמצאה' });
    }

    const subtaskIndex = tasks[taskIndex].subtasks.findIndex(
        subtask => subtask.id === parseInt(subtaskId)
    );

    if (subtaskIndex === -1) {
        return res.status(404).json({ error: 'תת-משימה לא נמצאה' });
    }

    tasks[taskIndex].subtasks[subtaskIndex] = {
        ...tasks[taskIndex].subtasks[subtaskIndex],
        ...(completed !== undefined && { completed }),
        ...(title && { title })
    };

    res.json(tasks[taskIndex]);
});

// קבלת סטטיסטיקות
app.get('/api/stats', (_req, res) => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;

    const statsByStatus = {
        todo: tasks.filter(task => task.status === 'todo').length,
        inProgress: tasks.filter(task => task.status === 'inProgress').length,
        done: tasks.filter(task => task.status === 'done').length
    };

    res.json({
        total,
        completed,
        pending,
        highPriority,
        statsByStatus
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`שרת מתקדם פועל על פורט ${PORT}`);
    console.log(`בדיקת קימפול: ${testFunc()}`);
});
