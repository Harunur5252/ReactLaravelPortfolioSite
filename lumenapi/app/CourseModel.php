<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CourseModel extends Model
{
    protected $table = 'course_table';
	protected $primaryKey = 'id';
	public $incrementing = true;
	protected $keyType = 'int';
	public $timestamps = false;
	// protected $dateFormat = 'U';
}
