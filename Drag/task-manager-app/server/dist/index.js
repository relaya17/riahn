"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const test_js_1 = require("./test.js");
// טעינת משתני סביבה
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// נתיב בדיקה
app.get('/test', (_req, res) => {
    res.json({ message: (0, test_js_1.testFunc)() });
});
// נתיב ראשי
app.get('/', (_req, res) => {
    res.json({ message: 'שרת ניהול משימות פועל בהצלחה!' });
});
// נתיבים לניהול משימות (לעת עתה עם נתונים זמניים)
let tasks = [
    { id: 1, title: 'למד React', completed: false, priority: 'high' },
    { id: 2, title: 'בנה פרויקט', completed: true, priority: 'medium' }
];
// קבלת כל המשימות
app.get('/api/tasks', (_req, res) => {
    res.json(tasks);
});
// הוספת משימה חדשה
app.post('/api/tasks', (req, res) => {
    const { title, priority = 'medium' } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'כותרת המשימה היא שדה חובה' });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false,
        priority
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
// עדכון משימה
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed, priority } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'משימה לא נמצאה' });
    }
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...(title && { title }),
        ...(completed !== undefined && { completed }),
        ...(priority && { priority })
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`שרת פועל על פורט ${PORT}`);
    console.log(`בדיקת קימפול: ${(0, test_js_1.testFunc)()}`);
});
