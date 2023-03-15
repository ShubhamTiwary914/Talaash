<?php 
    include './../dbconn.php';
?>




<?php  // REPORT LOADER   -----------------
    function loadReport($reportID){
        $query = "SELECT * FROM report WHERE ID = $reportID";
        $result = mysqli_query($_SESSION['dbConnection'], $query);
        $reportString = '{';

        $reportRow = mysqli_fetch_assoc($result);
        $reportData = array( 
            'classification' => $reportRow['classification'], 'last_seenTime' => $reportRow['last_seenTime'], 'firCopy' => $reportRow['firCopy'],
            'identificationImage' => $reportRow['identificationImage'], 'description' => $reportRow['description'], 'byUser' => $reportRow['byUser'],
            'last_seenLocation' => $reportRow['last_seenLocation'], 'type' => $reportRow['type'], 'spottedReportID' => $reportRow['spottedReportID'],
            'status' => $reportRow['reportStatus']
        );
        $reportKeys = array_keys($reportData);
        for($index=0; $index < sizeof($reportData); $index++){
            $reportKey = $reportKeys[$index];
            $reportValue = $reportData[$reportKey]; 
            $reportString .= sprintf('"%s":"%s"', $reportKey, $reportValue);
            if($index < sizeof($reportData) - 1)
                $reportString.= ','; 
        }
        $reportString.= '}';

        echo "$reportString";
    }

    if(isset($_POST['loadReport'])){
        loadReport($_POST['viewReportID']);
    }

?>




<?php   //REPORT EDITOR / MANAGER --------------------
     //(boolean)  checks if the report of spotted type is a response to one of the user's missing reports
     function spottedReport_belongsToUser($userID, $spottedReportID){
        $doesBelong = 'false';
        //check all of user's reports, if no report made, then immediately required report doesnt belong to user
        $query = "SELECT * from report WHERE byUser = $userID "; 
        $result = mysqli_query($_SESSION['dbConnection'], $query);
        if (!$result || mysqli_num_rows($result) == 0)
            return $doesBelong;
        else{
            $userReportsCount = mysqli_num_rows($result);
            while($userReportRow = mysqli_fetch_assoc($result)){
                if($userReportRow['ID'] == $spottedReportID )
                    $doesBelong = 'true';
            }
        }
        return sprintf('{"doesBelong":"%s"}', $doesBelong);
    }


    if(isset($_POST['checkUserReports'])){
        echo spottedReport_belongsToUser($_POST['userID'], $_POST['spottedReportID']);
    }


    if(isset($_POST['reportController'])){
        $controllerType = $_POST['controllerID'];
        $reportID = $_POST['reportID'];
        reportController($controllerType, $reportID);
    }

    function reportController($controllerType, $reportID){
        $query = '';
        if( ($controllerType == 'found') || ($controllerType == 'invalid') )
            $query = "UPDATE report SET reportStatus = '$controllerType' WHERE ID = $reportID";
        else if($controllerType == 'delete')
            $query = '';
        mysqli_query($_SESSION['dbConnection'], $query);
    }



?>
