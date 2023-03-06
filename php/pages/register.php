<?php 

    include './../dbconn.php';

    function get_DateCreated(){
        $date_of_creation = strtotime(date("Y-m-d H:i:s")."-10 second");
        $date_of_creation = mysqli_real_escape_string( $_SESSION['dbConnection'], date("Y-m-d H:i:s", $date_of_creation));
        return $date_of_creation;
    }



?>



<?php 

    function signUp($username, $password, $email, $phone_no, $isGovernmentOfficial){
        $creationDate = get_DateCreated();

        //Filters Input data to prevent script injection 
        $username = mysqli_real_escape_string( $_SESSION['dbConnection'], $username);
        $email = mysqli_real_escape_string( $_SESSION['dbConnection'], $email);
        $phone_no = mysqli_real_escape_string( $_SESSION['dbConnection'], $phone_no);
        $isGovernmentOfficial = mysqli_real_escape_string( $_SESSION['dbConnection'], $isGovernmentOfficial);


        
        $query = "SELECT * FROM users WHERE username='$username'";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $len_result = mysqli_num_rows( $result);

        echo $len_result;


        

    }


    function login(){

    }


    //BACKEND CALLS HANDLER
    if(isset($_POST['signUp']))
        signUp( $_POST['uname'], $_POST['pwd'], $_POST['email'], $_POST['phone'], $_POST['isGovOff']);
    if(isset($_POST['signIn']))
        login();
?>    