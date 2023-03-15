/*
    1. View Report by taking reportID from sessional storage 'viewReportID' and delete the reportID immediately
    2. IF report belongs to current user's report => allow them to delete it permanently
    3. IF report is a reponse(spotted) report to the user's already missing report => allow them to mark it as verified or NOT
*/

let currentReportID = '';
let reportTextKeys = ['classification', 'last_seenTime', 'last_seenLocation', 'description', 'type', 'status']
let report_nullAlternatives = ['Classification', 'Last Seen Time', 'Last Seen Location', 'Description','Type of Report', 'Status']


function checkIf_spottedReport_isUsers(spottedReportID){
    let userID = sessionStorage.getItem('ID');
    $.post('./../php/pages/reportViewer.php', {
        checkUserReports: true,
        userID: parseInt(userID),  spottedReportID: spottedReportID
    }, (doesBelong)=>{
        let doesBelong_parsed = JSON.parse(doesBelong)
        if(doesBelong_parsed['doesBelong'] == 'true'){
            $('#report-found').show()
            $('#report-invalid').show()
        }else if(doesBelong_parsed['doesBelong'] == 'false'){
            $('#report-found').hide()
            $('#report-invalid').hide()
        }
    })
}

function checkIf_currentReport_iSUsers(byUserID){
    if(byUserID == sessionStorage.getItem('ID'))
        $('#report-delete').show()
    else
        $('#report-delete').hide()
}


function setReportImage_andDocuments(reportDataJSON){
    if(reportDataJSON['identificationImage'] != "") 
        $('#identificationImage').html(`<img src="${reportDataJSON['identificationImage']}">`)    
    else
        $('#identificationImage').html(`No identification Image has been attached`)   
}



function loadReport_fromDatabase(){
    $.post('./../php/pages/reportViewer.php', {
        loadReport: true,
        viewReportID: currentReportID
    }, (reportData)=>{
        //console.log(reportData)
        let reportDataJSON = JSON.parse(reportData)
        setReportImage_andDocuments(reportDataJSON);      
        for(let index=0; index < reportTextKeys.length; index++){
            let reportKey = reportTextKeys[index];
            if(reportDataJSON[reportKey] != '')
                $(`#report-${reportTextKeys[index]}`).html(`<div class='report-textData'> ${reportDataJSON[reportKey]} </div>`);
            else
                $(`#report-${reportTextKeys[index]}`).html(`<div class='report-textData'> ${report_nullAlternatives[index]} has Not been Set! </div>`);
        }
        checkIf_currentReport_iSUsers(reportDataJSON['byUser']);
        checkIf_spottedReport_isUsers(reportDataJSON['spottedReportID']);
    })
}


function handle_reportControls(buttonID){
    $.post('./../php/pages/reportViewer.php', {
        reportController: true, controllerID: buttonID, reportID: currentReportID
    });
}


function report_alertHandler(reportType, endTimer = false){
    if(endTimer){
        $('#report-alert').hide();
        window.location.href = '';
    }
        
    else{
        $('#report-alert').show().text(`Report has been marked as ${reportType}`);

        setTimeout(() => { report_alertHandler('', true) }, 1500);
    }
}


$(document).ready(function(){
    currentReportID = parseInt(sessionStorage.getItem('viewReportID'));
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    $('#footer').html( loadFooterComponent('./../') );
    $('#report-control button').hide();
    $('#report-alert').hide();

    $('.navLink').on('click', function(){  
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });

    $('#report-control button').click(function(){
        handle_reportControls($(this).attr('id').split('-')[1])
        report_alertHandler($(this).attr('id').split('-')[1])  
    })

    loadReport_fromDatabase();
    

})

