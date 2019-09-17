<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';
	protected $primaryKey = 'id_transaction';
	public $incrementing = false;
	public $timestamps = false;

	public function users(){
		return $this->belongsTo(Users::class,'id_user');
	}

	public function goods(){
		return $this->belongsToMany(Goods::class, 'Transaction_Detail', 'id_transaction', 'id_goods');
	}

}
