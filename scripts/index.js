/* 
    Index js file for holding index.html's scripts and events, with the following functions: 
    1. Redirects User by first checking if they're logged in or not
        a. User is logged in: Load feed
        b. User is Not logged in: Redirect to Login Form

    Date Created: March 6 
*/

let userIslogged = false;


function checkUser_logs(){
    $.post('./php/index.php', {
        checkUserLogs: true
    }, (userLogs)=>{
        userIslogged = booleanParser(userLogs)
        if(!userIslogged){
            redirectUser_toSignup();
        }
    });
}

function redirectUser_toSignup(){
    window.location.href = "./pages/login.html"
}



$(document).ready(function(){
    checkUser_logs();

});