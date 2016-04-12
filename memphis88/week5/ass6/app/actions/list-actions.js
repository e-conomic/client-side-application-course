var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
	createList: function(listName) {
		if (listName == '') return;
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	}
}
