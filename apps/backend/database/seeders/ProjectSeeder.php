<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        DB::table('projects')->truncate();

        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'category' => 'Shopify Development',
                'description' => 'A full-featured e-commerce platform built with Shopify',
                'image' => 'projects/project-1.jpg',
                'bg_color' => '#8B1538',
                'link' => null,
            ],
            [
                'title' => 'Brand Identity',
                'category' => 'Design & Development',
                'description' => 'Complete brand identity and website design',
                'image' => 'projects/project-2.jpg',
                'bg_color' => '#4A5FC1',
                'link' => null,
            ],
            [
                'title' => 'Agency Website',
                'category' => 'WordPress Development',
                'description' => 'Modern agency website built with WordPress',
                'image' => 'projects/project-3.jpg',
                'bg_color' => '#B88B9D',
                'link' => null,
            ],
            [
                'title' => 'Interior Design',
                'category' => 'Custom Web App',
                'description' => 'Custom web application for interior design showcase',
                'image' => 'projects/project-4.jpg',
                'bg_color' => '#1A4D3E',
                'link' => null,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        Schema::enableForeignKeyConstraints();
    }
}