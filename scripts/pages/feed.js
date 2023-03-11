
let reportLimit = 5;
let reportsArray = new Array();

function loadReports_fromDatabase(){
    $.post('./../php/pages/report.php', {
        loadReports: true,
        limit: reportLimit
    },(reports)=>{
        let loadedReports = JSON.parse(reports);
        for(let rowIndex = 0; rowIndex < loadedReports.length; rowIndex++)
            reportsArray.push(loadedReports[rowIndex])
        console.log(reportsArray)
    })
}


$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('reports');
    $('#footer').html( loadFooterComponent() );
    loadReports_fromDatabase();


    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });
    
   




});

