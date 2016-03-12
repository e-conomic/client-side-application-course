var Constants = require('../constants')
var Dispatcher = require('../dispatcher')

module.exports = {
	createList: function(listName) {
		Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	}, 
	updateFilter: function(listId, visible) {
		Dispatcher.dispatch({
			type: Constants.UPDATE_FILTER,
			listId: listId,
			visible: visible
		});
	}
}
