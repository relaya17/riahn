# מדריך שחרור

מדריך זה מסביר איך לשחרר גרסה חדשה של LanguageConnect.

## תהליך שחרור

### 1. הכנה לשחרור

```bash
# ודא שאתה על branch main
git checkout main
git pull origin main

# ודא שהכל עובד
npm run lint
npm run type-check
npm run test
npm run build
```

### 2. עדכון גרסה

```bash
# עדכן את הגרסה ב-package.json
npm version patch  # או minor, major

# או עדכן ידנית
# 1.0.0 -> 1.0.1 (patch)
# 1.0.0 -> 1.1.0 (minor)
# 1.0.0 -> 2.0.0 (major)
```

### 3. עדכון CHANGELOG

עדכן את `CHANGELOG.md` עם השינויים בגרסה החדשה:

```markdown
## [1.0.1] - 2024-01-15

### Added
- תכונה חדשה

### Changed
- שינוי בתכונה קיימת

### Fixed
- תיקון באג
```

### 4. יצירת Release

```bash
# צור tag
git tag -a v1.0.1 -m "Release version 1.0.1"

# Push את ה-tag
git push origin v1.0.1
```

### 5. יצירת GitHub Release

1. לך ל-[Releases](https://github.com/your-username/languageconnect/releases)
2. לחץ על "Create a new release"
3. בחר את ה-tag שיצרת
4. הוסף תיאור של השינויים
5. לחץ על "Publish release"

## סוגי גרסאות

### Patch (1.0.0 -> 1.0.1)
- תיקון באגים
- שיפורי ביצועים
- תיקוני אבטחה

### Minor (1.0.0 -> 1.1.0)
- תכונות חדשות
- שיפורים בתכונות קיימות
- שינויים שאינם שוברים תאימות

### Major (1.0.0 -> 2.0.0)
- שינויים שבורים
- שינויים משמעותיים בארכיטקטורה
- הסרת תכונות

## בדיקות לפני שחרור

- [ ] כל הבדיקות עוברות
- [ ] הקוד עובר linting
- [ ] הקוד עובר type checking
- [ ] האפליקציה נבנית בהצלחה
- [ ] האפליקציה עובדת בדפדפן
- [ ] האפליקציה עובדת במכשיר נייד
- [ ] CHANGELOG מעודכן
- [ ] גרסה מעודכנת ב-package.json

## שחרור אוטומטי

הפרויקט מוגדר עם GitHub Actions לשחרור אוטומטי:

1. **Push ל-main** מפעיל את ה-CI
2. **יצירת tag** מפעיל את ה-deployment
3. **האפליקציה נפרסת** אוטומטית

## שחרור ידני

אם אתה צריך לשחרר ידנית:

```bash
# בנייה
npm run build

# הפעלה
npm start
```

## שחרור Docker

```bash
# בניית תמונה
docker build -t languageconnect:latest .

# הפעלת קונטיינר
docker run -p 3000:3000 languageconnect:latest
```

## שחרור לפרודקשן

### Vercel
```bash
# התקנת Vercel CLI
npm i -g vercel

# פריסה
vercel --prod
```

### Netlify
```bash
# התקנת Netlify CLI
npm i -g netlify-cli

# פריסה
netlify deploy --prod
```

### Docker
```bash
# בנייה
docker build -t languageconnect .

# הפעלה
docker run -p 3000:3000 languageconnect
```

## מעקב אחר שחרורים

- **GitHub Releases**: [Releases](https://github.com/your-username/languageconnect/releases)
- **GitHub Actions**: [Actions](https://github.com/your-username/languageconnect/actions)
- **Docker Hub**: [Docker Hub](https://hub.docker.com/r/your-username/languageconnect)

## בעיות נפוצות

### שגיאת בנייה
```bash
# נקה cache
npm cache clean --force
rm -rf .next
npm run build
```

### שגיאת deployment
- בדוק את משתני הסביבה
- ודא שהכללים ב-Firebase מוגדרים נכון
- בדוק את הלוגים ב-GitHub Actions

### שגיאת Docker
```bash
# נקה תמונות ישנות
docker system prune -a

# בנייה מחדש
docker build --no-cache -t languageconnect .
```

## תמיכה

אם יש לך בעיה עם השחרור:
- פתח issue ב-GitHub
- שלח email ל-support@languageconnect.com
- הצטרף ל-Discord שלנו

---

**תאריך עדכון אחרון**: 2024-01-01



