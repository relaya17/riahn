# הוראות פריסה ל-Netlify

## 🚀 פריסה ל-Netlify

### שלב 1: הכנה לפריסה

1. **ודא שהפרויקט נבנה בהצלחה:**
   ```bash
   pnpm build
   ```

2. **ודא שכל התלויות מותקנות:**
   ```bash
   pnpm install
   ```

### שלב 2: יצירת חשבון Netlify

1. לך ל-[netlify.com](https://netlify.com)
2. הירשם עם GitHub/GitLab/Bitbucket
3. התחבר לחשבון שלך

### שלב 3: פריסה דרך Git

#### אופציה A: פריסה אוטומטית מ-GitHub

1. **דחוף את הקוד ל-GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **ב-Netlify:**
   - לחץ על "New site from Git"
   - בחר את ה-repository שלך
   - הגדר:
     - **Build command:** `pnpm build`
     - **Publish directory:** `.next`
     - **Node version:** `18`

#### אופציה B: פריסה ידנית

1. **בנה את הפרויקט:**
   ```bash
   pnpm build
   ```

2. **צור קובץ ZIP:**
   - דחוס את כל הקבצים (חוץ מ-`node_modules`)
   - העלה ל-Netlify דרך "Deploy manually"

### שלב 4: הגדרת משתני סביבה

ב-Netlify Dashboard:
1. לך ל-Site settings → Environment variables
2. הוסף את המשתנים הבאים:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/languageconnect

# Translation
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# JWT
JWT_SECRET=your_jwt_secret_key

# NextAuth
NEXTAUTH_URL=https://your-app-name.netlify.app
NEXTAUTH_SECRET=your_nextauth_secret

# App URL
NEXT_PUBLIC_APP_URL=https://your-app-name.netlify.app
```

### שלב 5: הגדרות נוספות

#### Custom Domain (אופציונלי)
1. ב-Netlify Dashboard → Domain settings
2. הוסף domain מותאם אישית
3. הגדר DNS records

#### SSL Certificate
- Netlify מספק SSL אוטומטי
- ודא שה-HTTPS מופעל

#### Build Settings
```toml
[build]
  command = "pnpm build"
  publish = ".next"
  
[build.environment]
  NODE_VERSION = "18"
  PNPM_VERSION = "8"
```

### שלב 6: בדיקת הפריסה

1. **בדוק שהאתר עובד:**
   - לך לכתובת ה-Netlify שלך
   - ודא שכל הדפים נטענים

2. **בדוק פונקציונליות:**
   - התחברות/הרשמה
   - שיעורים
   - צ'אט
   - תרגום

### שלב 7: CI/CD (אופציונלי)

#### GitHub Actions
צור `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install pnpm
      run: npm install -g pnpm
      
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: '.next'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### פתרון בעיות נפוצות

#### שגיאת Build
```bash
# בדוק שהפרויקט נבנה מקומית
pnpm build

# בדוק שגיאות TypeScript
pnpm type-check
```

#### שגיאות Environment Variables
- ודא שכל המשתנים מוגדרים ב-Netlify
- בדוק שהשמות נכונים (NEXT_PUBLIC_)

#### שגיאות API
- ודא שה-API routes עובדים
- בדוק CORS settings
- ודא שה-database מחובר

### קישורים שימושיים

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

**תאריך עדכון:** 2024-01-01
**גרסה:** 1.0.0
