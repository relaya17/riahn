@echo off
echo 🚀 העלאה ל-GitHub - RIAHN Platform
echo ===================================
echo.

echo ⚠️  לפני שתמשיך:
echo    1. לך ל: https://github.com/new
echo    2. שם ה-repository: riahn-language-platform
echo    3. לחץ Create repository
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
    echo 📋 הוראות מפורטות: QUICK_DEPLOY.md
) else (
    echo.
    echo ❌ שגיאה בהעלאת הקוד!
    echo בדוק שהגדרת repository ב-GitHub ושהפרטים נכונים.
)

echo.
pause
