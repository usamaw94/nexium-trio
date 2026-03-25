# Nexium Backend API

A robust and scalable RESTful API backend built with Laravel 11, featuring comprehensive authentication, content management, and admin panel capabilities.

## 🚀 Tech Stack

- **Framework**: Laravel 11.x
- **Database**: MySQL 8.0
- **Authentication**: Laravel Sanctum (Token-based API authentication)
- **Architecture**: RESTful API
- **PHP**: 8.1+
- **File Storage**: Laravel Storage with public disk
- **Validation**: Laravel Form Requests
- **Security**: CORS enabled, Hash encryption, SQL injection protection

## ✨ Key Features

### Authentication & Authorization
- 🔐 Secure token-based authentication with Laravel Sanctum
- 👤 User profile management with avatar uploads
- 🔑 Password change with current password verification
- 🛡️ Protected routes with middleware authentication

### Content Management System
- 📝 **Services**: CRUD operations with icons and display ordering
- 🎨 **Projects**: Portfolio management with images and categories
- 👥 **Clients**: Client logo management with status control
- 💬 **Testimonials**: Customer feedback management
- 📧 **Contact Forms**: Message handling with read/unread status

### File Management
- 📁 Multi-type file uploads (images, SVG, logos)
- 🖼️ Profile picture management
- 🗂️ Organized storage structure
- ✅ File validation and security

### API Endpoints
- **Public**: Services, Projects, Clients, Testimonials (GET)
- **Protected**: Full CRUD operations, Profile management, Contact management
- **Authentication**: Login/Logout endpoints

## 📦 Project Structure

```
├── app/
│   ├── Http/Controllers/Api/    # RESTful API Controllers
│   └── Models/                   # Eloquent ORM Models
├── database/
│   ├── migrations/               # Database schema
│   └── seeders/                  # Initial data seeders
├── routes/
│   └── api.php                   # API route definitions
└── config/
    └── cors.php                  # CORS configuration
```

## 🔒 Security Features

- CORS protection with whitelisted origins
- Hash-based password encryption
- SQL injection prevention via Eloquent ORM
- File upload validation and sanitization
- Token-based authentication
- Protected routes with Sanctum middleware

## 📊 Database Schema

- **users**: Admin users with profile management
- **services**: Service offerings with nested items
- **projects**: Portfolio projects with media
- **clients**: Client information and logos
- **testimonials**: Customer reviews and ratings
- **contacts**: Contact form submissions

## 🎯 API Response Format

All endpoints return consistent JSON responses:
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

---

## 🛠️ Installation

### Requirements
- PHP >= 8.1
- Composer
- MySQL >= 8.0
- Node.js & NPM (for asset compilation if needed)

### 1. Install Dependencies
```bash
composer install
```

### 2. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

Update `.env` with your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nexium_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

APP_URL=http://localhost:8000
```

### 3. Database Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE nexium_db"

# Run migrations
php artisan migrate
```

### 4. Storage Setup
```bash
php artisan storage:link
```

## 🌱 Seeding Initial Data

### Run All Seeders (Recommended for First Setup)
```bash
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\AdminUserSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ServiceSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ClientSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ProjectSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\TestimonialSeeder
```

### Or Run Individually
```bash
# Admin User (email: admin@nexiumtrio.com, password: password)
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\AdminUserSeeder

# Services
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ServiceSeeder

# Clients
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ClientSeeder

# Projects
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ProjectSeeder

# Testimonials
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\TestimonialSeeder
```

## 🚀 Running the Application

### Development Server
```bash
php artisan serve
```
API will be available at `http://localhost:8000`

### Production
```bash
# Optimize configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chmod -R 775 storage bootstrap/cache
```

## 🔑 Default Admin Credentials

After running AdminUserSeeder:
- **Email**: admin@nexiumtrio.com
- **Password**: password

## 📡 API Endpoints

### Public Routes
- `POST /api/login` - User authentication
- `POST /api/contacts` - Submit contact form
- `GET /api/services` - Get all services
- `GET /api/projects` - Get all projects
- `GET /api/clients` - Get all clients
- `GET /api/testimonials` - Get all testimonials

### Protected Routes (Require Authentication)
- `POST /api/logout` - Logout user
- `GET /api/user` - Get authenticated user
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `PUT /api/profile/password` - Change password
- `POST /api/profile/picture` - Upload profile picture
- `DELETE /api/profile/picture` - Delete profile picture
- CRUD operations for services, projects, clients, testimonials, contacts

## 🌐 CORS Configuration

Update `config/cors.php` for frontend URLs:
```php
'allowed_origins' => [
    'http://localhost:3000',
    'https://your-frontend-domain.com',
],
```

Configured to support multiple frontend origins with credentials support for seamless integration with Next.js, React, or Vue.js applications.

## 📁 File Storage

Uploaded files are stored in `storage/app/public/`:
- Profile pictures: `storage/app/public/profile_pictures/`
- Service icons: `storage/app/public/service_icons/`
- Client logos: `storage/app/public/client_logos/`
- Project images: `storage/app/public/project_images/`

## 🚢 Deployment Notes

### Environment Variables
Ensure these are set in production:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-api-domain.com
```

### Database Migration on Server
```bash
php artisan migrate --force
```

### Run Seeders on Production
```bash
# Run seeders to populate initial data
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\AdminUserSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ServiceSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ClientSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ProjectSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\TestimonialSeeder
```

### Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

---

**Built with ❤️ using Laravel**
