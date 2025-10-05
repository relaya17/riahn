# 🚀 סקריפט העלאה אוטומטי ל-GitHub
Write-Host "🚀 מתחיל תהליך העלאה ל-GitHub..." -ForegroundColor Green

Write-Host ""
Write-Host "⚠️  לפני שתמשיך, ודא שיצרת repository ב-GitHub:" -ForegroundColor Yellow
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host "   שם: riahn-language-platform" -ForegroundColor Cyan
Write-Host ""

$username = Read-Host "הכנס את שם המשתמש שלך ב-GitHub"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ שם משתמש לא הוזן!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "📤 מעלה את הקוד ל-GitHub..." -ForegroundColor Blue

try {
    # הוסף את ה-remote repository
    git remote add origin "https://github.com/$username/riahn-language-platform.git"
    
    # העלה את הקוד
    git push -u origin master
    
    Write-Host ""
    Write-Host "✅ הקוד הועלה בהצלחה ל-GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 עכשיו לך ל-Netlify:" -ForegroundColor Cyan
    Write-Host "   https://app.netlify.com/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 הוראות מפורטות נמצאות בקובץ: DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor Yellow
}
catch {
    Write-Host ""
    Write-Host "❌ שגיאה בהעלאת הקוד!" -ForegroundColor Red
    Write-Host "בדוק שהגדרת repository ב-GitHub ושהפרטים נכונים." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to exit"
