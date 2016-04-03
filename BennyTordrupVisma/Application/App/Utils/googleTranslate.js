var ServerActions = require("../Actions/message-server-actions");
var request = require("superagent");
var translateUrl = require("../translate-url");

module.exports = {
    translateText: function(msg, language) {
        var completeUrl = translateUrl.url() + '&q=' + msg.text + '&target=' + language + '&id=' + msg.id;
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveTranslationResponse(response);
            });
    },
    
    getLangauges: function(language) {
        var completeUrl = translateUrl.getLanguagesUrl() + '&target=' + language; 
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveLanguagesResponse(response);
            });
    },
};