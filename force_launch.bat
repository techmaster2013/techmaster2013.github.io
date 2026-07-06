@echo off
cls
set LOCALAPPDATA=%cd%
set APPDATA=%cd%
mkdir "Versions"
mkdir "Versions\version-2e8286e986f84987"
copy /y RobloxStudioLauncherBeta.exe "Versions\version-2e8286e986f84987\"
cd "Versions\version-2e8286e986f84987"
start RobloxStudioLauncherBeta.exe -ide
