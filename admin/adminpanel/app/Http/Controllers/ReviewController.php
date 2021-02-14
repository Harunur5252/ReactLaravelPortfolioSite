<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Model\ClientReviewModel;
use Illuminate\Support\Facades\Storage;

class ReviewController extends Controller
{
    function ReviewList(){
        $result = ClientReviewModel::all();
        return $result;
    }
    function ReviewDelete(Request $request){
        $id = $request->input('id');

        $img_one = ClientReviewModel::where('id',$id)->get(["client_img"]);
        $img_one_name = explode("/",$img_one[0]["client_img"])[4];
        Storage::delete("public/".$img_one_name);

        $result = ClientReviewModel::where('id',$id)->delete();
        return $result;
    }
    function addReview(Request $request){
        $title = $request->input('title');
        $des = $request->input('des');
        $photoPath = $request->file('photo')->store("public");
        $photoName=explode("/",$photoPath)[1];
        $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;
        $result = ClientReviewModel::insert([
            "client_title"=>$title,
            "client_img"=>$photoUrl,
            "client_description"=>$des,
        ]);
        return $result;
    }
    function editReview(Request $request){
        $id = $request->input('id');
        $result = ClientReviewModel::where('id',$id)->first();
        return $result;
    }
    function updateReview(Request $request){
        $id = $request->input('id');
        $title = $request->input('title');
        $des = $request->input('des');

        $image=$request->file('photo');

        if($image){
            $img_one = ClientReviewModel::where('id',$id)->get(["client_img"]);
            $img_one_name = explode("/",$img_one[0]["client_img"])[4];
            Storage::delete("public/".$img_one_name);

            $photoPath = $request->file('photo')->store("public");
            $photoName=explode("/",$photoPath)[1];
            $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

            $result = ClientReviewModel::where("id",$id)->update([
                "client_title"=>$title,
                "client_img"=>$photoUrl,
                "client_description"=>$des,
            ]);
            return $result;
        }else{
            $result = ClientReviewModel::where("id",$id)->update([
                "client_title"=>$title,
                "client_description"=>$des,
            ]);
            return $result;
        }
    }
}
