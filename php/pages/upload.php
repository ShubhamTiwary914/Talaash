<?php

    if(isset($_POST['reportFIR'])){

    }

    if(isset($_POST['reportImage'])){
        $fileName = $_FILES['image']['name'];
        $reportType = $_POST['reportType']."s";
        $directory = "./../../upload/reports/$reportType/".$fileName;
        move_uploaded_file($_FILES['image']['tmp_name'], $directory);
    }

?>
