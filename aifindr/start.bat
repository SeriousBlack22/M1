@echo off
echo Starting AIFindr application...

echo Checking for Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies.
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo Building the application...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build the application.
    echo Please check the error messages above for more details.
    pause
    exit /b 1
)

echo Starting the application...
call npm start
if %errorlevel% neq 0 (
    echo Error: Failed to start the application.
    echo Please check the error messages above for more details.
    pause
    exit /b 1
) 