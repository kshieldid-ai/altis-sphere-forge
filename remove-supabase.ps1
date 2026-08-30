# ═══════════════════════════════════════════════════════════════════════
#  Retrait complet de Supabase du projet altis-sphere-forge
#
#  PRÉREQUIS OBLIGATOIRE :
#    src/pages/Contact.tsx doit DÉJÀ être migré vers altisApi.submitContact.
#    C'est le dernier fichier applicatif qui importe Supabase.
#
#  À exécuter depuis la RACINE du projet React.
#  Le script s'arrête de lui-même si le prérequis n'est pas rempli.
# ═══════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

# ── Étape 0 : garde-fous ───────────────────────────────────────────────
if (-not (Test-Path "package.json")) {
    Write-Host "ERREUR : lancer ce script depuis la racine du projet." -ForegroundColor Red
    exit 1
}

if (Select-String -Path "src\pages\Contact.tsx" -Pattern "supabase" -Quiet) {
    Write-Host "STOP : src/pages/Contact.tsx importe encore Supabase." -ForegroundColor Red
    Write-Host "       Remplacez-le par la version altisApi avant de continuer." -ForegroundColor Red
    exit 1
}

$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Branche courante : $branch" -ForegroundColor Cyan
if ($branch -eq "main") {
    Write-Host "Conseil : travailler sur une branche dédiée." -ForegroundColor Yellow
    Write-Host "  git checkout -b chore/remove-supabase" -ForegroundColor Yellow
    Read-Host "Entrée pour continuer malgré tout, Ctrl+C pour annuler"
}


# ── Étape 1 : code applicatif ──────────────────────────────────────────
Write-Host "`n[1/6] Suppression du code Supabase..." -ForegroundColor Cyan

@(
    "src\integrations\supabase",   # client.ts, types.ts, previewAuthStorage.ts
    "src\lib\mcp"                  # outils MCP branchés sur Supabase
) | ForEach-Object {
    if (Test-Path $_) {
        Remove-Item -Recurse -Force $_
        Write-Host "  supprime : $_" -ForegroundColor Green
    }
}

# Le dossier src/integrations devient vide -> le retirer aussi
if ((Test-Path "src\integrations") -and
    -not (Get-ChildItem "src\integrations" -Force)) {
    Remove-Item -Force "src\integrations"
    Write-Host "  supprime : src\integrations (vide)" -ForegroundColor Green
}


# ── Étape 2 : migrations SQL Supabase ──────────────────────────────────
# ⚠ Contiennent l'historique du schema devis_requests.
#    Archivées plutôt que supprimees, au cas ou vous voudriez
#    recuperer les anciennes demandes.
Write-Host "`n[2/6] Archivage des migrations SQL..." -ForegroundColor Cyan

if (Test-Path "supabase") {
    $archive = "..\_archive-supabase-$(Get-Date -Format 'yyyyMMdd')"
    New-Item -ItemType Directory -Force -Path $archive | Out-Null
    Copy-Item -Recurse -Force "supabase" $archive
    Remove-Item -Recurse -Force "supabase"
    Write-Host "  archive dans : $archive" -ForegroundColor Green
    Write-Host "  supprime du depot : supabase\" -ForegroundColor Green
}


# ── Étape 3 : dépendances npm ──────────────────────────────────────────
Write-Host "`n[3/6] Retrait des dependances npm..." -ForegroundColor Cyan
npm uninstall "@supabase/supabase-js" "@lovable.dev/mcp-js"
Write-Host "  package.json et package-lock.json mis a jour" -ForegroundColor Green


# ── Étape 4 : variables d'environnement ────────────────────────────────
Write-Host "`n[4/6] Nettoyage du .env..." -ForegroundColor Cyan

$env_final = @"
# ─── Site (URLs absolues pour le SEO) ───
VITE_SITE_URL="https://altisphere-group.com"

# ─── API Django (sous-application altis dans AFFAGRIPEL) ───
# Valeur de repli : .env.development et .env.production la surchargent
# selon la commande utilisee (npm run dev / npm run build).
VITE_API_URL="https://affagripel-lualaba.com/api/altis"
"@

Copy-Item ".env" ".env.backup-supabase" -Force
[System.IO.File]::WriteAllText(
    (Join-Path (Get-Location) ".env"),
    $env_final,
    (New-Object System.Text.UTF8Encoding($false))
)
Write-Host "  .env reecrit (sauvegarde : .env.backup-supabase)" -ForegroundColor Green


# ── Étape 5 : verification ─────────────────────────────────────────────
Write-Host "`n[5/6] Verification..." -ForegroundColor Cyan

$restes = Get-ChildItem -Recurse -Include *.ts, *.tsx, *.json -Path src `
    -ErrorAction SilentlyContinue | Select-String -Pattern "supabase" -List

if ($restes) {
    Write-Host "  ATTENTION - references residuelles :" -ForegroundColor Red
    $restes | ForEach-Object { Write-Host "    $($_.Path)" -ForegroundColor Red }
} else {
    Write-Host "  aucune reference Supabase dans src\" -ForegroundColor Green
}

Write-Host "`n[6/6] Compilation..." -ForegroundColor Cyan
npx tsc --noEmit -p tsconfig.app.json
if ($LASTEXITCODE -eq 0) { Write-Host "  TypeScript OK" -ForegroundColor Green }

npm run build
if ($LASTEXITCODE -eq 0) { Write-Host "  Build OK" -ForegroundColor Green }


# ── Reste a faire manuellement ─────────────────────────────────────────
Write-Host @"

═══════════════════════════════════════════════════════════════
  A FAIRE MANUELLEMENT (le script n'y touche pas)
═══════════════════════════════════════════════════════════════

  1. .github\workflows\deploy.yml
     Retirer les lignes 37 et 51-52 (garde-fou supabase.co)
     et les remplacer par le controle sur l'URL API.
     -> Sans cela le DEPLOIEMENT ECHOUERA.

  2. .gitignore
     Retirer le commentaire qui explique pourquoi .env est versionne
     a cause de VITE_SUPABASE_*.

  3. DEPLOIEMENT.md
     Reecrire les sections Supabase (lignes 12-39, 84, 115-127).

  4. Console Supabase
     Ne PAS supprimer le projet tant que les anciennes demandes
     de devis n'ont pas ete exportees (table devis_requests).

═══════════════════════════════════════════════════════════════
"@ -ForegroundColor Yellow
