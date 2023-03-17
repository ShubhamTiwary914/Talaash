/* 
    Contains Mathematical or Parsing Functions that don't play a direct role in js events
    but help out other js files present in the application
    Date Created: March 6 
*/

const alphabetsString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetsList = alphabetsString.split("");


// Parses Boolean from Php String Data and converts into Javascript Boolean Expression
function booleanParser(phpBoolean){
    var filteredString = "";
    for(let index=0; index < phpBoolean.length; index++){
        if( alphabetsList.includes(phpBoolean[index]) )  //if character is an alphabet, filter that character through
            filteredString += phpBoolean[index]
    }
    if(filteredString == "FALSE")
        return false;
    else
        return true;
}




function distanceBetween_twoCoordinates(lat1, lon1, lat2, lon2, unit = 'Kilometer') {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (distance > 1) {
			distance = 1;
		}
		distance = Math.acos(distance);
		distance = distance * 180/Math.PI;
		distance = distance * 60 * 1.1515;
        if (unit == "Kilometer")  
            distance = distance * 1.609344  
		return distance; //default as Miles
	}
}

