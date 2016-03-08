var Constants = require('../constants')
var Dispatcher = require('../dispatcher')

module.exports = {
	createList: function(listName) {
		console.log("list-actions called with listName: " + listName)
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	}
}
