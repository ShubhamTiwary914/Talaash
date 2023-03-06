

let switchInput = false;



$(document).ready(function(){
   
    $('#switchInput').on('click', ()=>{
        userType_labelSwitcher();
    });

});



function userType_labelSwitcher(){
    switchInput = !switchInput;
    if(switchInput)
        $('#switchLabel').text("Government Official")
    else
        $('#switchLabel').text("Civilian")
}