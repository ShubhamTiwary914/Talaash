/*
    For handling creating of report and spotted forms
    Loads and changes form dynamically depending on whether the report type is a new missing report or spotted report
*/


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


function submitReport(){
    uploadFiles('report-form-image');
    let imageTitle = !($(`#report-form-image`).val() == "") ? $(`#report-form-image`)[0].files[0]['name'] : "";
    let FIRTitle = !($(`#report-form-FIR`).val() == "") ? $(`#report-form-FIR`)[0].files[0]['name'] : "";
    let reportData = {
        saveReport: true, category: $('#report-form-category').val().split(" ")[0], reportID: $('#report-form-ID').val(), type: $('#report-form-type').val(),
        imageName: imageTitle, description: $('#report-form-description').val(), FIRName: FIRTitle, time: $('#report-form-time').val(),
        date: $('#report-form-date').val(), location: $('#report-form-location').val(), byUserID: sessionStorage.getItem('ID')
    }
    $.post('./../php/pages/report.php', reportData, (response)=>{
        alertSuccessful_reportCreation('success');
    });
}



$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    $('#footer').html( loadFooterComponent() );
    $('#report-created-alert').hide()

    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });


    $('#report-form-category').change(function(){
        categorySelection_changed();
    });

    $('#report-submit').click(function(){
        submitReport();
    });


});

