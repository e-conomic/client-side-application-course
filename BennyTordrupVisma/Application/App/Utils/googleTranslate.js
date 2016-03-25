var ServerActions = require("../Actions/message-server-actions");
var request = require("superagent");
var translateUrl = require("../translate-url");

module.exports = {
    translateText: function(msg, language) {
        var completeUrl = translateUrl + '&q=' + msg.text + '&target=' + language + '&id=' + msg.id;
        // request(completeUrl, (error, response, body) => {
        //     if (error) {
        //         console.error(error);
        //     } else {
        //         ServerActions.receiveTranslationResponse(response);
        //     }
        // })
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveTranslationResponse(response);
            });
    }
};