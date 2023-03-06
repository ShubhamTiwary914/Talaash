

<?php 

    include './dbconn.php';

    //Checking if user is logged in and returns a boolean value 
    if( isset($_POST['checkUserLogs']) ){
        if( $_SESSION['userIsLogged'] ){
            echo "TRUE";
        }else{
            echo "FALSE";
        }
    }


?>