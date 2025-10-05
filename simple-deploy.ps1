Write-Host "GitHub Upload Script" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Go to: https://github.com/new" -ForegroundColor Yellow
Write-Host "2. Repository name: riahn-language-platform" -ForegroundColor Yellow
Write-Host "3. Click Create repository" -ForegroundColor Yellow
Write-Host ""
$username = Read-Host "Enter your GitHub username"
Write-Host ""
Write-Host "Adding remote origin..." -ForegroundColor Blue
git remote add origin "https://github.com/$username/riahn-language-platform.git"
Write-Host "Pushing code to GitHub..." -ForegroundColor Blue
git push -u origin master
Write-Host ""
Write-Host "Done! Now go to Netlify:" -ForegroundColor Green
Write-Host "https://app.netlify.com/" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
