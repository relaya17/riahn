# הוראות התקנה - LanguageConnect Mobile

## דרישות מוקדמות

### 1. Node.js
```bash
# התקן Node.js גרסה 16 ומעלה
# הורד מ: https://nodejs.org/
```

### 2. React Native CLI
```bash
npm install -g react-native-cli
```

### 3. Android Studio (לפיתוח Android)
- הורד מ: https://developer.android.com/studio
- התקן Android SDK
- הגדר את ANDROID_HOME

### 4. Xcode (לפיתוח iOS - macOS בלבד)
- הורד מה-App Store
- התקן CocoaPods:
```bash
sudo gem install cocoapods
```

## התקנה

### 1. התקנת תלויות
```bash
cd mobile
npm install
```

### 2. התקנת תלויות iOS (macOS בלבד)
```bash
cd ios
pod install
cd ..
```

### 3. הגדרת Android
1. פתח את Android Studio
2. הגדר את Android SDK
3. הפעל אמולטור או חבר מכשיר Android

### 4. הגדרת iOS (macOS בלבד)
1. פתח את Xcode
2. בחר את הפרויקט
3. הגדר את ה-Team ID

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

## פתרון בעיות נפוצות

### שגיאת Metro
```bash
npx react-native start --reset-cache
```

### שגיאת Gradle
```bash
cd android
./gradlew clean
cd ..
```

### שגיאת CocoaPods
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### שגיאת Node Modules
```bash
rm -rf node_modules
npm install
```

## מבנה הפרויקט

```
mobile/
├── src/
│   ├── App.tsx                 # קומפוננטה ראשית
│   ├── components/             # רכיבים
│   │   ├── ui/                 # רכיבי UI בסיסיים
│   │   ├── lessons/            # רכיבי שיעורים
│   │   └── chat/               # רכיבי צ'אט
│   ├── screens/                # מסכים
│   ├── providers/              # Context providers
│   ├── hooks/                  # Custom hooks
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   └── constants/              # קבועים
├── android/                    # קוד Android
├── ios/                        # קוד iOS
├── package.json
├── tsconfig.json
└── README.md
```

## תכונות

- ✅ התחברות והרשמה
- ✅ תמיכה רב-לשונית
- ✅ ניווט בין מסכים
- ✅ רכיבי UI מתקדמים
- ✅ מערכת שיעורים
- ✅ צ'אט רב-לשוני
- ✅ תמיכה במצלמה
- ✅ תמיכה באודיו
- ✅ שמירת הגדרות מקומית
- ✅ ניהול הרשאות
- ✅ API integration
- ✅ Error handling
- ✅ Loading states
- ✅ Offline support

## פיתוח

### הוספת רכיב חדש
1. צור קובץ ב-`src/components/`
2. הוסף ל-`src/components/index.tsx`
3. השתמש ברכיב במסכים

### הוספת מסך חדש
1. צור קובץ ב-`src/screens/`
2. הוסף ל-`App.tsx`
3. הוסף ניווט לפי הצורך

### הוספת API endpoint
1. עדכן את `src/constants/index.ts`
2. השתמש ב-`useApi` hook
3. הוסף error handling

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
