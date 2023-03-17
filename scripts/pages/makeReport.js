/*
    For handling creating of report and spotted forms
    Loads and changes form dynamically depending on whether the report type is a new missing report or spotted report
*/

function set_makeReportType(){
    let reportType = sessionStorage.getItem('reportType').split('-')[1];
    $(`#report-category-${reportType}`).attr('selected', true);
    if( sessionStorage.getItem('reportID') != null ){
        $('#report-form-ID').val(sessionStorage.getItem('reportID'))
        sessionStorage.setItem('reportID', null);
    } 
    categorySelection_changed();
}


function alertSuccessful_reportCreation(type){
    if(type == 'success'){
        $('#report-created-alert').show()
        setTimeout(()=>{
            alertSuccessful_reportCreation('close');
        }, 1000);
    }if(type == 'close'){
        $('#report-created-alert').hide()
    }
}

function send_ReportSpottedMessage(reportID, finderID, finderUsername){
    $.post('./../php/pages/inbox.php', {
        spottedMessage: true,
        reportID: reportID,
        finderID: finderID,
        finderUsername: finderUsername
    }, (res) =>{  console.log(res) });
}

function categorySelection_changed(){
    let category =  $('#report-form-category').val().split(" ")[0];
    if(category == "Spotted"){
        $('.report-form-optionalText').text('(optional)')
        $('#report-form-additionals').hide();
        $('#report-form-IDbox').show(); 
    }else if(category == "Missing"){
        $('.report-form-optionalText').text('')
        $('#report-form-additionals').show();
        $('#report-form-time').val('00:00:00');
        $('#report-form-IDbox').hide();
    }
}




//upload the report image and report FIR files
function uploadFiles( eventObjID ){
    if(!( $(`#${eventObjID}`).val() == "" )){
        let formData = new FormData();
        let imageData = $(`#${eventObjID}`)[0].files[0];
        let reportType = $('#report-form-type').val();

        formData.append('image', imageData);
        formData.append('reportImage', true);
        formData.append('reportType', reportType);

        $.ajax({
            url: './../php/pages/upload.php',
            data: formData,
            type: 'post',
            contentType: false,
            processData: false
        });
    }
}
function submitReport(lastCoordinates){
    uploadFiles('report-form-image');
    let imageTitle = !($(`#report-form-image`).val() == "") ? $(`#report-form-image`)[0].files[0]['name'] : "";
    let FIRTitle = !($(`#report-form-FIR`).val() == "") ? $(`#report-form-FIR`)[0].files[0]['name'] : "";
    let reportData = {
        saveReport: true, category: $('#report-form-category').val().split(" ")[0], reportID: $('#report-form-ID').val(), type: $('#report-form-type').val(),
        imageName: imageTitle, description: $('#report-form-description').val(), FIRName: FIRTitle, time: $('#report-form-time').val(),
        date: $('#report-form-date').val(), location: $('#report-form-location').val(), byUserID: sessionStorage.getItem('ID'),
        coordinates: lastCoordinates
    }

    $.post('./../php/pages/report.php', reportData, (response)=>{
        alertSuccessful_reportCreation('success');
        if($('#report-form-category').val().split(" ")[0]   ==  'Spotted' )
            send_ReportSpottedMessage( $('#report-form-ID').val(),  sessionStorage.getItem('ID') , sessionStorage.getItem('username'));
    });
}



function getPinpointedLocation(){
    console.log('running...')
    let apiKey = 'd0e6bda9f31d47cda3da00d1a3c703da';
    let query = $('#report-form-location').val();
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${query}&lang=en&limit=5&type=city&format=json&apiKey=${apiKey}`).then(response => response.json()).then(result =>{ //main code here(code block after lat and long are retrieved)
        let latSum = 0, longSum = 0;
        for(let index = 0; index < result['results'].length; index++){
            let resultObject = result['results'][index];
            latSum += resultObject['lat']
            longSum += resultObject['lon'] 
        }
        let latitudeAvg = latSum / (result['results'].length)
        let longitudeAvg = longSum / (result['results'].length)

        let coordinatesDD =   `${latitudeAvg} ${longitudeAvg}`;
        submitReport(coordinatesDD);

    }).catch(error => console.log('error', error));
}




$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    $('#footer').html( loadFooterComponent('./../') );
    $('#report-created-alert').hide()
    set_makeReportType();
    

    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });


    $('#report-form-category').change(function(){
        categorySelection_changed();
    });

    $('#report-submit').click(function(){
        getPinpointedLocation();
    });


});

