@echo off
setlocal enabledelayedexpansion

echo ===============================
echo  Git + Docker One-Shot Runner
echo ===============================
echo.

REM -----------------------------
REM Step 1: Git add
REM -----------------------------
echo [1/3] Git add...
git add .

REM -----------------------------
REM Step 2: Git commit
REM -----------------------------
echo.
echo [2/3] Git commit...
git commit -m "Auto update %date% %time%" || echo No changes to commit.

REM -----------------------------
REM Step 3: Git push
REM -----------------------------
echo.
echo [3/3] Git push to master...
git push -u origin master
