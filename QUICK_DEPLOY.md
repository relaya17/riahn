# 🚀 הוראות דפלוי מהירות

## ✅ מה שכבר מוכן:
- כל הקוד תוקן ועובד
- הבנייה עוברת בהצלחה
- כל הקבצים ב-Git repository

## 🎯 שלבים לדפלוי:

### 1. יצירת Repository ב-GitHub:
1. לך ל: **https://github.com/new**
2. שם ה-repository: **riahn-language-platform**
3. לחץ **Create repository**

### 2. העלאת הקוד:
```bash
git remote add origin https://github.com/YOUR_USERNAME/riahn-language-platform.git
git push -u origin master
```

### 3. הגדרת Netlify:
1. לך ל: **https://app.netlify.com/**
2. לחץ **New site from Git**
3. בחר **GitHub**
4. בחר את **riahn-language-platform**
5. הגדרות:
   - **Build command:** `pnpm build`
   - **Publish directory:** `.next`
6. לחץ **Deploy site**

### 4. משתני סביבה ב-Netlify:
ב-**Site settings > Environment variables** הוסף:
```
MONGODB_URI=mongodb://localhost:27017/riahn
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-site.netlify.app
```

## 🎉 סיום!
האתר יהיה זמין ברשת תוך 2-3 דקות!

---
**נוצר על ידי AI Assistant** 🤖
