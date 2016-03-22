var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher');
let xhr = require('./script');


module.exports = {

	getLanguages(userSpecifiedText, userSpecifiedLanguage) { 

		// ajax logic

		let query = "?q="+userSpecifiedText;
		let language = "&target="+userSpecifiedLanguage;
		let key = "key="+googleKey;

		xhr('GET', 'https://www.googleapis.com/language/translate/v2'+query+language+key, 

		Dispatcher.dispatch({
			type: Constants.GET_LANGUAGES
		});
	},

	languagesRequested() { 
		Dispatcher.dispatch({ 
			type: Constants.LANGUAGES_REQUESTED
		});
}
