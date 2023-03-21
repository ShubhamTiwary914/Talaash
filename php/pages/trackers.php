<?php
    include './../dbconn.php';
?>





<?php 
    function loadTrackers($userID){
        $trackersArray = array();
        $query = "SELECT * FROM trackers WHERE byUser = '$userID'";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $rows = mysqli_num_rows($result);
        if( mysqli_num_rows($result) > 0 ){
            while( $row = mysqli_fetch_assoc($result) ){
                $trackerData = array( 
                   "type" => $row['type'], "latitude" => $row['latitude'], "longitude" => $row['longitude'], "lastUpdated" => $row['lastUpdated'],
                   "latitudeFieldID" => $row['latitudeFieldID'], "trackerID" => $row['ID']
                );
                $trackerEncoded = json_encode($trackerData);
                array_push($trackersArray, $trackerEncoded);
            }
        }
        $trackersString = implode(",", $trackersArray);
        echo "[$trackersString]"; 
    }
    if(isset($_POST['loadTrackers'])){
        loadTrackers($_POST['userID']);
    }
?>





<?php
    function createTracker($userID, $fieldID){
        if($fieldID != ""){
            $latitudeFieldID = (intval($fieldID) % 2 == 0 ) ? ($fieldID - 1) : $fieldID;
            if($latitudeFieldID >= 8) $latitudeFieldID = 7;
            if($latitudeFieldID <= 0) $latitudeFieldID = 1;

            $longitudeFieldID = $latitudeFieldID + 1;
            $query = "INSERT INTO trackers(type, byUser, latitudeFieldID, longitudeFieldID) VALUES('tag', $userID, $latitudeFieldID, $longitudeFieldID)";
            mysqli_query( $_SESSION['dbConnection'], $query);
        }
    }
    if(isset($_POST['createTracker'])){
        createTracker($_POST['userID'], $_POST['fieldID']);
    }
?>





<?php 
    if(isset($_POST['updateTrackers'])){
        $trackerID = $_POST['trackerID'];
        $newLatitude = $_POST['newLatitude'];
        $newLongitude = $_POST['newLongitude'];
        $currTime = date("h:i:s a - d/m/Y");
        $query = "UPDATE trackers SET latitude = '$newLatitude', longitude = '$newLongitude', lastUpdated = '$currTime' WHERE ID = $trackerID";
        mysqli_query( $_SESSION['dbConnection'], $query);

    }
?>




<?php
    function removeTracker($trackerID){
        $query = "DELETE FROM trackers WHERE ID = $trackerID";
        mysqli_query( $_SESSION['dbConnection'], $query);
        echo "Deleted tracker: $trackerID";
    }
    if(isset($_POST['removeTracker']))
        removeTracker($_POST['trackerID']);
?>







