<?php 
    include './../dbconn.php';
?>




<?php   //LOAD REPORTS

    function loadReports($reportLimit){
        $query = "SELECT * FROM report LIMIT $reportLimit";
        $result = mysqli_query( $_SESSION['dbConnection'], $query);
        $rows = mysqli_num_rows($result);

        $reports = array();
        while($row = mysqli_fetch_assoc($result)){
            $currentReport = array(
                'classification' => $row['classification'], 'last_seenTime' => $row['last_seenTime'], 'identificationImage' => $row['identificationImage'],
                'description' => $row['description'], 'isActive' => $row['isActive'], 'byUser' => $row['byUser'], 'last_seenLocation' => $row['last_seenLocation'],
                'type' => $row['type']
            );
            $reportObj = json_encode($currentReport);
            array_push($reports, $reportObj);
        }
        $reportsString = implode(",", $reports);
        echo "[$reportsString]";
    }

    if(isset($_POST['loadReports'])){
        $reportLimit = $_POST['limit'];
        loadReports($reportLimit);
        
    }

?>