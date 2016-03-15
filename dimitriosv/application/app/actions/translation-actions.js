var Constants = require('../constants');
var Dispatcher =  require('../dispatcher/dispatcher.js');

module.exports = {
    getAvailableLanguages: function() {
        Dispatcher.dispatch({
            type: Constants.LANGUAGES_REQUESTED,
        });
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if(xmlhttp.status == 200){
                   console.log(xmlhttp.responseText);
               }
               else {
                   console.log('something else other than 200 was returned')
               }
            }
        }
        xmlhttp.open("GET", "ajax_info.txt", true);
        xmlhttp.send();
    },
}