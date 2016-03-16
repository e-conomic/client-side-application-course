var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
	translateMessage: function(message, destLanguage) {
		AppDispatcher.dispatch({
			type: Constants.TRANSLATE_MESSAGE,
            payload: {
                message: message,
                destLanguage: destLanguage
            }
		});
	},
}