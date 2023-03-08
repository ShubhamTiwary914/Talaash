

$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('chats');
    $('#footer').html( loadFooterComponent() );

    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });
});

