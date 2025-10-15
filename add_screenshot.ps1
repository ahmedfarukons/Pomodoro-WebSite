# Screenshot ekleme scripti
# Bu scripti çalıştırmadan önce ekran görüntüsünü panoya kopyalayın (PrintScreen veya Snipping Tool ile)

Write-Host "Ekran görüntüsünü eklemek için:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Yukarıdaki ekran görüntüsünü sağ tıklayıp 'Resmi Farklı Kaydet' yapın" -ForegroundColor Yellow
Write-Host "2. Bu klasöre kaydedin: docs\screenshot.png" -ForegroundColor Yellow
Write-Host ""
Write-Host "Veya daha kolay:" -ForegroundColor Green
Write-Host "1. Tarayıcıda resmi sağ tıklayın" -ForegroundColor Green
Write-Host "2. 'Adresi kopyala' seçin" -ForegroundColor Green
Write-Host "3. Aşağıdaki komutu çalıştırın:" -ForegroundColor Green
Write-Host ""
Write-Host 'Invoke-WebRequest -Uri "BURAYA_YAPISTIR" -OutFile "docs\screenshot.png"' -ForegroundColor White
Write-Host ""
Write-Host "VEYA internetten direkt çekelim:" -ForegroundColor Magenta
Write-Host ""

$answer = Read-Host "Ekran görüntüsünü docs klasörüne koydunuz mu? (e/h)"

if ($answer -eq "e") {
    Write-Host "Git'e ekleniyor..." -ForegroundColor Green
    git add docs/screenshot.png
    git add README.md
    git add docs/.gitkeep
    git commit -m "README'ye ekran görüntüsü eklendi"
    
    $push = Read-Host "GitHub'a push yapalım mı? (e/h)"
    if ($push -eq "e") {
        git push
        Write-Host "Tamamlandı! GitHub'da README'yi kontrol edin." -ForegroundColor Green
    }
} else {
    Write-Host "Önce screenshot.png dosyasını docs klasörüne ekleyin, sonra tekrar çalıştırın." -ForegroundColor Yellow
}

