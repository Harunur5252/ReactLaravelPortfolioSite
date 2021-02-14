<?php

namespace App\Http\Controllers;
use App\Model\ClientReviewModel;
use Illuminate\Http\Request;
use App\Model\CourseModel;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    function  CourseList(){
        $result = CourseModel::all();
        return $result;
    }

    function CourseDelete(Request $request){
        $id = $request->input('id');

        $img_one = CourseModel::where('id',$id)->get(["small_img"]);
        $img_one_name = explode("/",$img_one[0]["small_img"])[4];
        Storage::delete("public/".$img_one_name);

        $result = CourseModel::where('id',$id)->delete();
        return $result;
    }
    function addCourse(Request $request){
        $courseTitle = $request->input('courseTitle');
        $courseDes = $request->input('courseDes');
        $courseLongTitle = $request->input('courseLongTitle');
        $courseLongDes= $request->input('courseLongDes');
        $courseLecture= $request->input('courseLecture');
        $courseStudent= $request->input('courseStudent');
        $courseSkill= $request->input('courseSkill');
        $courseVideo= $request->input('courseVideo');
        $courseLink= $request->input('courseLink');

        $photoPath = $request->file('courseSmallImg')->store("public");
        $photoName=explode("/",$photoPath)[1];
        $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

        $result = CourseModel::insert([
            "short_title"=>$courseTitle,
            "small_img"=>$photoUrl,
            "short_des"=>$courseDes,
            "long_title"=>$courseLongTitle,
            "long_des"=>$courseLongDes,
            "total_lecture"=>$courseLecture,
            "total_student"=>$courseStudent,
            "skill_all"=>$courseSkill,
            "video_url"=>$courseVideo,
            "course_link"=>$courseLink,
        ]);
        return $result;
    }
    function editCourse(Request $request){
        $id = $request->input('id');
        $result = CourseModel::where('id',$id)->first();
        return $result;
    }
    function updateCourse(Request $request){
        $id = $request->input('id');
        $courseUpTitle = $request->input('courseUpTitle');
        $courseUpDes = $request->input('courseUpDes');
        $courseUpLecture = $request->input('courseUpLecture');
        $courseUpStudent= $request->input('courseUpStudent');

        $image1=$request->file('courseUpSmallImg');
        if($image1){
            $img_one = CourseModel::where('id',$id)->get(["small_img"]);
            $img_one_name = explode("/",$img_one[0]["small_img"])[4];
            Storage::delete("public/".$img_one_name);

            $photoPath = $request->file('courseUpSmallImg')->store("public");
            $photoName=explode("/",$photoPath)[1];
            $photoUrl = "http://".$_SERVER["HTTP_HOST"]."/storage/".$photoName;

            $result = CourseModel::where("id",$id)->update([
                "short_title"=>$courseUpTitle,
                "small_img"=>$photoUrl,
                "short_des"=>$courseUpDes,
                "total_lecture"=>$courseUpLecture,
                "total_student"=>$courseUpStudent,
            ]);
            return $result;
        }else{
            $result = CourseModel::where("id",$id)->update([
                "short_title"=>$courseUpTitle,
                "short_des"=>$courseUpDes,
                "total_lecture"=>$courseUpLecture,
                "total_student"=>$courseUpStudent,
            ]);
            return $result;
        }
    }

}
