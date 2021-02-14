<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\LoginModel;
class AdminLoginController extends Controller
{
    function  loginPage(){
        //$result = LoginModel::all();
        return view('login');
    }
    function  onLogin(Request $request){
        $UserName=$request->UserName;
        $Password=$request->Password;

        $count = LoginModel::where("user_name",$UserName)->where("password",$Password)->count();
        if($count==1){
            $request->session()->put("userNamekey",$UserName);
            return "1";

        }else{
            return "0";
        }
    }
    function onLogout(Request $request){
        $request->session()->flash("userNamekey");
        return redirect("/login");
    }
}
