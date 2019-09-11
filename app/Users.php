<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';
	protected $primaryKey = 'id_user';
	public $timestamps = false;

	public function role(){
		return $this->belongsTo(Role::class,'id_role');
	}
}
