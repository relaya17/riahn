# מנהל המשימות - Task Manager App

אפליקציית ניהול משימות עם React 18, Express ו-TypeScript

## 🚀 התקנה והפעלה

### התקנה ראשונית

```bash
# התקנת כל התלויות
pnpm install:all
```

### הפעלת האפליקציה

```bash
# הפעלת הקליינט והשרת יחד
pnpm dev
```

### פקודות נוספות

```bash
# בניית האפליקציה
pnpm build

# הפעלת השרת בלבד
pnpm dev:server

# הפעלת הקליינט בלבד
pnpm dev:client

# הפעלת השרת בבנייה
pnpm start

# ניקוי קבצי בנייה
pnpm clean
```

## 📁 מבנה הפרויקט

```
task-manager-app/
├── client/          # React 18 + TypeScript + Vite
├── server/          # Express + TypeScript
├── package.json     # סקריפטים ראשיים
└── README.md
```

## 🌐 פורטים

- **קליינט**: http://localhost:5173
- **שרת**: http://localhost:5000

## ✨ תכונות

- ✅ הוספת משימות חדשות
- ✅ עריכת משימות קיימות
- ✅ סימון משימות כהשלמות
- ✅ מחיקת משימות
- ✅ קביעת עדיפויות (נמוכה/בינונית/גבוהה)
- ✅ ממשק בעברית
- ✅ תקשורת מלאה עם השרת

## 🛠 טכנולוגיות

- **Frontend**: React 18, TypeScript, Bootstrap, Axios
- **Backend**: Express, TypeScript, CORS
- **Package Manager**: pnpm
- **Build Tools**: Vite, ts-node-dev
