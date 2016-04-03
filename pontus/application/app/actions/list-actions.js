var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher');

module.exports = {
	createList(listName) {
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName
		});
	}
}
