var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
    receiveTranslationResponse: function(response) {
        AppDispatcher.dispatch({
            type: Constants.TRANSLATE_MESSAGE_RESPONSE,
            payload: {
                response: response
            }
        });
    },
    
    receiveLanguagesResponse: function(response) {
        AppDispatcher.dispatch({
            type: Constants.REQUEST_LANGUAGES_RESPONSE,
            payload: {
                response: response
            }
        });
    },
}