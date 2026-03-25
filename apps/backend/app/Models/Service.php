<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'description',
        'display_order',
        'icon',
    ];

    public function items()
    {
        return $this->hasMany(ServiceItem::class);
    }
}
