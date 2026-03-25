# Initial Data Seeders

This folder contains seeders that were used to populate initial demo data in the database.

## Seeders Included:
- `AdminUserSeeder.php` - Creates admin user
- `ServiceSeeder.php` - Creates sample services
- `ClientSeeder.php` - Creates sample client logos
- `ProjectSeeder.php` - Creates sample projects
- `TestimonialSeeder.php` - Creates sample testimonials

## Important Notes:
1. These seeders were only used during initial development
2. Once data is in the database, these files are NOT needed for the application to run
3. The application works completely independently of these seeders
4. You can safely delete this entire folder without affecting the live application

## If You Need to Run Them Again:
```bash
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\AdminUserSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ServiceSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ClientSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\ProjectSeeder
php artisan db:seed --class=Database\\Seeders\\initial_data_seeders\\TestimonialSeeder
```

## Safe to Delete:
✅ Yes - This entire folder can be deleted anytime after initial data is populated
