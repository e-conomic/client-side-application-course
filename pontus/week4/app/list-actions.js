var Constants = require('./constants');
var Dispatcher = require('./dispatcher');

module.exports = {
	createList(listName) {
		console.log(`dispatching ${listName}`);
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName
		});
	}
}
