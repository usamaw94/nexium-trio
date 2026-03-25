<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('display_order')->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $testimonial
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quote' => 'required|string',
            'author' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'display_order' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'success' => true,
            'data' => $testimonial,
            'message' => 'Testimonial created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found'
            ], 404);
        }

        $validated = $request->validate([
            'quote' => 'required|string',
            'author' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'display_order' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $testimonial->update($validated);

        return response()->json([
            'success' => true,
            'data' => $testimonial,
            'message' => 'Testimonial updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Testimonial not found'
            ], 404);
        }

        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial deleted successfully'
        ]);
    }
}
