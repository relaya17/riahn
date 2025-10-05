@echo off
echo 🚀 מתחיל תהליך העלאה ל-GitHub...

echo.
echo ⚠️  לפני שתמשיך, ודא שיצרת repository ב-GitHub:
echo    https://github.com/new
echo    שם: riahn-language-platform
echo.

set /p USERNAME="הכנס את שם המשתמש שלך ב-GitHub: "
if "%USERNAME%"=="" (
    echo ❌ שם משתמש לא הוזן!
    pause
    exit /b 1
)

echo.
echo 📤 מעלה את הקוד ל-GitHub...

REM הוסף את ה-remote repository
git remote add origin https://github.com/%USERNAME%/riahn-language-platform.git

REM העלה את הקוד
git push -u origin master

if %errorlevel% equ 0 (
    echo.
    echo ✅ הקוד הועלה בהצלחה ל-GitHub!
    echo.
    echo 🌐 עכשיו לך ל-Netlify:
    echo    https://app.netlify.com/
    echo.
    echo 📋 הוראות מפורטות נמצאות בקובץ: DEPLOYMENT_INSTRUCTIONS.md
) else (
    echo.
    echo ❌ שגיאה בהעלאת הקוד!
    echo בדוק שהגדרת repository ב-GitHub ושהפרטים נכונים.
)

echo.
pause
