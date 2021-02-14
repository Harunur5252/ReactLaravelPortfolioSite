<?php

namespace App\Http\Controllers;

use App\Model\ContactModel;
use App\Model\ClientReviewModel;
use App\Model\ProjectModel;
use App\Model\ServiceModel;
use App\Model\CourseModel;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    function countNumber(){
        $contact = ContactModel::count();
        $clinetReview = ClientReviewModel::count();
        $project = ProjectModel::count();
        $service = ServiceModel::count();
        $course = CourseModel::count();

        $countArray=[
            'contact'=>$contact,
            'review'=>$clinetReview,
            'project'=>$project,
            'service'=>$service,
            'course'=>$course,
        ];
        return json_encode($countArray);
    }
}
