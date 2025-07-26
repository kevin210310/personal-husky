# Script de diagnóstico para Husky
Write-Host "🔍 Diagnóstico de Husky" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar si es un repositorio Git
Write-Host "1. Verificando repositorio Git..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Repositorio Git encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ No es un repositorio Git. Ejecuta: git init" -ForegroundColor Red
    exit 1
}

# 2. Verificar instalación de Husky
Write-Host "2. Verificando instalación de Husky..." -ForegroundColor Yellow
if (Test-Path "node_modules/husky") {
    Write-Host "✅ Husky instalado en node_modules" -ForegroundColor Green
} else {
    Write-Host "❌ Husky no encontrado. Ejecuta: npm install husky --save-dev" -ForegroundColor Red
}

# 3. Verificar package.json
Write-Host "3. Verificando package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    if ($packageJson.scripts.prepare -eq "husky") {
        Write-Host "✅ Script 'prepare' configurado correctamente" -ForegroundColor Green
    } else {
        Write-Host "❌ Script 'prepare' no configurado. Debe ser: 'husky'" -ForegroundColor Red
    }
    
    if ($packageJson.devDependencies.husky) {
        Write-Host "✅ Husky listado en devDependencies" -ForegroundColor Green
    } else {
        Write-Host "❌ Husky no está en devDependencies" -ForegroundColor Red
    }
} else {
    Write-Host "❌ package.json no encontrado" -ForegroundColor Red
}

# 4. Verificar directorio .husky
Write-Host "4. Verificando directorio .husky..." -ForegroundColor Yellow
if (Test-Path ".husky") {
    Write-Host "✅ Directorio .husky existe" -ForegroundColor Green
    
    if (Test-Path ".husky/_") {
        Write-Host "✅ Directorio .husky/_ existe" -ForegroundColor Green
    } else {
        Write-Host "❌ Directorio .husky/_ no existe" -ForegroundColor Red
    }
    
    if (Test-Path ".husky/post-checkout") {
        Write-Host "✅ Hook post-checkout existe" -ForegroundColor Green
    } else {
        Write-Host "❌ Hook post-checkout no existe" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Directorio .husky no existe" -ForegroundColor Red
}

# 5. Verificar configuración de Git
Write-Host "5. Verificando configuración de Git..." -ForegroundColor Yellow
$hookPath = git config core.hooksPath
if ($hookPath -eq ".husky/_") {
    Write-Host "✅ core.hooksPath configurado correctamente: $hookPath" -ForegroundColor Green
} else {
    Write-Host "❌ core.hooksPath no configurado. Actual: $hookPath" -ForegroundColor Red
    Write-Host "   Debería ser: .husky/_" -ForegroundColor Yellow
}

# 6. Verificar versión de Git
Write-Host "6. Verificando versión de Git..." -ForegroundColor Yellow
$gitVersion = git --version
Write-Host "ℹ️  $gitVersion" -ForegroundColor Blue

Write-Host ""
Write-Host "🎯 Comandos de solución rápida:" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "npm install husky --save-dev" -ForegroundColor White
Write-Host "npx husky init" -ForegroundColor White
Write-Host "git config core.hooksPath .husky/_" -ForegroundColor White