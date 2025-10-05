# מדיניות אבטחה

## דיווח על בעיות אבטחה

אם מצאת בעיית אבטחה בפרויקט LanguageConnect, אנא דווח עליה באופן אחראי.

### איך לדווח

1. **אל תפתח issue ציבורי** עבור בעיות אבטחה
2. **שלח email** ל-security@languageconnect.com
3. **כלול את הפרטים הבאים**:
   - תיאור מפורט של הבעיה
   - שלבים לשחזור הבעיה
   - מידע על הסביבה (דפדפן, מערכת הפעלה, וכו')
   - צילומי מסך או קבצים רלוונטיים

### מה לצפות

- **תגובה תוך 48 שעות** על קבלת הדיווח
- **תגובה מפורטת תוך שבוע** עם תוכנית טיפול
- **עדכונים שוטפים** על התקדמות הטיפול
- **קרדיט** על גילוי הבעיה (אם תרצה)

### סוגי בעיות אבטחה

אנא דווח על:

- **התקפות XSS** (Cross-Site Scripting)
- **התקפות CSRF** (Cross-Site Request Forgery)
- **SQL Injection**
- **Authentication bypass**
- **Authorization flaws**
- **Data exposure**
- **Session management issues**
- **Input validation problems**
- **Cryptographic weaknesses**

### מה לא לדווח

אל תדווח על:

- בעיות שאינן קשורות לאבטחה
- בעיות שכבר דווחו
- בעיות בתכונות שאינן מופעלות
- בעיות בגרסאות ישנות שלא נתמכות

## מדיניות אבטחה

### הצפנה

- כל התקשורת מוצפנת עם HTTPS
- סיסמאות מוצפנות עם bcrypt
- הודעות מוצפנות עם End-to-End Encryption
- נתונים רגישים מוצפנים במסד הנתונים

### אימות

- שימוש ב-Firebase Auth לאימות
- תמיכה באימות דו-שלבי
- Rate limiting על ניסיונות כניסה
- Session management מאובטח

### הרשאות

- Role-based access control
- Principle of least privilege
- Regular audit של הרשאות
- Separation of concerns

### קלט

- Input validation על כל הקלטים
- Sanitization של נתונים
- Protection מפני injection attacks
- Content Security Policy

### מעקב

- Logging של פעולות חשובות
- Monitoring של פעילות חשודה
- Alerting על אירועי אבטחה
- Regular security audits

## עדכוני אבטחה

### עדכונים רגילים

- עדכוני אבטחה מתפרסמים ב-[Releases](https://github.com/your-username/languageconnect/releases)
- עדכונים דחופים מתפרסמים ב-[Security Advisories](https://github.com/your-username/languageconnect/security/advisories)

### עדכונים דחופים

עדכונים דחופים מתפרסמים:

1. **ב-GitHub Security Advisories**
2. **ב-email** לכל המשתמשים הרשומים
3. **ב-blog** של הפרויקט
4. **ב-social media**

## תודות

תודה לכל החוקרים שתרמו לגילוי בעיות אבטחה:

- [רשימת תורמים](https://github.com/your-username/languageconnect/security/advisories)

## יצירת קשר

- **Email**: security@languageconnect.com
- **PGP Key**: [Download](https://languageconnect.com/security/pgp-key.asc)

---

**תאריך עדכון אחרון**: 2024-01-01



