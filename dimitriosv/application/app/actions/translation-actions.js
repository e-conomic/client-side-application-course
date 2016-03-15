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
                    var json = JSON.parse(xmlhttp.responseText);
                    console.log(json.data.languages)
                    Dispatcher.dispatch({
                        type: Constants.LANGUAGES_RECEIVED,
                        languages: json.data.languages,
                    });
               }
               else {
                   Dispatcher.dispatch({
                        type: Constants.LANGUAGES_FAILED,
                    });
               }
            }
        }
        xmlhttp.open("GET", "https://www.googleapis.com/language/translate/v2/languages?key=AIzaSyB6LYUvbFC73pLDjn-FhpcEvSgJ48f3Ag4", true);
        xmlhttp.send();
    },
}