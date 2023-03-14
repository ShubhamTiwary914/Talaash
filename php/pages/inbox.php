<?php 
    include './../dbconn.php';
?>





<?php   // ------------------  LOAD  MESSAGES   -----------------

    function findUserdetails($userID, $returnType){ //find username who sent the report
        $query = "SELECT * FROM users WHERE ID = '$userID' ";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);

        $row = mysqli_fetch_assoc($result);
        if($returnType == 'username')
            return $row['username'];
        return $row['image_dir'];
    }

    //report ID of the one that made the spotted report, to show to the one looking for missing subject
    function findSpottingReportID($reportID, $spottedReporterID){  
        $query = "SELECT * FROM report WHERE byUser = $spottedReporterID AND spottedReportID = $reportID ";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        if (!$result || mysqli_num_rows($result) == 0)
            return null;
        $row = mysqli_fetch_assoc($result);
        return $row['ID'];
    }


    if(isset($_POST['loadMessages'])){
        $messagesArray = array();
        $toUserID = $_POST['userID'];

        $query = "SELECT * FROM messages WHERE toUser = $toUserID OR byUser = $toUserID ORDER BY timeSent";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);


        if( mysqli_num_rows($result) > 0 ){
            while( $row = mysqli_fetch_assoc($result) ){

                $byUsername = findUserdetails($row['byUser'], 'username');
                $profileImg_name = findUserdetails($row['byUser'], 'image');
                $reportID = $row['reportID'];   //missing report
                $reportID_spotted = findSpottingReportID($reportID, $row['byUser']); 

                $messageData = array( 
                    "byUser" => $row['byUser'], "body"=> $row['body'], "timeSent" => $row['timeSent'], "dateSent" => $row['dateSent'], 
                    "isSpotted" => $row['isSpotted'], "isOneWay" => $row['isOneWay'], "byUsername" => $byUsername, "img" => $profileImg_name,
                    "reportID_spotted" => $reportID_spotted, "toUser" => $row['toUser']
                );
                $messageEncoded = json_encode($messageData);
                array_push($messagesArray, $messageEncoded);
            }
        }

        $messagesString = implode(",", $messagesArray);
        echo "[$messagesString]";
    }


?>



<?php  // ----------------- SAVE  NORMAL  MESSAGES ------------------

    if(isset($_POST['saveMessage'])){

        $byUser = $_POST['byUser'];
        $body = $_POST['body'];
        $toUser = $_POST['toUser'];
        $currentDate = date('d-m-Y');
        $currentTime = time(); 

        $query = "INSERT INTO messages(timeSent, dateSent, byUser, toUser, body, isOneWay, isSpotted) VALUES($currentTime, '$currentDate', $byUser, $toUser, '$body', false, false)";
        mysqli_query( $_SESSION['dbConnection'], $query);
    }

?>





<?php    // ----------------- SAVE  SPOTTED  MESSAGES ------------------

    //find the ID of the person who created the report
    function findReportOwner($reportID){
        $query = "SELECT * from report WHERE ID = $reportID";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $userRow = mysqli_fetch_assoc($result);
        return $userRow['byUser'];
    }


    if(isset($_POST['spottedMessage'])){
        $reportID = $_POST['reportID'];
        $finderID = $_POST['finderID'];
        $finderUsername = $_POST['finderUsername'];
        $reportOwnerID = findReportOwner($reportID);
        $currentDate = date('d-m-Y');
        $currentTime = time();
        
        $query = "INSERT INTO messages(timeSent, dateSent, byUser, toUser, isOneWay, isSpotted, reportID) VALUES('$currentTime', '$currentDate', $finderID, $reportOwnerID, true, true, $reportID)";
        mysqli_query( $_SESSION['dbConnection'], $query);
    }



?>