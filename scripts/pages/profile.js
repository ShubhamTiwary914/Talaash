/*
    For Handling Profile Page Events
    1. Loads data onto profile elements taken from the user's database 
    Date Created: March 9
*/

//gets data from sessional storage(taken from register.php) and imports the data onto respective profile element 

//LOAD    -------------------------------------------------------
function load_userSessionData(){ 
    let userDataList = JSON.parse(sessionStorage.getItem('userDataList'));
    for(let listIndex = 0; listIndex < userDataList.length; listIndex++){
        let dataKey = userDataList[listIndex];
        let dataValue = sessionStorage.getItem(dataKey);
        if( !(dataValue == "")){
            if(dataKey == "city"  ||  dataKey == "state")
                $(`#profile-${dataKey}`).val(dataValue);       
            else
                $(`#profile-${dataKey}`).text(dataValue);
        }
            
    }
}


function load_userReports(){
    let currentUserID = sessionStorage.getItem('ID');
    $.post('./../php/pages/report.php', {
        loadReports: true,
        loadMyReports: true,
        userID: currentUserID,
        limit: 1
    }, (reports)=>{
        let reportsArray = JSON.parse(reports)
        console.log(reportsArray)
        if(reportsArray.length <= 0)
            $('#profile-userReports').html('<h5 class="text-secondary"> You have no active reports! </h5>')
        else{
            let userReports = '';
            for(let index = 0; index < reportsArray.length; index++){
                let report_imageSource = `./../upload/reports/${reportsArray[index]['classification']}s/${reportsArray[index]['identificationImage']}`;
                let reportStatus = reportsArray[index]['isActive'] == "1" ? "Active" : "InActive";
                
                userReports += `
                    <br /> <br />
                    <div class='user-report row'>
                        <div class='col-3'> <img src='${report_imageSource}' class='report-image'> <br /> </div> 
                        <div class='col-3'>  <br /> <b>Status:</b> <br />${reportStatus}   </div>
                        <div class='col-3'>  <br /> <b>Report Type:</b> ${reportsArray[index]['type']}   </div>
                        <div class='col-1'>  </div>
                        <div class='col-2'>  <br /> <button class='btn btn-success report-viewer' id='report-${reportsArray[index]['ID']}'> View </button> </div>
                    </div>
                `;
            }
            $('#profile-userReports').html(userReports);
        }
    })
}







//  SAVE   ---------------------------------------------
function saveDescription(){
    let newDescription = $('#profile-description').val();
    $.post('./../php/pages/profile.php',{
        saveDescription: true,
        newDesc: newDescription,
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email')
    }, ()=>{
        profileAlert_handler('Your Description has been Saved!')
    })
}



function addLocation_inDatabase(addressValue, addressType){
    $.post('./../php/pages/profile.php',{
        saveAddress: true,
        newAddress: addressValue,
        type: addressType,
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email')
    }, (res)=>{
        profileAlert_handler(`Your new ${addressType} has been saved!`)
    })
}

function addUser_location(addressType){
    const success = (position) =>{
        let longt = position.coords.longitude;
        let latt = position.coords.latitude;
        $(`#profile-location`).text(`${longt} N \t${latt} E`);

        let addressValue = `${longt} ${latt}`;
        addLocation_inDatabase(addressValue, addressType)

    }
    const error = () =>{
        alert('Make sure you have a proper internet connection and add location for better accuracy!')
    }

    navigator.geolocation.getCurrentPosition(success, error);
}


function saveLocations(saveBtnElement){
    let addressType = saveBtnElement.attr('id').split('-')[0];
    let addressValue = "";
    if(addressType == "location"){
        addUser_location(addressType);
    }
    else
        addressValue = $(`#profile-${addressType}`).val();
        addLocation_inDatabase(addressValue, addressType);
}





//EVENT HANDLERS -------------------------------------------

function profileAlert_handler(message, end = false){
    if(end)
        $('#profile-alert').hide()
    else{
        $('#profile-alert').show()
        $('#profile-alert').text(message)
        setTimeout(()=>{ profileAlert_handler('', true)}, 1000)
    }
}


function reportViewController(reportID){
    let viewReportID_integer = parseInt(reportID)
    sessionStorage.setItem('viewReportID', viewReportID_integer)
    window.location.href = './reportViewer.html';
}



$(document).ready(function(){
    load_userSessionData();
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('profile');
    $('#footer').html( loadFooterComponent('./../') );
    $('#profile-alert').hide()
  
    load_userReports();

    $('.navLink').on('click', function(){  
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });


    $('#profile-descriptionSave').click(function(){
        saveDescription();
    });

    //Address Data
    $('.address-save').on('click', function(){
        saveLocations($(this)); 
    })

    $('#profile-userReports').on('click', '.report-viewer', function(){
        let reportID = $(this).attr('id').split('-')[1];
        reportViewController(reportID);
    })


});




