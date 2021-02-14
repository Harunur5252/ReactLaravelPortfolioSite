<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Model\ProjectModel;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    function ProjectList(){
        $result = ProjectModel::all();
        return $result;
    }
    function ProjectDelete(Request $request){
        $id = $request->input('id');

        $img_one = ProjectModel::where('id',$id)->get(["img_one"]);
        $img_two = ProjectModel::where('id',$id)->get(["img_two"]);

        $img_one_name = explode("/",$img_one[0]["img_one"])[4];
        $img_two_name = explode("/",$img_two[0]["img_two"])[4];

        Storage::delete("public/".$img_one_name);
        Storage::delete("public/".$img_two_name);

        $result = ProjectModel::where('id',$id)->delete();
        return $result;
    }
    function addProject(Request $request){
        $projectName = $request->input('projectName');
        $projectDes = $request->input('projectDes');
        $projectFeature = $request->input('projectFeature');
        $projectPreviewLink= $request->input('projectPreviewLink');

        $photoPath = $request->file('projectCardImage')->store("public");
        $photoName=explode("/",$photoPath)[1];
        $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

        $photoPathTwo = $request->file('projectDetailsImage')->store("public");
        $photoNameTwo=explode("/",$photoPathTwo)[1];
        $photoUrlTwo = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoNameTwo;

        $result = ProjectModel::insert([
            "project_name"=>$projectName,
            "img_one"=>$photoUrl,
            "img_two"=>$photoUrlTwo,
            "short_description"=>$projectDes,
            "project_feature"=>$projectFeature,
            "live_preivew"=>$projectPreviewLink,

        ]);
        return $result;
    }
    function editProject(Request $request){
        $id = $request->input('id');
        $result = ProjectModel::where('id',$id)->first();
        return $result;
    }
    function updateProject(Request $request){
        $id = $request->input('id');
        $projectName = $request->input('project_name');
        $projectDes = $request->input('short_description');
        $projectFeature = $request->input('project_feature');
        $projectPreviewLink= $request->input('live_preivew');

        $image1=$request->file('img_one');
        $image2=$request->file('img_two');

        if($image1==true && $image2==false){
            $img_one = ProjectModel::where('id',$id)->get(["img_one"]);
            $img_one_name = explode("/",$img_one[0]["img_one"])[4];
            Storage::delete("public/".$img_one_name);

            $photoPath = $request->file('img_one')->store("public");
            $photoName=explode("/",$photoPath)[1];
            $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

            $result = ProjectModel::where("id",$id)->update([
                "project_name"=>$projectName,
                "img_one"=>$photoUrl,
                "short_description"=>$projectDes,
                "project_feature"=>$projectFeature,
                "live_preivew"=>$projectPreviewLink,
            ]);
            return $result;
        }else if($image2==true && $image1==false){
            $img_two = ProjectModel::where('id',$id)->get(["img_two"]);
            $img_two_name = explode("/",$img_two[0]["img_two"])[4];
            Storage::delete("public/".$img_two_name);

            $photoPathTwo = $request->file('img_two')->store("public");
            $photoNameTwo=explode("/",$photoPathTwo)[1];
            $photoUrlTwo = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoNameTwo;

            $result = ProjectModel::where("id",$id)->update([
                "project_name"=>$projectName,
                "img_two"=>$photoUrlTwo,
                "short_description"=>$projectDes,
                "project_feature"=>$projectFeature,
                "live_preivew"=>$projectPreviewLink,
            ]);
            return $result;
        }else if($image1 && $image2){
            $img_one = ProjectModel::where('id',$id)->get(["img_one"]);
            $img_one_name = explode("/",$img_one[0]["img_one"])[4];
            Storage::delete("public/".$img_one_name);

            $img_two = ProjectModel::where('id',$id)->get(["img_two"]);
            $img_two_name = explode("/",$img_two[0]["img_two"])[4];
            Storage::delete("public/".$img_two_name);

            $photoPath = $request->file('img_one')->store("public");
            $photoName=explode("/",$photoPath)[1];
            $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

            $photoPathTwo = $request->file('img_two')->store("public");
            $photoNameTwo=explode("/",$photoPathTwo)[1];
            $photoUrlTwo = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoNameTwo;

            $result = ProjectModel::where("id",$id)->update([
                "project_name"=>$projectName,
                "img_one"=>$photoUrl,
                "img_two"=>$photoUrlTwo,
                "short_description"=>$projectDes,
                "project_feature"=>$projectFeature,
                "live_preivew"=>$projectPreviewLink,
            ]);
            return $result;

        }
        else{
            $result = ProjectModel::where("id",$id)->update([
                "project_name"=>$projectName,
                "short_description"=>$projectDes,
                "project_feature"=>$projectFeature,
                "live_preivew"=>$projectPreviewLink,
            ]);
            return $result;
        }
    }
}
