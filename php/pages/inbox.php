<?php 
    include './../dbconn.php';
?>





<?php   //SAVE --- MESSAGES



?>





<?php   // ------------------  LOAD  MESSAGES   -----------------

    function findUsername(){ //find username who sent the report

    }

    if(isset($_POST['loadMessages'])){
        $messagesArray = array();
        $toUserID = $_POST['userID'];

        $query = "SELECT * FROM messages WHERE toUser = $toUserID  ORDER BY ID";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);

        if( mysqli_num_rows($result) > 0 ){
            while( $row = mysqli_fetch_assoc($result) ){
                $messageData = array( 
                    "byUser" => $row['byUser'], "body"=> $row['body'], "timeSent" => $row['timeSent'], "dateSent" => $row['dateSent'], 
                    "isSpotted" => $row['isSpotted'], "isOneWay" => $row['isOneWay']
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
        
        $query = "INSERT INTO messages(dateSent, byUser, toUser, isOneWay, isSpotted) VALUES('$currentDate', $finderID, $reportOwnerID, true, true)";
        mysqli_query( $_SESSION['dbConnection'], $query);
    }



?>