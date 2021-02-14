<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ClientReviewModel;
class ClientReviewController extends Controller
{
    function onSelectAll(){
    	$result = ClientReviewModel::all();
    	return $result;
    }
}
