# 🚀 הוראות דפלוי ל-Netlify

## ✅ מה שכבר תוקן:
- ✅ הוספתי `"use client"` לכל הקומפוננטות הבעייתיות
- ✅ יצרתי `ClientProviders` component
- ✅ עדכנתי את `layout.tsx`
- ✅ תיקנתי שגיאות TypeScript
- ✅ יצרתי קובץ `.env.local`
- ✅ תיקנתי בעיות `window is not defined`
- ✅ הוספתי את החבילה `critters`
- ✅ כל הקבצים נשמרו ב-Git repository

## 📋 שלבים לדפלוי:

### 1. יצירת Repository ב-GitHub:
1. לך ל-https://github.com/new
2. שם ה-repository: `riahn-language-platform`
3. תיאור: `RIAHN - פלטפורמה ללמידת שפות וחיבור בין תרבויות`
4. בחר Public או Private (לפי הצורך)
5. אל תסמן "Add a README file" (כבר יש לנו)
6. לחץ "Create repository"

### 2. העלאת הקוד ל-GitHub:
```bash
# הוסף את ה-remote repository (החלף את USERNAME בשם המשתמש שלך)
git remote add origin https://github.com/USERNAME/riahn-language-platform.git

# העלה את הקוד
git push -u origin master
```

### 3. הגדרת Netlify:
1. לך ל-https://app.netlify.com/
2. לחץ על "New site from Git"
3. בחר "GitHub"
4. בחר את ה-repository `riahn-language-platform`
5. הגדרות בנייה:
   - **Build command:** `pnpm build`
   - **Publish directory:** `.next`
   - **Base directory:** (השאר ריק)
6. לחץ "Deploy site"

### 4. הגדרת משתני סביבה ב-Netlify:
1. ב-Netlify, לך ל-**Site settings > Environment variables**
2. הוסף את המשתנים הבאים:
   ```
   MONGODB_URI = mongodb://localhost:27017/riahn
   NEXTAUTH_SECRET = your-super-secret-jwt-key-change-in-production
   NEXTAUTH_URL = https://your-site-name.netlify.app
   ```

### 5. בדיקת הדפלוי:
- Netlify יתחיל לבנות את האתר אוטומטית
- תהליך הבנייה יקח כ-2-3 דקות
- בסיום, האתר יהיה זמין בכתובת: `https://random-name.netlify.app`

## 🎉 סיום!
האתר שלך יהיה זמין ברשת עם כל התיקונים שביצענו!

## 📞 תמיכה:
אם יש בעיות, בדוק:
1. שהקוד הועלה ל-GitHub בהצלחה
2. שמשתני הסביבה מוגדרים ב-Netlify
3. שהבנייה עוברת ללא שגיאות

---
**נוצר אוטומטית על ידי AI Assistant** 🤖
