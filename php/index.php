

<?php 
    include './dbconn.php';

?>


<?php 
    function loadReportStats(){
        $stats = array(
            'totalActive' => 0, 'totalFound' => 0, 'totalSpotted' => 0,
            'human' => 0, 'pet' => 0, 'item' => 0 
        );

        $query = "SELECT * FROM report";
        $result = mysqli_query($_SESSION['dbConnection'], $query);
        if (!$result || mysqli_num_rows($result) == 0){
            $statsEncoded = json_encode($stats);
            return $statsEncoded;
        }
        while( $reportRow = mysqli_fetch_assoc($result) ){
            if($reportRow['isActive'] == '1'){
                $stats['totalActive']++;
                $stats[$reportRow['classification']]++;
            }
            if($reportRow['reportStatus'] = 'found')   $stats['totalFound']++;
            if($reportRow['type'] == 'Spotted')   $stats['totalSpotted']++;
        }    
        $statsEncoded = json_encode($stats);
        return $statsEncoded;

    }
    

    if(isset($_POST['loadStats'])){
        echo loadReportStats();
    }

?>