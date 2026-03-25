<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    }

    public function show($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $client
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'display_order' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('clients', 'public');
            $validated['logo'] = $logoPath;
        }

        $client = Client::create($validated);

        return response()->json([
            'success' => true,
            'data' => $client,
            'message' => 'Client created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:5120',
            'display_order' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('logo')) {
            if ($client->logo && Storage::disk('public')->exists($client->logo)) {
                Storage::disk('public')->delete($client->logo);
            }

            $logoPath = $request->file('logo')->store('clients', 'public');
            $validated['logo'] = $logoPath;
        }

        $client->update($validated);

        return response()->json([
            'success' => true,
            'data' => $client,
            'message' => 'Client updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'success' => false,
                'message' => 'Client not found'
            ], 404);
        }

        if ($client->logo && Storage::disk('public')->exists($client->logo)) {
            Storage::disk('public')->delete($client->logo);
        }

        $client->delete();

        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully'
        ]);
    }
}
