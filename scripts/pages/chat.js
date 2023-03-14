
var messages = {} // Format: { "byUserID": messageData(array)  } // from other people to user messages
let readMode = false;
let currentMessagerName = ''; // username(string) 
let currentMessagerID = '';



// GENERATE BLOCKS OF STRING ---------------------

function generate_SpottedReportBody(isSpotted, username, body){
    if(isSpotted == 1) isSpotted = true;
    else isSpotted = false;
    if(isSpotted)
        return `${username} has responded to your missing report!`;
    else{
        let splitMessage = body.split(' ');
        if(splitMessage.slice(0.8).length >= 8){
            splitMessage = splitMessage.slice(0, 8);
            splitMessage.push('...')
        }
            
        let joinedMessage = splitMessage.join(' ');
        return joinedMessage;
    }
}

function generateUserImage( imageName ){
    let imageTitle = '';
    if(imageName == null)
        imageTitle = 'default.png';
    else
        imageTitle = imageName
    return `./../upload/profileImg/${imageTitle}`;
}





// LOAD MESSAGES INTO INBOX ------------------------------

function load_userMessages_fromDatabase(){
    let inboxData = {
        loadMessages: true,
        userID: sessionStorage.getItem('ID')
    };
    $.post('./../php/pages/inbox.php', inboxData, (fetchedMessages)=>{   
        let fetchedMessagesArray = JSON.parse(fetchedMessages);
        fetchedMessagesArray.forEach(messageData => {
            let byUserID = messageData['byUser'];
        
            if(!messages.hasOwnProperty(messageData['byUser']))  //create space if not already exists
                messages[messageData['byUser']] = new Array();
             messages[byUserID].push(messageData);
                  
        });
        load_userMessages_intoPage();
    });
}

function load_userMessages_intoPage(){
    let sentUserIDs = Object.keys(messages);
    let inboxContent = '';
    tempMessages = messages;
    sentUserIDs.forEach(userID => {
        let lastMessageIndex = (messages[userID].length) - 1;
        let byUsername = messages[userID][lastMessageIndex]['byUsername'];
        let profileName = messages[userID][lastMessageIndex]['img'];
        let isSpotted = messages[userID][lastMessageIndex]['isSpotted'];
        let messageBody = messages[userID][lastMessageIndex]['body'];
        
        if(userID != sessionStorage.getItem('ID')){
            inboxContent += `
                <div class='inbox-message' id='messager-${userID}'>
                    <div class='row'>
                        <div class='col-2'> 
                            <img src='${generateUserImage(profileName)}' class='message-userProfile'/>
                        </div> 
                        <div class='col-2'>  
                            <br /> <br /> <br />
                            <div class='message-username'> ${byUsername} </div> 
                            <div class='message-timer text-secondary'> : 3 hours ago </div> 
                        </div>
                    </div>
                    <div class='row message-body'>
                        ${generate_SpottedReportBody( isSpotted, byUsername, messageBody)}
                    </div>
                    <br />
                </div>
            `;
        }

    });
    if(sentUserIDs.length <= 0)
        $('#inbox-content').html(`<h3>You have no mails in your inbox yet!</h3>`); 
    else
        $('#inbox-content').html(inboxContent); 
}





// CHATBOX CONTROLS ------------------------------------------------
function load_spottedReportLink_OR_nonSpottedBody(isSpotted, body, reportID_spotted, byUsername, byUserID){  //if spotted: returns body + link || not spotted: returns body 
    if(isSpotted == 0){
        if(byUserID == sessionStorage.getItem('ID'))
            return `<div class='user-message'> ${body} </div>`;
        return `<div class='message-box'>${body}</div>`;
    }
    else{
        if(byUserID == sessionStorage.getItem('ID'))
            return '';
        return `<div class='message-box'>
            ${byUsername} has responded to your missing report <br />  <br />
            <button class='report-viewer btn btn-secondary' id='report-${reportID_spotted}'> View More 
            </button>
        </div>`;
    }
}

//filter in messages where byUser = currentUser and toUser = selected user 
function filterMessages( currentUserID, messagerID ){
    let filteredMessage = new Array();
    if(messages.hasOwnProperty(currentUserID)){
        messages[currentUserID].forEach(message =>{
            if(message['toUser'] == messagerID)
                filteredMessage.push(message)
        });
    }
    return filteredMessage
}


function load_chatMode( messagerID ){
    readMode = true;
    //CSS
    $('.inbox-message').css({'background-color': 'white', 'cursor': 'default'})
    $('#inbox, #header, #footer').css({ 'filter': 'blur(15px) opacity(10%)' });
    $('#chatBox').attr('hidden', false);
    //SCRIPT
    
    let messagesByUser = filterMessages( sessionStorage.getItem('ID'), messagerID );
    let userMessages = messages[messagerID]  //from other to user
    userMessages = userMessages.concat(messagesByUser);

    let messagesCount = userMessages.length;
    if(messagesCount > 0){
        //setting chatbox username
        let messagerUsername = messages[messagerID][0]['byUsername']
        $('#chatBox-username').text(messagerUsername)

        //setting chatbox messages
        let chatBoxHtml = '';
        userMessages.forEach(message =>{
            chatBoxHtml += `
                <div class='chatBox-message'>
                    ${load_spottedReportLink_OR_nonSpottedBody(message['isSpotted'], message['body'], message['reportID_spotted'], message['byUsername'], message['byUser'])}
                </div>
            `;
        })
        $('#chatBox-content').html(chatBoxHtml);
    }
}


function exit_chatMode(){
    readMode = false;
    $('#inbox, #header, #footer').css({ 'filter': 'none' });
    $('#chatBox').attr('hidden', true);
}



//  SAVE MESSAGES INTO DATABASE ---------------------
function saveMessages(){
    if(readMode){
        if( $('#chatBox-input').val() != ""){
            let saveData = {
                saveMessage: true,
                byUser: sessionStorage.getItem('ID'),  body: $('#chatBox-input').val(), 
                toUser: currentMessagerID
            }
            $.post('./../php/pages/inbox.php', saveData, (response)=>{
                $('#chatBox-input').val('');
                clearMessages();
                load_userMessages_fromDatabase();
                load_chatMode(currentMessagerID);
            })
        }
    }
}

function clearMessages(){
    Object.keys(messages).forEach(ID =>{
        messages[ID] = new Array();
    });
}





$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('chats');
    $('#footer').html( loadFooterComponent() );
    load_userMessages_fromDatabase();

    $('.navLink').on('click', function(){
        if(!readMode){
            let targetPage =  $(this).attr('id').split('-')[0];
            moveTo_headerLink('./../', targetPage); 
        } 
    });

    $('#inbox-content').on('mouseover', '.inbox-message', function(){
        if(!readMode)   $(this).css({'background-color': 'rgba(97, 95, 95, 0.1)', 'cursor': 'pointer'})
    })
    $('#inbox-content').on('mouseout', '.inbox-message', function(){
        if(!readMode)   $(this).css({'background-color': 'white', 'cursor': 'default'})
    })



    $('#inbox-content').on('click', '.inbox-message', function(){
        if(!readMode){
            currentMessagerID = $(this).attr('id').split('-')[1];
            load_chatMode(currentMessagerID);
        }
    })

    $('#chatBox-exit').click(function(){
        exit_chatMode();
    })

    $(document).keypress(function(event){
        var keycode = event.keyCode ? event.keyCode : event.which;
        if(keycode == '13')
            saveMessages();
    })

});

