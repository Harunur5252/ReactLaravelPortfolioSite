<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContactModel;
class ContactController extends Controller
{
    function onContactSend(Request $req){

       
        $contentArray = json_decode($req->getContent(),true);


    	$name  = $contentArray['name'];
    	$email = $contentArray['email'];
    	$msg   = $contentArray['msg'];

    	$result = ContactModel::insert([

           'name'    => $name,
           'email'   => $email,
           'message' => $msg,
    	]);
    	if($result == true){
    		return 1;
    	}else{
    		return 0;
    	}
    	
    }
}
