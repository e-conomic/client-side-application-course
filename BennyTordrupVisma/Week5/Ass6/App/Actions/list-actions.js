var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
	createList: function(listName) {
		AppDispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	},
    
    toggleIsSelected: function(listId) {
        AppDispatcher.dispatch({
            type: Constants.TOGGLE_IS_SELECTED,
            listId: listId,
        });
    },
}