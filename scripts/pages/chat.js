

let messages = {} // Format: { "byUserID": messageData(array)  }





function load_userMessages_fromDatabase(){
    let inboxData = {
        loadMessages: true,
        userID: sessionStorage.getItem('ID')
    };
    $.post('./../php/pages/inbox.php', inboxData, (fetchedMessages)=>{
        let fetchedMessagesArray = JSON.parse(fetchedMessages);
        fetchedMessagesArray.forEach(messageData => {
            if(!messages.hasOwnProperty(messageData['byUser']))  //create space if not already exists
                messages[messageData['byUser']] = new Array();
            let byUserID = messageData['byUser'];
            delete messageData['byUser'];
            messages[byUserID].push(messageData);

        });
        
    });
}

function load_userMessages_intoPage(){
    load_userMessages_fromDatabase();
}



$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('chats');
    $('#footer').html( loadFooterComponent() );
    load_userMessages_intoPage();

    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });


    
});

