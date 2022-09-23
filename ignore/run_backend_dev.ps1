Set-Location Env:

# dev
Set-Content -Path MINTBASE_API_KEY               -Value "4345a948-2a4f-4511-b1f8-5162544b40a1"
Set-Content -Path FLASK_BACKEND_ENV              -Value "DEV"
Set-Location C:\Users\Restop-2345\My_Notebook\cases\FinancialUpwardCase\SoftwareEngineer\projects\near_nft_hackathon\apps\zero\backend\flask\dev
python app.py
Set-Location C:\Users\Restop-2345\My_Notebook\cases\FinancialUpwardCase\SoftwareEngineer\projects\near_nft_hackathon\ignore
./run_backend_dev.ps1