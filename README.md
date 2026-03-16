# Nexium Trio

A monorepo managed by [Nx](https://nx.dev) containing a React frontend and a Laravel backend.

---

## Quick Start (for every new clone)

> The project is already scaffolded. On any new machine, just install dependencies, configure the environment, and run.

**Step 1 — Install system prerequisites** (once per machine, see [Prerequisites](#prerequisites)):
- Node.js v20+
- PHP 8.4+ and Composer

**Step 2 — Clone and install dependencies:**
```bash
git clone https://github.com/usamaw94/nexium-trio.git
cd nexium-trio
npm install
npx nx run backend:install
```

**Step 3 — Configure backend environment:**

macOS / Linux / WSL2:
```bash
cp apps/backend/.env.example apps/backend/.env
cd apps/backend && php artisan key:generate && cd ../..
touch apps/backend/database/database.sqlite
```

Windows (PowerShell):
```powershell
Copy-Item apps\backend\.env.example apps\backend\.env
cd apps\backend; php artisan key:generate; cd ..\..
New-Item -ItemType File apps\backend\database\database.sqlite
```

**Step 4 — Run migrations:**
```bash
npx nx run backend:migrate
```

**Step 5 — Start both apps:**
```bash
# Terminal 1
npx nx serve frontend        # http://localhost:4200

# Terminal 2
npx nx run backend:serve     # http://localhost:8000
```

---

## Project Architecture

```
nexium-trio/                        ← Nx workspace root
├── apps/
│   ├── frontend/                   ← React application (Vite + TypeScript)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.tsx         ← Root React component
│   │   │   │   └── app.module.css
│   │   │   ├── assets/
│   │   │   ├── main.tsx            ← Entry point
│   │   │   └── styles.css
│   │   ├── public/
│   │   │   └── vercel.json         ← SPA routing config for Vercel
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── project.json            ← Nx project config
│   │
│   └── backend/                    ← Laravel application (PHP 8.4+)
│       ├── app/
│       │   ├── Http/
│       │   │   ├── Controllers/
│       │   │   └── Middleware/
│       │   ├── Models/
│       │   └── Providers/
│       ├── bootstrap/
│       │   └── app.php             ← Laravel application bootstrap
│       ├── config/
│       │   └── cors.php            ← CORS config using FRONTEND_URL env var
│       ├── database/
│       │   ├── factories/
│       │   ├── migrations/
│       │   └── seeders/
│       ├── public/
│       │   ├── index.php           ← Laravel entry point
│       │   └── .htaccess           ← Apache URL rewriting
│       ├── resources/
│       │   └── views/
│       ├── routes/
│       │   ├── api.php             ← API routes
│       │   ├── web.php             ← Web routes
│       │   └── console.php         ← Artisan console commands
│       ├── storage/
│       ├── tests/
│       │   ├── Feature/
│       │   └── Unit/
│       ├── artisan
│       ├── composer.json
│       ├── .env.example
│       └── project.json            ← Nx project config
│
├── .github/
│   └── workflows/
│       └── deploy.yml              ← Manual deployment pipeline
├── node_modules/
├── nx.json                         ← Nx workspace configuration
├── package.json                    ← Root Node dependencies
├── tsconfig.base.json              ← Shared TypeScript config
└── .gitignore
```

### Tech Stack

| Layer    | Technology   | Version |
|----------|--------------|---------|
| Frontend | React        | 18.x    |
| Frontend | Vite         | 4.x     |
| Frontend | TypeScript   | 5.x     |
| Backend  | Laravel      | 11.x    |
| Backend  | PHP          | 8.4+    |
| Database | PostgreSQL   | Supabase (managed) |
| Monorepo | Nx           | 16.x    |

---

## Prerequisites

Make sure the following are installed on your machine before proceeding.

### Node.js (all platforms)
```bash
node --version   # v20 or higher
npm --version
```

Download from [nodejs.org](https://nodejs.org) if not installed.

### PHP & Composer (required for backend)

---

#### macOS

```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP and Composer
brew install php composer

# Add Homebrew to your PATH permanently
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
php --version     # 8.4+
composer --version
```

---

#### Windows

> **Recommended: Use [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)** (Windows Subsystem for Linux).
> It gives you a full Linux environment inside Windows where everything works identically to macOS/Linux.
> Follow the macOS instructions above inside the WSL2 terminal.

**Option A — WSL2 (recommended, zero friction):**
```powershell
# In PowerShell (as Administrator) — installs WSL2 with Ubuntu
wsl --install

# Then open Ubuntu from the Start menu and follow the macOS setup steps above
```

**Option B — Native Windows via [Laragon](https://laragon.org) (easiest native option):**

Laragon is a portable PHP development environment that installs PHP and sets PATH automatically.
1. Download and install [Laragon Full](https://laragon.org/download/)
2. Laragon ships with PHP 8.x — verify: open Laragon terminal → `php --version`
3. Install Composer separately from [getcomposer.org](https://getcomposer.org/Composer-Setup.exe)

**Option C — Native Windows via [Scoop](https://scoop.sh):**
```powershell
# Install Scoop (in PowerShell)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Install PHP and Composer
scoop install php composer

# Verify
php --version
composer --version
```

---

#### Linux

```bash
sudo apt update && sudo apt install php8.4 php8.4-cli php8.4-mbstring php8.4-xml php8.4-sqlite3 php8.4-pgsql unzip curl
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

---

## Initial Setup

### 1. Clone the repository
```bash
git clone https://github.com/usamaw94/nexium-trio.git
cd nexium-trio
```

### 2. Install Node dependencies (frontend + Nx)
```bash
npm install
```

### 3. Install Laravel dependencies
```bash
npx nx run backend:install
# equivalent to: cd apps/backend && composer install
```

### 4. Configure backend environment

**macOS / Linux / WSL2:**
```bash
cp apps/backend/.env.example apps/backend/.env
cd apps/backend && php artisan key:generate && cd ../..
```

**Windows (PowerShell):**
```powershell
Copy-Item apps\backend\.env.example apps\backend\.env
cd apps\backend; php artisan key:generate; cd ..\..
```

### 5. Set up the database

The default local configuration uses SQLite.

**macOS / Linux / WSL2:**
```bash
touch apps/backend/database/database.sqlite
npx nx run backend:migrate
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType File apps\backend\database\database.sqlite
npx nx run backend:migrate
```

To use PostgreSQL locally, update `apps/backend/.env`:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nexium_trio
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---

## Running the Applications

### Frontend (React)
```bash
npx nx serve frontend
```
Runs the Vite dev server at **http://localhost:4200** with hot module replacement.

### Backend (Laravel)
```bash
npx nx run backend:serve
```
Runs the Laravel dev server at **http://localhost:8000**.

### Run both simultaneously
Open two terminal windows and run each serve command, or use a process manager like `concurrently`:
```bash
npx concurrently "npx nx serve frontend" "npx nx run backend:serve"
```

---

## Building for Production

### Build frontend
```bash
npx nx build frontend
```
Output is generated in `dist/apps/frontend/`.

### Optimize backend for production
```bash
npx nx run backend:optimize
# equivalent to: php artisan optimize
```

---

## Testing

### Frontend tests (Vitest)
```bash
npx nx test frontend
```

### Backend tests (PHPUnit)
```bash
npx nx run backend:test
# equivalent to: php artisan test
```

### Run all tests across the workspace
```bash
npx nx run-many -t test
```

---

## Linting & Formatting

### Lint frontend (ESLint)
```bash
npx nx lint frontend
```

### Format backend (Laravel Pint)
```bash
npx nx run backend:lint
```

### Lint all projects
```bash
npx nx run-many -t lint
```

---

## Database Commands (Backend)

```bash
# Run pending migrations
npx nx run backend:migrate

# Fresh migration with seed data
npx nx run backend:migrate-fresh
```

Or run any artisan command directly:
```bash
cd apps/backend
php artisan <command>
```

---

## Deploying

### Environments

| Environment | Branch    | Frontend                              | Backend                                   |
|-------------|-----------|---------------------------------------|-------------------------------------------|
| Staging     | `staging` | `https://staging.nexiumtrio.com.au`   | `https://staging.api.nexiumtrio.com.au`   |
| Production  | `main`    | `https://nexiumtrio.com.au`           | `https://api.nexiumtrio.com.au`           |

Deployments are **manual only** — triggered from GitHub Actions → Deploy → Run workflow.

```
.github/workflows/deploy.yml
├── workflow_dispatch (manual trigger)
│   ├── inputs: environment (staging | production)
│   ├── inputs: app (frontend | backend | both)
│   └── inputs: branch (select which branch to deploy)
│
├── deploy-frontend job → Vercel (via vercel pull/build/deploy --prebuilt)
└── deploy-backend job  → Fastcomet (via rsync + SSH)
```

---

### Step 1 — DNS Configuration (Fastcomet Zone Editor)

Go to **cPanel → Zone Editor → nexiumtrio.com.au → Manage** and add/update these records:

| Type  | Name      | Value                                    | Purpose                    |
|-------|-----------|------------------------------------------|----------------------------|
| A     | `@`       | `216.198.79.1`                           | Apex → Vercel (production) |
| CNAME | `www`     | `ab0b91ce5aa1f16e.vercel-dns-017.com.`   | www → Vercel               |
| CNAME | `staging` | `ab0b91ce5aa1f16e.vercel-dns-017.com.`   | Staging frontend → Vercel  |
| A     | `api`     | `198.38.93.19`                           | Production API → Fastcomet |
| A     | `staging.api` | `198.38.93.19`                       | Staging API → Fastcomet    |

---

### Step 2 — Fastcomet: Create Subdomains

In **cPanel → Domains**, create the subdomains with these document roots:

| Domain                          | Document Root                        |
|---------------------------------|--------------------------------------|
| `api.nexiumtrio.com.au`         | `/home/nexiumtr/api/public`          |
| `staging.api.nexiumtrio.com.au` | `/home/nexiumtr/staging-api/public`  |

> `staging.nexiumtrio.com.au` and `nexiumtrio.com.au` are handled by Vercel.

---

### Step 3 — Fastcomet: First-Time Server Setup

After the first deployment runs successfully, SSH into the server (or use cPanel Terminal) and create `.env` for each environment.

**Production** (`/home/nexiumtr/api`):
```bash
cd /home/nexiumtr/api
cp .env.example .env
nano .env
```
```env
APP_NAME=NexiumTrio
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.nexiumtrio.com.au
FRONTEND_URL=https://nexiumtrio.com.au

DB_CONNECTION=pgsql
DB_HOST=aws-1-ap-northeast-1.pooler.supabase.com
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=postgres.<your-project-ref>
DB_PASSWORD=<your-supabase-password>
```
```bash
php artisan config:clear
php artisan key:generate
php artisan migrate
```

**Staging** (`/home/nexiumtr/staging-api`):
```bash
cd /home/nexiumtr/staging-api
cp .env.example .env
nano .env
```
```env
APP_NAME=NexiumTrio
APP_ENV=staging
APP_KEY=
APP_DEBUG=true
APP_URL=https://staging.api.nexiumtrio.com.au
FRONTEND_URL=https://staging.nexiumtrio.com.au

DB_CONNECTION=pgsql
DB_HOST=aws-1-ap-south-1.pooler.supabase.com
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=postgres.<your-staging-project-ref>
DB_PASSWORD=<your-staging-supabase-password>
```
```bash
php artisan config:clear
php artisan key:generate
php artisan migrate
```

> **Note:** `.env` is excluded from rsync deployments. It stays on the server permanently and is never overwritten. If env variables change, update manually via cPanel File Manager or Terminal.

---

### Step 4 — Vercel: Import Project & Add Domains

1. Go to [vercel.com](https://vercel.com) → New Project → import `usamaw94/nexium-trio`
2. Set:
   - **Root Directory**: _(leave empty)_
   - **Build Command**: `npx nx build frontend`
   - **Output Directory**: `dist/apps/frontend`
   - **Install Command**: `npm ci`
3. Go to **Project Settings → Domains** and add:
   - `nexiumtrio.com.au` → Production
   - `www.nexiumtrio.com.au` → Production
   - `staging.nexiumtrio.com.au` → Preview (staging branch)
4. Vercel auto-provisions SSL for all domains

---

### Step 5 — GitHub Environments & Secrets

Go to your GitHub repo → **Settings → Environments** → create two environments: `staging` and `production`.

Add the following secrets to **each** environment (values differ per environment):

| Secret                  | `staging` value                          | `production` value                   |
|-------------------------|------------------------------------------|--------------------------------------|
| `VERCEL_TOKEN`          | _(same token for both)_                  | _(same token for both)_              |
| `VERCEL_ORG_ID`         | _(same for both — your Vercel User ID)_  | _(same for both)_                    |
| `VERCEL_PROJECT_ID`     | _(same for both)_                        | _(same for both)_                    |
| `VERCEL_ALIAS_DOMAIN`   | `staging.nexiumtrio.com.au`              | `nexiumtrio.com.au`                  |
| `FASTCOMET_HOST`        | `198.38.93.19`                           | `198.38.93.19`                       |
| `FASTCOMET_USERNAME`    | `nexiumtr`                               | `nexiumtr`                           |
| `FASTCOMET_SSH_KEY`     | your private SSH key                     | your private SSH key                 |
| `FASTCOMET_PORT`        | `22`                                     | `22`                                 |
| `FASTCOMET_REMOTE_PATH` | `/home/nexiumtr/staging-api`             | `/home/nexiumtr/api`                 |

**SSH Key setup:**
```bash
# Generate key locally (no passphrase)
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/github_actions -N ""

# Copy public key → Fastcomet cPanel → SSH Access → Manage SSH Keys → Import Key
cat ~/.ssh/github_actions.pub

# Copy private key → GitHub Secrets → FASTCOMET_SSH_KEY
cat ~/.ssh/github_actions
```
Then in Fastcomet: **SSH Access → Manage SSH Keys → Authorize** the imported key.

**Vercel credentials:**
- **VERCEL_TOKEN**: [vercel.com/account/tokens](https://vercel.com/account/tokens)
- **VERCEL_ORG_ID**: Vercel → Account Settings → User ID
- **VERCEL_PROJECT_ID**: Vercel → Project → Settings → General → Project ID

---

### How to Deploy

Go to **GitHub → Actions → Deploy → Run workflow**:

1. Select the **branch** to deploy from
2. Select the **environment** (`staging` or `production`)
3. Select the **app** (`frontend`, `backend`, or `both`)
4. Click **Run workflow**

---

### How the pipeline works

**`deploy-frontend` job:**
- Runs `vercel pull` to fetch project settings
- Runs `vercel build` which executes `npx nx build frontend` and packages output
- Runs `vercel deploy --prebuilt` to upload the build to Vercel
- `apps/frontend/public/vercel.json` enables SPA routing for React Router

**`deploy-backend` job:**
- Installs Composer dependencies (`--no-dev --optimize-autoloader`)
- Rsyncs `apps/backend/` to `FASTCOMET_REMOTE_PATH`
  - Excludes: `.env`, logs, sessions, views cache, sqlite file
- SSHs in and runs:
  ```bash
  mkdir -p storage/framework/views storage/framework/cache storage/framework/sessions storage/logs bootstrap/cache
  chmod -R 775 storage bootstrap/cache
  php artisan migrate --force
  php artisan optimize
  php artisan storage:link --force
  ```

---

### CORS

`apps/backend/config/cors.php` uses `FRONTEND_URL` from `.env`, set per-environment on the server:
- Staging `.env`: `FRONTEND_URL=https://staging.nexiumtrio.com.au`
- Production `.env`: `FRONTEND_URL=https://nexiumtrio.com.au`

---

### Typical workflow

```bash
# Work on a feature branch
git checkout -b feature/my-feature
git add .
git commit -m "Add new feature"
git push origin feature/my-feature

# Merge to staging and deploy
git checkout staging
git merge feature/my-feature
git push origin staging
# → manually trigger deploy: staging + both

# After testing, merge to production
git checkout main
git merge staging
git push origin main
# → manually trigger deploy: production + both
```

---

## Nx Workspace Commands

```bash
# List all projects in the workspace
npx nx show projects

# Show all available targets for a project
npx nx show project frontend
npx nx show project backend

# View the project dependency graph
npx nx graph

# Run a standard target across all projects
npx nx run-many -t build
npx nx run-many -t test
npx nx run-many -t lint
```

> **Note:** Standard Nx shorthand (`npx nx <target> <project>`) works for `serve`, `build`, `test`, and `lint`.
> For custom backend targets (`migrate`, `migrate-fresh`, `install`, `optimize`) always use the full form:
> `npx nx run backend:<target>` — this avoids conflicts with built-in Nx commands like `nx migrate`.

---

## Environment Variables

### Backend (`apps/backend/.env`)

| Variable        | Local default           | Description                                      |
|-----------------|-------------------------|--------------------------------------------------|
| `APP_NAME`      | `NexiumTrio`            | Application name                                 |
| `APP_ENV`       | `local`                 | Environment (`local`, `staging`, `production`)   |
| `APP_KEY`       | _(generated)_           | Laravel encryption key                           |
| `APP_DEBUG`     | `true`                  | Enable debug mode                                |
| `APP_URL`       | `http://localhost:8000` | Backend base URL                                 |
| `FRONTEND_URL`  | `http://localhost:4200` | Frontend URL used for CORS                       |
| `DB_CONNECTION` | `sqlite`                | Database driver (`sqlite`, `pgsql`, `mysql`)     |
| `DB_HOST`       | _(n/a for sqlite)_      | Database host                                    |
| `DB_PORT`       | _(n/a for sqlite)_      | Database port                                    |
| `DB_DATABASE`   | _(sqlite path)_         | Database name                                    |
| `DB_USERNAME`   | _(n/a for sqlite)_      | Database username                                |
| `DB_PASSWORD`   | _(n/a for sqlite)_      | Database password                                |

---

## Project-Specific Nx Targets

### Frontend (`apps/frontend`)

| Target    | Command                   | Description                                  |
|-----------|---------------------------|----------------------------------------------|
| `serve`   | `npx nx serve frontend`   | Start Vite dev server with HMR               |
| `build`   | `npx nx build frontend`   | Build for production to `dist/apps/frontend` |
| `preview` | `npx nx preview frontend` | Preview the production build locally         |
| `test`    | `npx nx test frontend`    | Run unit tests with Vitest                   |
| `lint`    | `npx nx lint frontend`    | Lint with ESLint                             |

### Backend (`apps/backend`)

| Target          | Command                            | Description                            |
|-----------------|------------------------------------|----------------------------------------|
| `serve`         | `npx nx run backend:serve`         | Run `php artisan serve`                |
| `install`       | `npx nx run backend:install`       | Run `composer install`                 |
| `migrate`       | `npx nx run backend:migrate`       | Run `php artisan migrate`              |
| `migrate-fresh` | `npx nx run backend:migrate-fresh` | Run `php artisan migrate:fresh --seed` |
| `test`          | `npx nx run backend:test`          | Run `php artisan test`                 |
| `lint`          | `npx nx run backend:lint`          | Run Laravel Pint code formatter        |
| `optimize`      | `npx nx run backend:optimize`      | Run `php artisan optimize`             |
