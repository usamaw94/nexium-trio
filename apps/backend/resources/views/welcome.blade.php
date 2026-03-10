<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'Nexium Trio') }}</title>
    </head>
    <body>
        <h1>{{ config('app.name', 'Nexium Trio') }} — Backend</h1>
        <p>Laravel is running. Visit <a href="/api/health">/api/health</a> to check the API.</p>
    </body>
</html>
