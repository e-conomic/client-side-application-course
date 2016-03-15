var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
	updateOptions: function(showCombinedMessages) {
		AppDispatcher.dispatch({
			type: Constants.UPDATE_OPTIONS,
            payload: {
			    showCombinedMessages: showCombinedMessages,
            }
		});
	},
    
    updateSelectedLanguage: function(selectedLanguage) {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_LANGUAGE,
            payload: {
                selectedLanguage: selectedLanguage,
            }
        });
    },
}