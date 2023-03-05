/* 
    Contains Mathematical or Parsing Functions that don't play a direct role in js events
    but help out other js files present in the application
    Date Created: March 6 
*/


// Parses Boolean from Php String Data and converts into Javascript Boolean Expression
function booleanParser(phpBoolean){
    if(phpBoolean == "FALSE")
        return false;
    else
        return true;
}

