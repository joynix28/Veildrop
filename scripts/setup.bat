@echo off
REM =============================================================================
REM  VeilDrop - step-by-step setup (Windows, legacy batch launcher)
REM  This launcher simply runs the full PowerShell setup script,
REM  which guides you through every step (Node.js check, dependencies,
REM  Cloudflare login, D1 database, configuration, schema, deploy).
REM  Usage: double-click this file, or run: scripts\setup.bat
REM =============================================================================
setlocal
title VeilDrop - Setup
echo ======================================================
echo   VeilDrop setup (Windows)
echo   A PowerShell script will guide you through everything.
echo ======================================================
echo.

REM Check PowerShell availability (preinstalled on all modern Windows)
where powershell >nul 2>nul
if errorlevel 1 (
    echo [ERROR] PowerShell not found. Windows 10/11 ships with it by default.
    pause
    exit /b 1
)

REM Run the PowerShell setup with execution policy relaxed for this process only
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup.ps1"
set EXITCODE=%errorlevel%

echo.
if %EXITCODE%==0 (
    echo [OK] Setup finished. See the NEXT STEPS above.
) else (
    echo [ERROR] Setup stopped with code %EXITCODE%.
)
pause