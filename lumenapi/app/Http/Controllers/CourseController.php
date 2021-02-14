<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CourseModel;
class CourseController extends Controller
{
    function onSelectFour(){
        $result = CourseModel::limit(4)->get();
        return $result;
    }
    function onSelectAll(){
    	$result = CourseModel::all();
        return $result;
    }
    function onSelectDetails($courseId){
    	$id = $courseId;
    	$result = CourseModel::where(['id'=>$id])->get();
        return $result;
    }
}
