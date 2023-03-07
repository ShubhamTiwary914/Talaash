<?php   //FILES IMPORTS /   GLOBAL VARIABLES   /   HELPER FUNCTIONS
    include './../dbconn.php';
    

    function get_DateCreated(){
        $date_of_creation = strtotime(date("Y-m-d H:i:s")."-10 second");
        $date_of_creation = mysqli_real_escape_string( $_SESSION['dbConnection'], date("Y-m-d H:i:s", $date_of_creation));
        return $date_of_creation;
    }
 
    function filter_stringInput($stringInput){
        return mysqli_real_escape_string( $_SESSION['dbConnection'], $stringInput);
    }
?>




<?php //SIGNUP HANDLER
    function checkIf_userExists($username, $password){
        $query = "SELECT * FROM users WHERE username='$username' ";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $len_result = mysqli_num_rows( $result);

        if($len_result > 0)
            return TRUE;
        return FALSE;
    }


    function checkIf_contacttaken($email, $phone_no){
        $query = "SELECT * FROM users WHERE email='$email' OR phone_no='$phone_no' ";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $len_result = mysqli_num_rows( $result);

        if($len_result > 0)
            return TRUE;
        return FALSE;
    }

    function saveUser_toDatabase($username, $password, $email, $phone_no, $isGovernmentOfficial, $date_of_creation){
        $hashedPassword= password_hash( $password, PASSWORD_DEFAULT);
        $query = "INSERT INTO users( username, pwd, email, phone_no, isGovernmentOfficial, creationDate) VALUES('$username','$hashedPassword', '$email', '$phone_no', 
        '$isGovernmentOfficial', '$date_of_creation')";

        mysqli_query( $_SESSION['dbConnection'], $query);
    }


    function signUp($username, $password, $email, $phone_no, $isGovernmentOfficial){
        $creationDate = get_DateCreated();

        //Filters Input data to prevent script injection
        $username = filter_stringInput($username);
        $password = filter_stringInput($password);
        $email =filter_stringInput($email);
        $phone_no = filter_stringInput($phone_no);
        $isGovernmentOfficial = filter_stringInput($isGovernmentOfficial);

       
       if( !checkIf_userExists($username, $password) ){   //if user does'nt exist then create one
            if( !checkIf_contacttaken($email, $phone_no) ){     //if email or phone NOT taken then allow signup
                saveUser_toDatabase($username, $password, $email, $phone_no, $isGovernmentOfficial, $creationDate);
            }else{   //if email or phone taken then don't allow signup
                echo '{ "contact": true,  "username": false}';
            }
       }else{    //if user does exist, then account with this infomation cannot be created
            echo '{ "contact": false,  "username": true   }';
       }

    }
?>






<?php  //LOGIN HANDLER
    function generate_userLoginCookie($rememberUser){
        if($rememberUser){ //create cookie and remember user

        }
    }

    function login($userData, $password, $rememberUser){
        $userData = filter_stringInput($userData);
        $password = filter_stringInput($password);

        $query = "SELECT * from users WHERE username = '$userData' OR email = '$userData' OR phone_no='$userData' ";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        if( mysqli_num_rows($result) > 0 ){ //User does exist, check that user's password
            $userRow = mysqli_fetch_assoc($result);
            $verifiedPassword = password_verify($password, $userRow['pwd']);
            if($verifiedPassword){   //Password matches with user Data, login user
                generate_userLoginCookie($rememberUser);
                echo '{ "correctPwd": true,  "correctUserData": true}';
            }else{   //Incorrect password
                echo '{ "correctPwd": false,  "correctUserData": true}';
            }
        }else{    //User does not exist
            echo '{ "correctPwd": true,  "correctUserData": false}';
        }
    }
?>






<?php 
    //BACKEND CALLS HANDLER
    if(isset($_POST['signUp']))
        signUp( $_POST['uname'], $_POST['pwd'], $_POST['email'], $_POST['phone'], $_POST['isGovOff']);
    if(isset($_POST['signIn']))
        login( $_POST['uData'], $_POST['password'], $_POST['rememberMe']);
?>    