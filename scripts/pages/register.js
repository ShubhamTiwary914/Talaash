/* 
    Handling Signup and Login Forms 
    1. Switches catergory whether uses signs up as civilian or government official
    2. Handles links changes between signup and login pages
        

    Date Created: March 6 
*/

//VARIABLES
let switchInput = false;



$(document).ready(function(){
    //Loading Component and switch
    $('#footer').html(loadFooterComponent());
    $('#switchInput').on('click', ()=>{
        userType_labelSwitcher();
    });


    // Links
    $('#loginLink').on('click', function(){
        loadLogin_page();
    });
    $('#signUpLink').on('click', function(){
        loadSignUp_page();
    })


    //SIgnin / Signup
    $('#signUp_button').on('click', function(){
        signupUser();
    })
    $('#signIn_button').on('click', function(){
        loginUser();
    })
});


//Switch between civilian or official
function userType_labelSwitcher(){
    switchInput = !switchInput;
    if(switchInput)
        $('#switchLabel').text("Government Official")
    else
        $('#switchLabel').text("Civilian")
}


//Links switcher
function loadLogin_page(){
    window.location.href = "./../pages/login.html";
}
function loadSignUp_page(){
    window.location.href = "./../pages/signup.html";
}


function alert_takenField(isTaken){
    if(isTaken.contact){
        $('#contactTaken_alerter').text('The Email or Phone Number has already been Taken!')
        setTimeout(disable_alerterText, 2000)
    }
    if(isTaken.username){
        $('#usernameTaken_alerter').text('Username has already been Taken!')
        setTimeout(disable_alerterText, 2000)
    }
}

function disable_alerterText(){
    $('#usernameTaken_alerter').text('');
    $('#contactTaken_alerter').text('');
}


//register to database
function signupUser(){
    let username = $('#input-uname').val()
    let password = $('#input-pwd').val()
    let email = $('#input-email').val()
    let phone_no = $('#input-phone').val();
    let isGovernmentOfficial = switchInput;

    
    $.post('./../php/pages/register.php', {
        uname: username,
        pwd: password,
        email: email,
        phone: phone_no,
        isGovOff: isGovernmentOfficial,
        signUp: true 
    }, (response)=>{   //callback after user signs up 
       var isTaken = JSON.parse(response);
       alert_takenField(isTaken);
    });

}


//login by verifying user data from database
function loginUser(){

}
