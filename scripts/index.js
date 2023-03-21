/* 
    Index js file for holding index.html's scripts and events, with the following functions: 
    1. Redirects User by first checking if they're logged in or not
        a. User is logged in: Load feed
        b. User is Not logged in: Redirect to Login Form

    Date Created: March 6 
*/


function load_totalStatistics(){ 
    let userIsLogged = sessionStorage.getItem('userIsLogged');
    if(userIsLogged == null)  userIsLogged = false;
    if(userIsLogged){
        $.post('./php/index.php', {
            loadStats: true
        }, (stats)=>{
            let statsJSON = JSON.parse(stats);
            let statsKeys = Object.keys(statsJSON);
            statsKeys.forEach(statsKey =>{
                $(`#stats-${statsKey}`).text(statsJSON[statsKey])
            });
        })
    }
 }



function checkUser_logs(){
    let userIsLogged = sessionStorage.getItem('userIsLogged');
    if(userIsLogged == null)  userIsLogged = false;
    if(!userIsLogged)   //user not logged, redirect to signup page
        window.location.href = "./pages/signup.html"
}


$(document).ready(function(){
    checkUser_logs();
    load_totalStatistics();
    $('#header').html(loadHeaderComponent( "./assets/main/mainLogo.png" ));
    loadHeaderStyles('home');
    $('#footer').html( loadFooterComponent('./') );
    setInterval(load_totalStatistics, 1000);

    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./', targetPage); 
    });
});

