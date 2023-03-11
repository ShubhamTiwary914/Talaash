/*
    For Handling Profile Page Events
    1. Loads data onto profile elements taken from the user's database 
    Date Created: March 9
*/

//gets data from sessional storage(taken from register.php) and imports the data onto respective profile element 

//LOAD    ---------------
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
function loadReports(){
    //connect to profile.php and load reports

}




//  SAVE   ------------------
function saveDescription(){
    let newDescription = $('#profile-description').val();
    $.post('./../php/pages/profile.php',{
        saveDescription: true,
        newDesc: newDescription,
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email')
    }, ()=>{
        $('#profile-descriptionSave').attr('disabled', true)
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
        console.log(res);
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





$(document).ready(function(){
    load_userSessionData();
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('profile');
    $('#footer').html( loadFooterComponent() );
  

    $('.navLink').on('click', function(){  
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });

    //Description
    $('#profile-description').keypress(function(){
        $('#profile-descriptionSave').attr('disabled', false);
    });
    $('#profile-descriptionSave').click(function(){
        saveDescription();
    });

    //Address Data
    $('.address-save').on('click', function(){
        saveLocations($(this)); 
    })


});




