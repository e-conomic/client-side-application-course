var Constants = require('../constants');
var Dispatcher =  require('../dispatcher/dispatcher.js');
var TranslateURL = require('../translate-url.js');

function prepareMessagesForTranslate(messages) {
    var query = "";
    for (var i = 0; i < messages.length; i++) {
        query+="q="
        query+=messages[i].text;
        query+="&"
    }
    return query;
}


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
                    //console.log(json.data.languages)
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
        xmlhttp.open("GET", TranslateURL.url()+"/languages?key="+TranslateURL.key(), true);
        xmlhttp.send();
    },
    translateAll: function(messages,languageCode) {
        console.log(languageCode)
        console.log(messages)
        var messagesToTranslate=prepareMessagesForTranslate(messages);
        
        var fullURL=TranslateURL.url()+"?target="+languageCode+"&"+messagesToTranslate+"key="+TranslateURL.key()
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if(xmlhttp.status == 200){
                    var json = JSON.parse(xmlhttp.responseText);
                    //console.log(json.data.translations)
                    Dispatcher.dispatch({
                        type: Constants.TRANSLATED_MESSAGES,
                        translatedMessages: json.data.translations,
                    });
               }
               else {
                   Dispatcher.dispatch({
                        type: Constants.LANGUAGES_FAILED,
                    });
               }
            }
        }
        xmlhttp.open("GET", fullURL, true);
        xmlhttp.send();


    },
    cancelTranslations: function() {
        Dispatcher.dispatch({
                        type: Constants.CANCEL_TRANSLATION,
                    });
    },
}