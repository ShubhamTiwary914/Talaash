

<?php 

    //Checking if user is logged in and returns a boolean value 
    if( isset($_POST['checkUserLogs']) ){
        if(isset($_SERVER['userIsLogged'])){
            echo "TRUE";
        }else{
            echo "FALSE";
        }
    }


?>