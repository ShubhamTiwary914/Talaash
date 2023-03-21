
let trackersArray = [];


function loadUserTrackers(){
    let userID = sessionStorage.getItem('ID');
    $.post('./../php/pages/trackers.php', {
        loadTrackers: true,
        userID: userID
    },(trackersData)=>{
        trackersArray = JSON.parse(trackersData);
        setInterval(updateTrackersData, 1000);
        //console.log(trackersArray)
        if(trackersArray.length <= 0)
            $('#trackerBox').html("<br /> <br /> <h3> You have no Trackers Added yet! </h3> <br /> <br />");
        else{
            let trackerBoxHTML = '';
            for(let trackerIndex = 0; trackerIndex < trackersArray.length; trackerIndex++){
                trackerBoxHTML += `
                    <br />
                    <div class='row tracker' id='tracker-${trackerIndex}'>
                        <div class='col-3'>
                            <div class='tracker-id'> <b> ID: </b> ${trackersArray[trackerIndex]['latitudeFieldID']} </div> <br />
                            <div class='tracker-type'> <b> Type: </b> ${trackersArray[trackerIndex]['type']} </div>
                        </div>
                        <div class='col-3'>
                            <div class='tracker-distance'>  <b> Current Distance: </b> &nbsp &nbsp ${loadCurrentDistance(trackersArray[trackerIndex]['latitude'], trackersArray[trackerIndex]['longitude'])} </div> <br />
                            <div class='tracker-lastUpdate'> <b> Last Updated: </b> &nbsp &nbsp ${trackersArray[trackerIndex]['lastUpdated']} </div>
                        </div>
                        <div class='col-2'></div>
                        <div class='col-3'>
                        <br />
                            <button class='btn btn-danger remove-tracker'> Remove </button>
                        </div>
                    </div>
                    <br /> <br />
                `;
            }
            $('#trackerBox').html(trackerBoxHTML);
        }
    });
}


function loadCurrentDistance(latitudeString, longitudeString){
    let trackerLat = parseFloat(latitudeString);
    let trackerLng = parseFloat(longitudeString);
    let userLat = parseFloat(sessionStorage.getItem('location').split(' ')[1])
    let userLng = parseFloat(sessionStorage.getItem('location').split(' ')[0])

    let distance = distanceBetween_twoCoordinates(trackerLat, trackerLng, userLat, userLng, "Kilometer");
    return distance.toFixed(2) + " kms";
}


function setTracker_forUser(){
    $.post('./../php/pages/trackers.php', {
        createTracker: true,
        userID: sessionStorage.getItem('ID'),
        fieldID: $('#trackerFieldInput').val()
    },()=>{
        alertTrackerAddition();
    })
}

function alertTrackerAddition(endAlert = false){
    if(endAlert){
        $('#creationAlert').hide();
        window.location.href = '';
    }else{
        $('#creationAlert').show().html("<h3> Your Tracker has been Added! </h3>");
        setTimeout(()=>{
            alertTrackerAddition(true);
        }, 1500);
    }
}


function updateTrackersData(){
    for(let trackerIndex=0; trackerIndex < trackersArray.length; trackerIndex++){
        let latitudeField  = trackersArray[trackerIndex]['latitudeFieldID'];
        let longitudeField =  parseInt(latitudeField) + 1;
        let fetchedLatitude = parseFloat(sessionStorage.getItem('location').split(' ')[1])
        let fetchedLongitude = parseFloat(sessionStorage.getItem('location').split(' ')[0])

        function updateCoordinates_fromDatabase(trackerIndex, fetchedLatitude, fetchedLongitude){
            $.post('./../php/pages/trackers.php', {
                updateTrackers: true,
                trackerID: parseInt(trackersArray[trackerIndex]['trackerID']),
                newLatitude: fetchedLatitude,
                newLongitude: fetchedLongitude
            },(res)=>{
                console.log(res);
            })
        }
        $.get(`https://api.thingspeak.com/channels/2070132/fields/${latitudeField}.json?api_key=GPS598S48EOT8DTN&results=1`,{}, (trackersData)=>{
            fetchedLatitude = parseFloat(trackersData['feeds'][0][`field${latitudeField}`])
            updateCoordinates_fromDatabase(trackerIndex, fetchedLatitude, fetchedLongitude)
            $(`.tracker-distance:eq(${trackerIndex})`).html(`<b> Current Distance: </b> &nbsp &nbsp ${loadCurrentDistance(fetchedLatitude, fetchedLongitude)} </b>`)   
        });       
        $.get(`https://api.thingspeak.com/channels/2070132/fields/${longitudeField}.json?api_key=GPS598S48EOT8DTN&results=1`,{}, (trackersData)=>{        
            if(trackersData['feeds'][0][`field${longitudeField}`] != null)
                fetchedLongitude = parseFloat(trackersData['feeds'][0][`field${longitudeField}`])
            updateCoordinates_fromDatabase(trackerIndex, fetchedLatitude, fetchedLongitude)
            $(`.tracker-distance:eq(${trackerIndex})`).html(`<b> Current Distance: </b> &nbsp &nbsp ${loadCurrentDistance(fetchedLatitude, fetchedLongitude)} </b>`)   
        });
           
    }
    
}

function removeTracker(trackerNum){
    let trackerIndex = parseInt(trackerNum);
    let trackerID = trackersArray[trackerIndex]['trackerID']
    $.post('./../php/pages/trackers.php',{
        removeTracker: true,
        trackerID: trackerID
    },()=>{
        window.location.href = '';
    })
}



$(document).ready(function(){
    $('#header').html(loadHeaderComponent( "./../assets/main/mainLogo.png" ));
    loadHeaderStyles('tracker');
    $('#footer').html( loadFooterComponent('./../') );
    $('#creationAlert').hide();
    loadUserTrackers();

    $('.navLink').on('click', function(){
        let targetPage =  $(this).attr('id').split('-')[0];
        moveTo_headerLink('./../', targetPage); 
    });

    $('#trackerAddButton').click(function(){
        setTracker_forUser();
    });

    $('#trackerBox').on('click', '.remove-tracker', function(){
        removeTracker($(this).parent().parent().attr('id').split('-')[1]);
    });
});