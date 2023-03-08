<?php 
    session_start();
    
    //SQLI DATABASE CREDENTIALS
    $http_host = $_SERVER['HTTP_HOST'];
    $database_userName = "root";
    $database_userPassword = "";
    $database_name = "talaash";
    $_SESSION['dbConnection'] = mysqli_connect($http_host, $database_userName, $database_userPassword, $database_name);
    



?>