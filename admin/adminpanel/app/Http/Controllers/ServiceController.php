<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\ServiceModel;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    function ServiceList(){
        $result = ServiceModel::all();
        return $result;
    }
    function ServiceDelete(Request $request){
        $id = $request->input('id');

        $img_one = ServiceModel::where('id',$id)->get(["service_logo"]);
        $img_one_name = explode("/",$img_one[0]["service_logo"])[4];
        Storage::delete("public/".$img_one_name);

        $result = ServiceModel::where('id',$id)->delete();
        return $result;
    }
    function addService(Request $request){
        $title = $request->input('name');
        $des = $request->input('des');

        $photoPath = $request->file('logo')->store("public");
        $photoName=explode("/",$photoPath)[1];
        $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

        $result = ServiceModel::insert([
            "service_name"=>$title,
            "service_logo"=>$photoUrl,
            "service_des"=>$des,
        ]);
        return $result;
    }
    function editService(Request $request){
        $id = $request->input('id');
        $result = ServiceModel::where('id',$id)->first();
        return $result;
    }
    function updateService(Request $request){
        $id = $request->input('id');
        $title = $request->input('title');
        $des = $request->input('des');

        $image=$request->file('photo');

        if($image){
            $img_one = ServiceModel::where('id',$id)->get(["service_logo"]);
            $img_one_name = explode("/",$img_one[0]["service_logo"])[4];
            Storage::delete("public/".$img_one_name);

            $photoPath = $request->file('photo')->store("public");
            $photoName=explode("/",$photoPath)[1];
            $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

            $result = ServiceModel::where("id",$id)->update([
                "service_name"=>$title,
                "service_logo"=>$photoUrl,
                "service_des"=>$des,
            ]);
            return $result;
        }else{
            $result = ServiceModel::where("id",$id)->update([
                "service_name"=>$title,
                "service_des"=>$des,
            ]);
            return $result;
        }
    }
}



