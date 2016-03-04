var Constants = require('../constants');
var Dispatcher =  require('../dispatcher/dispatcher.js');

module.exports = {
	createList: function(listName) {
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	}
}
