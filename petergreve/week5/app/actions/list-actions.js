var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
	createList: function(listName) {
				Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	},
    hideMessages: function(listId){
        Dispatcher.dispatch({
            type: Constants.HIDEMESSAGES,
            listId: listId
        });
    },
    unHideMessages: function(listId){
        Dispatcher.dispatch({
            type: Constants.UNHIDEMESSAGES,
            listId: listId
        });
    }
}
