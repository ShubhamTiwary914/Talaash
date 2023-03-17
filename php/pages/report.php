<?php 
    include './../dbconn.php';
?>




<?php   //LOAD REPORTS

    function loadReports($reportLimit, $myOwnReports = false, $userID = null){
        $query = "";
        if($myOwnReports)
            $query = "SELECT * FROM report WHERE byUser = $userID";
        else
            $query = "SELECT * FROM report LIMIT $reportLimit";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $rows = mysqli_num_rows($result);

        $reports = array();
        while($row = mysqli_fetch_assoc($result)){
            $currentReport = array(
                'classification' => $row['classification'], 'last_seenTime' => $row['last_seenTime'], 'identificationImage' => $row['identificationImage'],
                'description' => $row['description'], 'isActive' => $row['isActive'], 'byUser' => $row['byUser'], 'last_seenLocation' => $row['last_seenLocation'],
                'type' => $row['type'], 'ID' => $row['ID'], 'coordinates' => $row['lastCoordinates']
            );
            $reportObj = json_encode($currentReport);
            array_push($reports, $reportObj);
        }
        $reportsString = implode(",", $reports);
        echo "[$reportsString]";
    }

    if(isset($_POST['loadReports'])){
        $reportLimit = $_POST['limit'];
        if(isset($_POST['loadMyReports']))
            loadReports($reportLimit, true, $_POST['userID']);
        else
            loadReports($reportLimit);   
    }

?>



<?php  //SAVE REPORTS 

    if(isset($_POST['saveReport'])){
        $keys = array_keys($_POST);

        $spottedReportID = $_POST['reportID'];
        $classification = strtolower($_POST['type']);
        $last_seenTime = $_POST['date'];
        $firCopy = $_POST['FIRName'];
        $identificationImage = $_POST['imageName'];
        $description = $_POST['description'];
        $isActive = true;
        $byUser = $_POST['byUserID'];
        $last_seenLocation = $_POST['location'];
        $type = $_POST['category'];
        $lastCoordinates = $_POST['coordinates'];
        

        $query = "INSERT INTO report(classification, last_seenTime, firCopy, identificationImage, description, isActive, byUser, last_seenLocation, type, spottedReportID, lastCoordinates) VALUES('$classification', '$last_seenTime', '$firCopy', '$identificationImage', '$description', $isActive, $byUser, '$last_seenLocation', '$type', '$spottedReportID', '$lastCoordinates')";
        mysqli_query( $_SESSION['dbConnection'], $query);
    }
?>