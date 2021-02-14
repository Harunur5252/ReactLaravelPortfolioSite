<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class LoginModel extends Model
{
    protected $table = 'admin_login';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    // protected $dateFormat = 'U';
}
