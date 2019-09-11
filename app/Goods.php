<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    protected $table = 'ova_goods';
	protected $primaryKey = 'id_goods';
	public $incrementing = false;
	public $timestamps = false;
}