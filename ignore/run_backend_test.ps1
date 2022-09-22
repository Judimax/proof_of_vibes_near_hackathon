Set-Location Env:

# dev
Set-Content -Path FLASK_BACKEND_ENV              -Value "TEST"
Set-Content -Path NEWSAPI_KEY                    -Value "cd0a6229f95e40c5b2a2ad237bb4eef0"
Set-Content -Path SPOTIFY_APP_0_CLIENT_ID        -Value "075fff421dd64a1a9bfbcdf3d8dc9434"
Set-Content -Path SPOTIFY_APP_0_CLIENT_SECRET    -Value "795bbcb22a73453fa99b27a282337460"


Set-Location C:\Users\Restop-2345\My_Notebook\cases\FinancialUpwardCase\SoftwareEngineer\Jobs\NIBLS\projects\nibls_coin_application\apps\zero\backend\flask\dev\unit_tests
python run_tests.py
Set-Location C:\Users\Restop-2345\My_Notebook\cases\FinancialUpwardCase\SoftwareEngineer\Jobs\NIBLS\projects\nibls_coin_application\ignore
