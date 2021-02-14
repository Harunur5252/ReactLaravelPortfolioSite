<?php


$router->get('/ChartData', ['middleware'=>'auth','uses'=>'ChartDataController@onSelectAll']);

$router->get('/ClientReview', ['middleware'=>'auth','uses'=>'ClientReviewController@onSelectAll']);

$router->post('/ContactData', ['middleware'=>'auth','uses'=>'ContactController@onContactSend']);

$router->get('/CourseHome', ['middleware'=>'auth','uses'=>'CourseController@onSelectFour']);
$router->get('/CourseAll', ['middleware'=>'auth','uses'=>'CourseController@onSelectAll']);
$router->get('/CourseDetails/{courseId}', ['middleware'=>'auth','uses'=>'CourseController@onSelectDetails']);

$router->get('/fotter', ['middleware'=>'auth','uses'=>'FooterController@onSelect']);

$router->get('/information', ['middleware'=>'auth','uses'=>'InformationController@onSelect']);

$router->get('/service', ['middleware'=>'auth','uses'=>'ServiceController@onSelect']);

$router->get('/projectthree', ['middleware'=>'auth','uses'=>'ProjectController@onSelectThree']);
$router->get('/projectall', ['middleware'=>'auth','uses'=>'ProjectController@onSelectAll']);
$router->get('/projectdetails/{projectId}', ['middleware'=>'auth','uses'=>'ProjectController@onSelectDetails']);

$router->get('/videohome', ['middleware'=>'auth','uses'=>'HomeEtcController@onSelectVideo']);
$router->get('/totalprojectclient', ['middleware'=>'auth','uses'=>'HomeEtcController@onSelectProjectClient']);
$router->get('/techdes', ['middleware'=>'auth','uses'=>'HomeEtcController@onSelectTechDes']);
$router->get('/hometoptitle', ['middleware'=>'auth','uses'=>'HomeEtcController@onSelectHomeTitle']);