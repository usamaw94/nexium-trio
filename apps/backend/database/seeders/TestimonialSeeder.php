<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing testimonials for PostgreSQL
        DB::statement('TRUNCATE TABLE testimonials RESTART IDENTITY CASCADE');

        // Create testimonials
        $testimonials = [
            [
                'quote' => 'Our online presence has never looked better. The new site helped boost both traffic and conversions. From start to finish, the process was smooth. The team delivered on time and with exceptional quality.',
                'author' => 'James Smith',
                'title' => 'Marketing Manager at JW Agency',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'quote' => 'Working with Nexium Trio transformed our digital strategy. Their attention to detail and technical expertise is unmatched.',
                'author' => 'Sarah Johnson',
                'title' => 'CEO at Digital Innovations',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'quote' => 'The team\'s ability to understand our needs and deliver beyond expectations has been remarkable. Highly recommended.',
                'author' => 'Michael Chen',
                'title' => 'Product Director at TechStart',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'quote' => 'From concept to launch, the experience was seamless. Our new platform has significantly improved our customer engagement.',
                'author' => 'Emma Williams',
                'title' => 'Operations Manager at RetailHub',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'quote' => 'Professional, responsive, and incredibly skilled. They brought our vision to life exactly as we imagined.',
                'author' => 'David Brown',
                'title' => 'Founder at GrowthLabs',
                'display_order' => 5,
                'is_active' => true,
            ],
            [
                'quote' => 'The quality of work and level of communication exceeded all our expectations. A true partnership.',
                'author' => 'Lisa Anderson',
                'title' => 'Marketing Director at BrandCo',
                'display_order' => 6,
                'is_active' => true,
            ],
            [
                'quote' => 'They didn\'t just build a website, they built a solution that drives real business results.',
                'author' => 'Robert Taylor',
                'title' => 'VP of Sales at SalesForce Pro',
                'display_order' => 7,
                'is_active' => true,
            ],
            [
                'quote' => 'Outstanding technical expertise combined with genuine care for our success. Could not ask for a better team.',
                'author' => 'Jennifer Martinez',
                'title' => 'CTO at FinTech Solutions',
                'display_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}