/*
    Handles Creating report, loading report and marking subjects as spotted or not
*/


let reportLimit = 5;
let reportsArray = new Array();



function filterOwnReports(byUserID){
    let currentUserID = sessionStorage.getItem('ID');
    if(!(currentUserID == byUserID)){
        return `<button class='report-btn btn btn-primary'> Report Spotted </button>` 
    }
    return '';
}


function loadReports_intoFeed(){
    if(reportsArray.length > 0){
        let new_reportsFeed = "";
        for(let index=0; index < reportsArray.length; index++){
            let currentReport = `
                <div class='report'> 
                    <img src='./../upload/reports/${reportsArray[index]['classification']}s/${reportsArray[index]['identificationImage']}' 
                    class='report-image'/> <br /> <br />
                    <div class='report-description'> ${reportsArray[index]['description']} </div> <br />
                    ${filterOwnReports(reportsArray[index]['byUser'])} <br />
                    <hr class='report-seperator' />
                </div> <br /> <br />
            `;
            new_reportsFeed += currentReport;
        }
        $('#feed-content').html(new_reportsFeed);
    }else{
        $('#feed-content').html('<h3>There are no reports yet!</h3>')
    }
}

function maxedReportsPopup(){

}



function loadReports_fromDatabase(){
    $.post('./../php/pages/report.php', {
        loadReports: true,
        limit: reportLimit
    },(reports)=>{
        let loadedReports = JSON.parse(reports);
        let reportsRetrieved = 0;
        for(let i = 0; i < loadedReports.length; i++){
            let matchedReport = false;
            for(let j=0; j< reportsArray.length; j++){
                if( reportsArray[j]['ID'] == loadedReports[i]['ID'] )
                    matchedReport = true;
            }
            if(!matchedReport){
                reportsArray.push(loadedReports[i])
                reportsRetrieved++;
            }
        }           
        if(reportsRetrieved <= 0)
            maxedReportsPopup();
        loadReports_intoFeed();
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
    
    $('#feed-loader').on('click', function(){
        loadReports_fromDatabase();
        reportLimit += 5;
    });

    $('.reportBox-btn').on('click', function(){
        let reportType = $(this).attr('id').split()[0];
        sessionStorage.setItem('reportType', reportType);
        window.location.href = './makeReport.html';
    });


});

