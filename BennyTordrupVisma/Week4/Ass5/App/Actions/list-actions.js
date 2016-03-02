var Constants = require('../constants');
var Dispatcher = require('flux').Dispatcher;

module.exports = {
	createList: function(listName) {
		
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	}
}
