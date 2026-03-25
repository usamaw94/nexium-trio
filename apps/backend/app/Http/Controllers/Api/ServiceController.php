<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceItem;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('items')
            ->orderBy('display_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function show($id)
    {
        $service = Service::with('items')->find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:services,title',
            'description' => 'required|string',
            'display_order' => 'required|integer|min:1',
            'icon' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*' => 'required|string|max:500',
        ]);

        $service = Service::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'display_order' => $validated['display_order'],
            'icon' => $validated['icon'] ?? null,
        ]);

        foreach ($validated['items'] as $index => $itemText) {
            ServiceItem::create([
                'service_id' => $service->id,
                'item_text' => $itemText,
                'display_order' => $index + 1,
            ]);
        }

        $service->load('items');

        return response()->json([
            'success' => true,
            'data' => $service,
            'message' => 'Service created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:services,title,' . $id,
            'description' => 'required|string',
            'display_order' => 'required|integer|min:1',
            'icon' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*' => 'required|string|max:500',
        ]);

        $service->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'display_order' => $validated['display_order'],
            'icon' => $validated['icon'] ?? null,
        ]);

        $service->items()->delete();

        foreach ($validated['items'] as $index => $itemText) {
            ServiceItem::create([
                'service_id' => $service->id,
                'item_text' => $itemText,
                'display_order' => $index + 1,
            ]);
        }

        $service->load('items');

        return response()->json([
            'success' => true,
            'data' => $service,
            'message' => 'Service updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully'
        ]);
    }
}
