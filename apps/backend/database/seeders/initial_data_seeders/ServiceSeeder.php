<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\ServiceItem;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing services
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ServiceItem::truncate();
        Service::truncate();
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Service 1: WordPress Development
        $wordpress = Service::create([
            'title' => 'WordPress Development',
            'description' => 'We build custom WordPress sites, perfect for marketing, publishing, or service-driven brands.',
            'display_order' => 1,
        ]);

        $wordpressItems = [
            'Custom theme and plugin development',
            'Full content migration and CMS setup',
            'Performance and security optimisation',
            'Ongoing support and site maintenance',
        ];

        foreach ($wordpressItems as $index => $item) {
            ServiceItem::create([
                'service_id' => $wordpress->id,
                'item_text' => $item,
                'display_order' => $index + 1,
            ]);
        }

        // Service 2: Shopify e-Commerce
        $shopify = Service::create([
            'title' => 'Shopify e-Commerce',
            'description' => 'We create Shopify stores that are fast, secure, and built to scale. From theme customisation to app integrations, we tailor every build to your brand and goals.',
            'display_order' => 2,
        ]);

        $shopifyItems = [
            'Shopify theme customisation',
            'Third-party app integrations and API connections',
            'Store setup and product catalogue migration',
            'Shopify Plus solutions',
        ];

        foreach ($shopifyItems as $index => $item) {
            ServiceItem::create([
                'service_id' => $shopify->id,
                'item_text' => $item,
                'display_order' => $index + 1,
            ]);
        }

        // Service 3: Custom Web Development
        $customWeb = Service::create([
            'title' => 'Custom Web Development',
            'description' => 'We build bespoke web apps and systems using Laravel, React, and other frameworks. Ideal for client portals, internal tools, and dashboards.',
            'display_order' => 3,
        ]);

        $customWebItems = [
            'Laravel and React development',
            'Full-stack web app builds',
            'Scalable, secure backend infrastructure',
            'API integrations and automation',
        ];

        foreach ($customWebItems as $index => $item) {
            ServiceItem::create([
                'service_id' => $customWeb->id,
                'item_text' => $item,
                'display_order' => $index + 1,
            ]);
        }
    }
}
