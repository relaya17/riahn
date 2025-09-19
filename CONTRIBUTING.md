# מדריך תרומה לפרויקט LanguageConnect

תודה על העניין שלך לתרום לפרויקט LanguageConnect! 🎉

## 🤝 איך לתרום

### דיווח על באגים
אם מצאת באג, אנא:
1. בדוק אם הבאג כבר דווח ב-[Issues](https://github.com/your-username/languageconnect/issues)
2. אם לא, צור issue חדש עם:
   - תיאור מפורט של הבאג
   - שלבים לשחזור הבאג
   - צילומי מסך (אם רלוונטי)
   - מידע על הסביבה (דפדפן, מערכת הפעלה, וכו')

### הצעת תכונות חדשות
אם יש לך רעיון לתכונה חדשה:
1. בדוק אם התכונה כבר מוצעת ב-[Issues](https://github.com/your-username/languageconnect/issues)
2. אם לא, צור issue חדש עם:
   - תיאור מפורט של התכונה
   - הסבר על התועלת שלה
   - דוגמאות לשימוש

### תרומה לקוד
1. **Fork** את הפרויקט
2. **Clone** את ה-fork שלך:
   ```bash
   git clone https://github.com/your-username/languageconnect.git
   cd languageconnect
   ```
3. **צור branch חדש**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **התקן תלויות**:
   ```bash
   npm install
   ```
5. **הגדר את הסביבה**:
   ```bash
   cp env.example .env.local
   # ערוך את .env.local עם הערכים שלך
   ```
6. **בצע את השינויים** שלך
7. **בדוק את הקוד**:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```
8. **Commit** את השינויים:
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```
9. **Push** ל-branch:
   ```bash
   git push origin feature/amazing-feature
   ```
10. **פתח Pull Request**

## 📋 כללי קוד

### TypeScript
- השתמש ב-TypeScript עבור כל הקבצים
- הגדר טיפוסים מפורשים עבור props ו-state
- השתמש ב-interfaces עבור מבני נתונים מורכבים

### React
- השתמש ב-functional components עם hooks
- השתמש ב-React.memo עבור components שצריכים אופטימיזציה
- השתמש ב-useCallback ו-useMemo כאשר נדרש

### Styling
- השתמש ב-Tailwind CSS עבור styling
- השתמש ב-CSS modules עבור styles מורכבים
- שמור על עקביות בעיצוב

### Naming Conventions
- השתמש ב-camelCase עבור variables ו-functions
- השתמש ב-PascalCase עבור components
- השתמש ב-kebab-case עבור file names
- השתמש ב-UPPER_CASE עבור constants

### File Structure
```
components/
  ui/           # רכיבי UI בסיסיים
  auth/         # רכיבי אימות
  dashboard/    # רכיבי דשבורד
  common/       # רכיבים משותפים

lib/            # utilities ו-helpers
types/          # TypeScript types
hooks/          # custom hooks
store/          # state management
```

## 🧪 בדיקות

### בדיקות יחידה
```bash
npm run test
```

### בדיקות אינטגרציה
```bash
npm run test:integration
```

### בדיקות E2E
```bash
npm run test:e2e
```

## 📝 תיעוד

### קוד
- כתוב הערות ברורות עבור לוגיקה מורכבת
- השתמש ב-JSDoc עבור functions
- שמור על קוד נקי וקריא

### README
- עדכן את README.md כאשר מוסיפים תכונות חדשות
- הוסף הוראות התקנה והפעלה
- כלול דוגמאות שימוש

## 🚀 תהליך Release

1. **עדכן את הגרסה** ב-package.json
2. **עדכן את CHANGELOG.md**
3. **צור tag חדש**:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```
4. **צור Release** ב-GitHub

## 🐛 דיווח על בעיות אבטחה

אם מצאת בעיית אבטחה, אנא:
1. **אל תפתח issue ציבורי**
2. **שלח email** ל-security@languageconnect.com
3. **כלול**:
   - תיאור מפורט של הבעיה
   - שלבים לשחזור
   - מידע על הסביבה

## 📞 יצירת קשר

- **Email**: contact@languageconnect.com
- **Discord**: [LanguageConnect Community](https://discord.gg/languageconnect)
- **GitHub Discussions**: [Discussions](https://github.com/your-username/languageconnect/discussions)

## 📄 רישיון

על ידי תרומה לפרויקט, אתה מסכים שהקוד שלך יופץ תחת רישיון MIT.

---

תודה על התרומה שלך! 🙏



