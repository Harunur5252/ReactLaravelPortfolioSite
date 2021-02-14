<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\ContactModel;
class ContactController extends Controller
{
    function contactList(){
        $result = ContactModel::all();
        return $result;
    }

    function contactDelete(Request $request){
        $id = $request->input('id');
        $result = ContactModel::where('id',$id)->delete();
        return $result;
    }
    function dataEdit(Request $request){
        $id = $request->input('id');
        $result = ContactModel::where('id',$id)->first();
        return $result;
    }
    function updateContact(Request $request){
        $id = $request->input('id');
        $upName = $request->input('name');
        $upEmail = $request->input('email');
        $upMessage = $request->input('message');
        $result = ContactModel::where("id",$id)->update([
            "name"=>$upName,
            "email"=>$upEmail,
            "message"=>$upMessage,
        ]);
        return $result;
    }
    function addContact(Request $request){
        $name = $request->input('name');
        $email = $request->input('email');
        $message = $request->input('message');
        $result = ContactModel::insert([
            "name"=>$name,
            "email"=>$email,
            "message"=>$message,
        ]);
        return $result;
    }


}
