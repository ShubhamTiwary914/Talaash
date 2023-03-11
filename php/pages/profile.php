<?php 
    include './../dbconn.php';

    function filter_stringInput($stringInput){
        return mysqli_real_escape_string( $_SESSION['dbConnection'], $stringInput);
    }
?>


<?php
//  DESCRIPTION
    if(isset($_POST['saveDescription'])){
        $newDescription = filter_stringInput($_POST['newDesc']);
        $username = filter_stringInput($_POST['username']);
        $email = filter_stringInput($_POST['email']);

        $query = "UPDATE users SET description = '$newDescription' WHERE username='$username' OR email = '$email' ";
        mysqli_query( $_SESSION['dbConnection'], $query);
    }
?>


<?php 
// ADDRESS
    if(isset($_POST['saveAddress'])){
        $addressType = $_POST['type'];
        $addressValue = $_POST['newAddress'];
        $username = $_POST['username'];
        $email = $_POST['email'];

        $query = "UPDATE users SET $addressType = '$addressValue'  WHERE username='$username' OR email = '$email'";
        mysqli_query( $_SESSION['dbConnection'], $query);
    }


?>