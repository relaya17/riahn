# LanguageConnect - אפליקציה ללימוד שפות וחיבור בין משתמשים

LanguageConnect היא אפליקציה מתקדמת ללימוד שפות וחיבור בין משתמשים מכל העולם. האפליקציה תומכת בעברית, ערבית, אנגלית, סינהלית וטמילית, ומציעה חוויית למידה אינטראקטיבית עם תרגום אוטומטי.

## 🌟 תכונות עיקריות

### 🔐 מערכת אימות מתקדמת
- כניסה והרשמה עם אימייל וסיסמה
- כניסה מהירה עם Google ו-Facebook
- אימות דו-שלבי
- שחזור סיסמה

### 📚 שיעורים ותרגולים
- שיעורים אינטראקטיביים עם טקסט, אודיו ווידאו
- חידונים ותרגולים עם משוב מיידי
- מעקב התקדמות אישי
- הישגים ותגמולים

### 🌍 Global Connect
- חיבור בין משתמשים מכל העולם
- צ'אט 1:1 וקבוצתי עם תרגום אוטומטי
- שיחות וידאו וקוליות
- פורומים לפי נושאים

### 🗣️ תרגום אוטומטי
- תרגום בזמן אמת של הודעות
- תמיכה ב-5 שפות: עברית, ערבית, אנגלית, סינהלית, טמילית
- זיהוי שפה אוטומטי

### 🎨 ממשק משתמש מתקדם
- עיצוב רספונסיבי לכל המכשירים
- תמיכה במצב כהה ובהיר
- נגישות מלאה (קוראי מסך, ניווט מקלדת)
- תמיכה ב-RTL ו-LTR

## 🛠️ טכנולוגיות

### Frontend
- **Next.js 14** - React framework עם App Router
- **TypeScript** - טיפוסים חזקים
- **Tailwind CSS** - עיצוב מהיר ורספונסיבי
- **Framer Motion** - אנימציות חלקות
- **React Hook Form** - ניהול טפסים
- **React Query** - ניהול state ונתונים

### Backend
- **Node.js** - סביבת JavaScript
- **MongoDB** - מסד נתונים NoSQL
- **Mongoose** - ODM עבור MongoDB
- **Socket.IO** - תקשורת בזמן אמת
- **WebRTC** - שיחות וידאו וקוליות

### Authentication & Security
- **Firebase Auth** - אימות משתמשים
- **JWT** - טוקנים מאובטחים
- **HTTPS** - הצפנה מלאה
- **End-to-End Encryption** - הצפנת הודעות

### Translation
- **Google Cloud Translation API** - תרגום אוטומטי
- **Microsoft Translator API** - חלופה לתרגום

## 📦 התקנה

### דרישות מוקדמות
- Node.js 18+ 
- MongoDB 6+
- npm או yarn

### שלבי התקנה

1. **שכפול הפרויקט**
```bash
git clone https://github.com/your-username/languageconnect.git
cd languageconnect
```

2. **התקנת תלויות**
```bash
npm install
# או
yarn install
```

3. **הגדרת משתני סביבה**
```bash
cp env.example .env.local
```

ערוך את קובץ `.env.local` והוסף את הערכים שלך:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Database
MONGODB_URI=mongodb://localhost:27017/languageconnect

# Translation API
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Socket.IO
SOCKET_IO_URL=http://localhost:3001
```

4. **הפעלת השרת**
```bash
npm run dev
# או
yarn dev
```

האפליקציה תהיה זמינה בכתובת: `http://localhost:3000`

## 🔧 הגדרת Firebase

1. צור פרויקט חדש ב-[Firebase Console](https://console.firebase.google.com/)
2. הפעל Authentication עם Email/Password, Google ו-Facebook
3. צור מסד נתונים Firestore
4. הוסף את פרטי הפרויקט לקובץ `.env.local`

## 🗄️ הגדרת MongoDB

### MongoDB מקומי
```bash
# התקנת MongoDB
brew install mongodb-community  # macOS
# או
sudo apt-get install mongodb    # Ubuntu

# הפעלת השרת
mongod
```

### MongoDB Atlas (מומלץ)
1. צור חשבון ב-[MongoDB Atlas](https://www.mongodb.com/atlas)
2. צור cluster חדש
3. קבל את connection string
4. הוסף אותו לקובץ `.env.local`

## 🌐 הגדרת API לתרגום

### Google Cloud Translation
1. צור פרויקט ב-[Google Cloud Console](https://console.cloud.google.com/)
2. הפעל את Cloud Translation API
3. צור API key
4. הוסף אותו לקובץ `.env.local`

### Microsoft Translator (אופציונלי)
1. צור חשבון ב-[Azure Portal](https://portal.azure.com/)
2. צור Translator resource
3. קבל את API key
4. הוסף אותו לקובץ `.env.local`

## 🚀 הפעלה בפרודקשן

### בניית הפרויקט
```bash
npm run build
```

### הפעלת השרת
```bash
npm start
```

### Docker (אופציונלי)
```bash
# בניית התמונה
docker build -t languageconnect .

# הפעלת הקונטיינר
docker run -p 3000:3000 languageconnect
```

## 📱 תכונות נוספות

### נגישות
- תמיכה בקוראי מסך
- ניווט מקלדת מלא
- צבעים ניגודיים
- תמיכה ב-RTL ו-LTR

### ביצועים
- Lazy loading של רכיבים
- Image optimization
- Code splitting
- Caching מתקדם

### אבטחה
- הצפנת סיסמאות
- Rate limiting
- CORS configuration
- Input validation

## 🤝 תרומה לפרויקט

אנחנו שמחים לקבל תרומות! בבקשה:

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📄 רישיון

פרויקט זה מופץ תחת רישיון MIT. ראה קובץ `LICENSE` לפרטים נוספים.

## 📞 יצירת קשר

- **Email**: contact@languageconnect.com
- **Website**: https://languageconnect.com
- **GitHub**: https://github.com/languageconnect

## 🙏 תודות

תודה לכל התורמים והמשתמשים שתומכים בפרויקט הזה!

---

**LanguageConnect** - חיבור בין שפות ותרבויות 🌍
