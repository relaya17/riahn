# LanguageConnect Mobile

אפליקציה ללימוד שפות וחיבור בין משתמשים - גרסת מובייל

## התקנה

### דרישות מוקדמות

- Node.js (גרסה 16 ומעלה)
- React Native CLI
- Android Studio (לפיתוח Android)
- Xcode (לפיתוח iOS - macOS בלבד)

### התקנת תלויות

```bash
cd mobile
npm install
```

### הגדרת Android

1. פתח את Android Studio
2. הגדר את Android SDK
3. הפעל אמולטור או חבר מכשיר Android

### הגדרת iOS (macOS בלבד)

1. התקן Xcode מה-App Store
2. התקן את CocoaPods:
```bash
sudo gem install cocoapods
```

3. התקן תלויות iOS:
```bash
cd ios && pod install && cd ..
```

## הפעלה

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Metro Bundler
```bash
npm start
```

## מבנה הפרויקט

```
mobile/
├── src/
│   ├── App.tsx                 # קומפוננטה ראשית
│   ├── providers/              # Context providers
│   │   ├── AuthProvider.tsx    # ניהול אימות
│   │   └── LanguageProvider.tsx # ניהול שפות
│   └── screens/                # מסכים
│       ├── AuthScreen.tsx      # מסך התחברות
│       ├── DashboardScreen.tsx # מסך ראשי
│       ├── ProfileScreen.tsx   # מסך פרופיל
│       ├── LessonsScreen.tsx   # מסך שיעורים
│       ├── ChatScreen.tsx      # מסך צ'אט
│       └── SettingsScreen.tsx  # מסך הגדרות
├── android/                    # קוד Android
├── ios/                        # קוד iOS
├── package.json
├── tsconfig.json
└── README.md
```

## תכונות

- ✅ התחברות והרשמה
- ✅ תמיכה רב-לשונית (עברית, אנגלית, ערבית)
- ✅ ניווט בין מסכים
- ✅ עיצוב מותאם למובייל
- ✅ שמירת הגדרות מקומית
- ✅ ניהול מצב משתמש

## פיתוח

### הוספת מסך חדש

1. צור קובץ חדש ב-`src/screens/`
2. הוסף את המסך ל-`App.tsx`
3. הוסף ניווט לפי הצורך

### הוספת תרגום

1. עדכן את `LanguageProvider.tsx`
2. הוסף את המפתח החדש לכל השפות
3. השתמש ב-`t()` במסכים

## בנייה לפריסה

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

## תרומה לפרויקט

1. Fork את הפרויקט
2. צור branch חדש
3. בצע את השינויים
4. שלח Pull Request

## רישיון

MIT License
