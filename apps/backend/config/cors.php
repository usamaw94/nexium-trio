<?php

return [
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'https://nexium-project.vercel.app',
        'https://nexium-project-ofhsi5498-faraz-javaids-projects.vercel.app',
    ],

    'allowed_origins_patterns' => [
        '/^https:\/\/.*\.vercel\.app$/', // Allow all Vercel preview deployments
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
