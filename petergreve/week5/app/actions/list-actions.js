var Constants = require('../constants/constants');
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
	createList: function(listName) {
				Dispatcher.dispatch({
			type: Constants.CREATE_LIST,
			listName: listName,
		});
	},
    hideListMessages: function(listId){
        Dispatcher.dispatch({
            type: Constants.HIDEMESSAGES_LIST,
            listId: listId
        });
    },
    unHideListMessages: function(listId){
        Dispatcher.dispatch({
            type: Constants.UNHIDEMESSAGES_LIST,
            listId: listId
        });
    }
}
