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

