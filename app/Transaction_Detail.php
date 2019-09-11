<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction_Detail extends Model
{
    protected $table = 'transaction_details';
	protected $primaryKey = 'id_transaction_detail';
	public $timestamps = false;

	public function transaction(){
		return $this->belongsTo(Transaction::class,'id_transaction');
	}

	public function goods(){
		return $this->belongsTo(Goods::class,'id_goods');
	}
}
