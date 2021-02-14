<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Admin Login</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
    <link href="{{asset('css/responsive.css')}}" rel="stylesheet">
    <link href="{{asset('css/style.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('/')}}backend/css/mdb.min.css">


</head>
<body>

<div class="container mt-5">
    <h1 class="text-center">Admin Login</h1>
    <div class="row d-flex justify-content-center mt-3">
        <div class="col-lg-8 col-md-8 col-sm-12">
           <div class="card">
               <div class="card-body">
                   <input  id="username" type="text" class="form-control" placeholder="User Name"><br>
                   <input  id="password" type="password" class="form-control" placeholder="Password"><br>
                   <button id="loginBtn" type="submit" onclick="adminLogin()" class="btn btn-block normal-btn" style="font-family:sans-serif;font-size: 20px;">Login</button>
               </div>
           </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="{{asset('/')}}backend/js/mdb.min.js"></script>
<script type="text/javascript">

    function adminLogin(){
        let UserName = document.getElementById("username").value;
        let Password = document.getElementById("password").value;

        let xttp = new XMLHttpRequest();
        xttp.onreadystatechange=function (){
            if(this.status===200 && this.readyState===4){

                if(this.responseText==="1"){
                    window.location.href="/";

                }else {

                }

            }
        }
        xttp.open("GET","/onLogin/"+UserName+"/"+Password,true);
        xttp.send();


        // axios.get('/onLogin',+UserName+Password)
        //     .then(function (response) {
        //         if(this.status===200 && this.responseText==="1"){
        //            alert("success")
        //         }else{
        //             alert("fail")
        //         }
        //
        //     })
        //     .catch(function (error) {
        //
        //         console.log(error);
        //     })


    }

</script>



</body>
</html>
