# Nexium Trio

A monorepo managed by [Nx](https://nx.dev) containing a React frontend and a Laravel backend.

---

## Quick Start (for every new clone)

> The project is already scaffolded. On any new machine, just install dependencies, configure the environment, and run.

**Step 1 — Install system prerequisites** (once per machine, see [Prerequisites](#prerequisites)):
- Node.js v16+
- PHP 8.2+ and Composer

**Step 2 — Clone and install dependencies:**
```bash
git clone <repository-url>
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
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── project.json            ← Nx project config
│   │
│   └── backend/                    ← Laravel application (PHP 8.2+)
│       ├── app/
│       │   ├── Http/
│       │   │   ├── Controllers/
│       │   │   └── Middleware/
│       │   ├── Models/
│       │   └── Providers/
│       ├── bootstrap/
│       │   └── app.php             ← Laravel application bootstrap
│       ├── config/
│       ├── database/
│       │   ├── factories/
│       │   ├── migrations/
│       │   └── seeders/
│       ├── public/
│       │   └── index.php           ← Laravel entry point
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
├── node_modules/
├── nx.json                         ← Nx workspace configuration
├── package.json                    ← Root Node dependencies
├── tsconfig.base.json              ← Shared TypeScript config
└── .gitignore
```

### Tech Stack

| Layer    | Technology | Version |
|----------|------------|---------|
| Frontend | React      | 18.x    |
| Frontend | Vite       | 4.x     |
| Frontend | TypeScript | 5.x     |
| Backend  | Laravel    | 11.x    |
| Backend  | PHP        | 8.2+    |
| Monorepo | Nx         | 16.x    |

---

## Prerequisites

Make sure the following are installed on your machine before proceeding.

### Node.js (all platforms)
```bash
node --version   # v16 or higher
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
php --version     # 8.2+
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
sudo apt update && sudo apt install php8.2 php8.2-cli php8.2-mbstring php8.2-xml php8.2-sqlite3 unzip curl
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

---

## Initial Setup

### 1. Clone the repository
```bash
git clone <repository-url>
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

The default configuration uses SQLite.

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

To use MySQL or PostgreSQL instead, update the following in `apps/backend/.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nexium_trio
DB_USERNAME=root
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

### Build frontend in development mode
```bash
npx nx build frontend --configuration=development
```

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

| Environment | Branch    | Frontend                            | Backend                                 |
|-------------|-----------|-------------------------------------|-----------------------------------------|
| Staging     | `staging` | `https://staging.nexiumtrio.com.au` | `https://api.staging.nexiumtrio.com.au` |
| Production  | `main`    | `https://nexiumtrio.com.au`         | `https://api.nexiumtrio.com.au`         |

The pipeline automatically selects the right environment based on the branch pushed:

```
.github/workflows/deploy.yml
├── push to staging → GitHub Environment: staging
│   ├── deploy-frontend → staging.nexiumtrio.com.au   (Vercel)
│   └── deploy-backend  → api.staging.nexiumtrio.com.au (Fastcomet SSH)
│
└── push to main → GitHub Environment: production
    ├── deploy-frontend → nexiumtrio.com.au            (Vercel)
    └── deploy-backend  → api.nexiumtrio.com.au        (Fastcomet SSH)
```

---

### Step 1 — DNS Configuration (Fastcomet Zone Editor)

Go to **cPanel → Zone Editor → nexiumtrio.com.au → Manage** and add/update these records:

| Type  | Name                              | Value                        | Purpose                          |
|-------|-----------------------------------|------------------------------|----------------------------------|
| A     | `nexiumtrio.com.au`               | `76.76.21.21`                | Apex → Vercel (production)       |
| CNAME | `www`                             | `cname.vercel-dns.com`       | www → Vercel                     |
| CNAME | `staging`                         | `cname.vercel-dns.com`       | Staging frontend → Vercel        |
| A     | `api.nexiumtrio.com.au`           | _(Fastcomet server IP)_      | Production API → Fastcomet       |
| A     | `api.staging.nexiumtrio.com.au`   | _(Fastcomet server IP)_      | Staging API → Fastcomet          |

> Find your Fastcomet server IP in **cPanel → Server Information**.

DNS propagation takes 5–30 minutes.

---

### Step 2 — Fastcomet: Create Subdomains

In **cPanel → Subdomains**, create all four subdomains:

| Subdomain                       | Document Root                                      |
|---------------------------------|----------------------------------------------------|
| `api.nexiumtrio.com.au`         | `/home/<username>/nexium-backend-prod/public`      |
| `api.staging.nexiumtrio.com.au` | `/home/<username>/nexium-backend-staging/public`   |

> `staging.nexiumtrio.com.au` and `nexiumtrio.com.au` are handled by Vercel — don't create subdomains for those in cPanel.

Then enable SSL for both API subdomains: **cPanel → SSL/TLS → Let's Encrypt**.

---

### Step 3 — Fastcomet: First-Time Server Setup

SSH into the server and create `.env` for each environment:

**Staging:**
```bash
mkdir -p /home/<username>/nexium-backend-staging
cd /home/<username>/nexium-backend-staging
cp .env.example .env
nano .env
```
```env
APP_ENV=staging
APP_DEBUG=true
APP_URL=https://api.staging.nexiumtrio.com.au
FRONTEND_URL=https://staging.nexiumtrio.com.au

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=<staging_db_name>
DB_USERNAME=<staging_db_user>
DB_PASSWORD=<staging_db_password>
```
```bash
php artisan key:generate --force
```

**Production:**
```bash
mkdir -p /home/<username>/nexium-backend-prod
cd /home/<username>/nexium-backend-prod
cp .env.example .env
nano .env
```
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.nexiumtrio.com.au
FRONTEND_URL=https://nexiumtrio.com.au

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=<prod_db_name>
DB_USERNAME=<prod_db_user>
DB_PASSWORD=<prod_db_password>
```
```bash
php artisan key:generate --force
```

---

### Step 4 — Vercel: Create Project & Add Domains

1. Go to [vercel.com](https://vercel.com) → New Project → import your GitHub repository
2. Set **Framework Preset** to `Vite`, **Root Directory** to `apps/frontend`
3. Go to **Project Settings → Domains** and add all four frontend domains:
   - `nexiumtrio.com.au`
   - `www.nexiumtrio.com.au` → redirect to `nexiumtrio.com.au`
   - `staging.nexiumtrio.com.au`
4. Vercel auto-provisions SSL for all domains

---

### Step 5 — GitHub Environments & Secrets

Go to your GitHub repo → **Settings → Environments** → create two environments: `staging` and `production`.

Add the following secrets to **each** environment separately (values differ per environment):

| Secret                  | `staging` value                                    | `production` value                            |
|-------------------------|----------------------------------------------------|-----------------------------------------------|
| `VERCEL_TOKEN`          | _(same token for both)_                            | _(same token for both)_                       |
| `VERCEL_ORG_ID`         | _(same for both)_                                  | _(same for both)_                             |
| `VERCEL_PROJECT_ID`     | _(same for both)_                                  | _(same for both)_                             |
| `VERCEL_ALIAS_DOMAIN`   | `staging.nexiumtrio.com.au`                        | `nexiumtrio.com.au`                           |
| `FASTCOMET_HOST`        | `server123.fastcomet.com`                          | `server123.fastcomet.com`                     |
| `FASTCOMET_USERNAME`    | your cPanel username                               | your cPanel username                          |
| `FASTCOMET_SSH_KEY`     | your private SSH key                               | your private SSH key                          |
| `FASTCOMET_PORT`        | `21098`                                            | `21098`                                       |
| `FASTCOMET_REMOTE_PATH` | `/home/<username>/nexium-backend-staging`          | `/home/<username>/nexium-backend-prod`        |

> **SSH Key setup:** In Fastcomet cPanel → SSH Access → Manage SSH Keys → Generate New Key.
> Download the private key, add the public key to Authorized Keys, then paste the private key into both GitHub environment secrets.

> **Vercel credentials:** Go to **Project Settings → General** for Project ID and Team/Org ID.
> Get your token from [vercel.com/account/tokens](https://vercel.com/account/tokens).

---

### How the pipeline works

On every push to `staging` or `main`, the pipeline:

1. Detects which environment to use (`staging` or `production`) based on the branch
2. Reads secrets from the corresponding GitHub Environment
3. Runs two independent jobs:

**`deploy-frontend` job:**
- Builds with `npx nx build frontend --configuration=production`
- `apps/frontend/public/vercel.json` enables SPA routing for React Router
- Deploys to Vercel and aliases to `VERCEL_ALIAS_DOMAIN` (staging or production URL)

**`deploy-backend` job:**
- Installs Composer dependencies (`--no-dev`)
- Rsyncs `apps/backend/` to `FASTCOMET_REMOTE_PATH` (staging or production path)
  - Skips: `.env`, logs, sessions, views cache, sqlite file
- SSHs in and runs:
  ```bash
  chmod -R 775 storage bootstrap/cache
  php artisan migrate --force
  php artisan optimize
  php artisan storage:link --force
  ```

---

### CORS

`apps/backend/config/cors.php` uses `FRONTEND_URL` from `.env`, which is set per-environment on the server:
- Staging `.env`: `FRONTEND_URL=https://staging.nexiumtrio.com.au`
- Production `.env`: `FRONTEND_URL=https://nexiumtrio.com.au`

---

### Typical workflow

```bash
# Work on a feature
git checkout staging
git add .
git commit -m "Add new feature"
git push origin staging
# → auto-deploys to staging.nexiumtrio.com.au + api.staging.nexiumtrio.com.au

# After testing and approval, merge to production
git checkout main
git merge staging
git push origin main
# → auto-deploys to nexiumtrio.com.au + api.nexiumtrio.com.au
```

---

### Manual deploy (without GitHub Actions)

**Frontend:**
```bash
npx nx build frontend
# Upload dist/apps/frontend/ to any static host
```

**Backend:**
```bash
cd apps/backend
composer install --no-dev --optimize-autoloader
php artisan key:generate --force   # first deploy only
php artisan migrate --force
php artisan optimize
chmod -R 775 storage bootstrap/cache
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

| Variable        | Default                 | Description                         |
|-----------------|-------------------------|-------------------------------------|
| `APP_NAME`      | `NexiumTrio`            | Application name                    |
| `APP_ENV`       | `local`                 | Environment (`local`, `production`) |
| `APP_KEY`       | _(generated)_           | Laravel encryption key              |
| `APP_DEBUG`     | `true`                  | Enable debug mode                   |
| `APP_URL`       | `http://localhost:8000` | Backend base URL                    |
| `DB_CONNECTION` | `sqlite`                | Database driver                     |
| `DB_DATABASE`   | _(sqlite path)_         | Database name / file path           |

---

## Project-Specific Nx Targets

### Frontend (`apps/frontend`)

| Target    | Command                                      | Description                                  |
|-----------|----------------------------------------------|----------------------------------------------|
| `serve`   | `npx nx serve frontend`                      | Start Vite dev server with HMR               |
| `build`   | `npx nx build frontend`                      | Build for production to `dist/apps/frontend` |
| `preview` | `npx nx preview frontend`                    | Preview the production build locally         |
| `test`    | `npx nx test frontend`                       | Run unit tests with Vitest                   |
| `lint`    | `npx nx lint frontend`                       | Lint with ESLint                             |

### Backend (`apps/backend`)

| Target          | Command                               | Description                            |
|-----------------|---------------------------------------|----------------------------------------|
| `serve`         | `npx nx run backend:serve`            | Run `php artisan serve`                |
| `install`       | `npx nx run backend:install`          | Run `composer install`                 |
| `migrate`       | `npx nx run backend:migrate`          | Run `php artisan migrate`              |
| `migrate-fresh` | `npx nx run backend:migrate-fresh`    | Run `php artisan migrate:fresh --seed` |
| `test`          | `npx nx run backend:test`             | Run `php artisan test`                 |
| `lint`          | `npx nx run backend:lint`             | Run Laravel Pint code formatter        |
| `optimize`      | `npx nx run backend:optimize`         | Run `php artisan optimize`             |
