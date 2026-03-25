<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
Schema::disableForeignKeyConstraints();

        DB::table('clients')->truncate();

        // Create clients with logos
        $clients = [
            [
                'name' => 'Client 1',
                'logo' => 'clients/client-logo-1.svg',
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Client 2',
                'logo' => 'clients/client-logo-2.svg',
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Client 3',
                'logo' => 'clients/client-logo-3.png',
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Client 4',
                'logo' => 'clients/client-logo-5.svg',
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Client 5',
                'logo' => 'clients/client-logo-6.svg',
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($clients as $client) {
            Client::create($client);
        }
    }
}
