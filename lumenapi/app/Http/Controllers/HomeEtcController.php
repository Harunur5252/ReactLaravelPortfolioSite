<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\HomeEtcModel;
class HomeEtcController extends Controller
{
    function onSelectVideo(){
    	$result = HomeEtcModel::select('id','video_description','video_url')->get();
    	return $result;
    }
     function onSelectProjectClient(){
    	$result = HomeEtcModel::select('id','total_project','total_client','works')->get();
    	return $result;
    }
     function onSelectTechDes(){
    	$result = HomeEtcModel::select('id','tech_description')->get();
    	return $result;
    }
     function onSelectHomeTitle(){
    	$result = HomeEtcModel::select('id','home_title','home_subtitle')->get();
    	return $result;
    }
}
