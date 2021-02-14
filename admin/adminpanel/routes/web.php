<?php

use Illuminate\Support\Facades\Route;
//Home table
Route::get('/countNumber','HomeController@countNumber')->middleware("loginCheck");

// contact table
Route::get('/contactlist','ContactController@contactList')->middleware("loginCheck");
Route::post('/contactDelete','ContactController@contactDelete')->middleware("loginCheck");
Route::post('/UpdateContact','ContactController@updateContact')->middleware("loginCheck");
Route::post('/AddContact','ContactController@addContact')->middleware("loginCheck");

// service table
Route::get('/ServiceList','ServiceController@ServiceList')->middleware("loginCheck");
Route::post('/ServiceDelete','ServiceController@ServiceDelete')->middleware("loginCheck");
Route::post('/AddService','ServiceController@addService')->middleware("loginCheck");
Route::post('/servicedataedit','ServiceController@editService')->middleware("loginCheck");
Route::post('/UpdateService','ServiceController@updateService')->middleware("loginCheck");

// review table
Route::get('/ReviewList','ReviewController@ReviewList')->middleware("loginCheck");
Route::post('/ReviewDelete','ReviewController@ReviewDelete')->middleware("loginCheck");
Route::post('/AddReview','ReviewController@addReview')->middleware("loginCheck");
Route::post('/reviewdataedit','ReviewController@editReview')->middleware("loginCheck");
Route::post('/UpdateReview','ReviewController@updateReview')->middleware("loginCheck");

// project table
Route::get('/ProjectList','ProjectController@ProjectList')->middleware("loginCheck");
Route::post('/ProjectDelete','ProjectController@ProjectDelete')->middleware("loginCheck");
Route::post('/AddProject','ProjectController@addProject')->middleware("loginCheck");
Route::post('/projectdataedit','ProjectController@editProject')->middleware("loginCheck");
Route::post('/UpdateProject','ProjectController@updateProject')->middleware("loginCheck");

// course table
Route::get('/CourseList','CourseController@CourseList')->middleware("loginCheck");
Route::post('/CourseDelete','CourseController@CourseDelete')->middleware("loginCheck");
Route::post('/AddCourse','CourseController@addCourse')->middleware("loginCheck");
Route::post('/coursedataedit','CourseController@editCourse')->middleware("loginCheck");
Route::post('/UpdateCourse','CourseController@updateCourse')->middleware("loginCheck");


Route::get('/login','AdminLoginController@loginPage');
Route::get('/onLogin/{UserName}/{Password}','AdminLoginController@onLogin');
Route::get('/logout','AdminLoginController@onLogout');


Route::post('/dataedit','ContactController@dataEdit')->middleware("loginCheck");



// Default Route; Always these routes must have to call in under wise of this route section.

Route::get('/', function () {
    return view('index');
})->middleware("loginCheck");

Route::get('{AnyRoute}', function () {
    return view('index');
})->where("AnyRoute",'.*')->middleware("loginCheck");
