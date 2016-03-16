var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants/constants');
var BaseStore = require('./base');

var _lists = [{id: 0, name: "first list", hideMessages: false},{id: 1, name: "second list", hideMessages: false}];

var ListStore = Object.assign({}, BaseStore, {
	getAll: function() {
		return JSON.parse(JSON.stringify(_lists));
	},
	get: function(id) {
		return Object.assign({}, _lists.find(function(l) { return l.id == id }));
	},


});


Dispatcher.register(function(payload){

    switch(payload.type) {
        case Constants.CREATE_LIST:
            _lists.push({
                id: _lists.length,
                name: payload.listName
            })
            break
        case Constants.HIDEMESSAGES:

            var filteredList= _lists.find((l) => {
                return l.id == payload.listId;
            });
            filteredList.hideMessages = true;
            break
        case Constants.UNHIDEMESSAGES:

            var filteredList= _lists.find((l) => {
                return l.id == payload.listId;
            });
            filteredList.hideMessages = false;
            break
    }

     ListStore.emitChange();

})


module.exports = ListStore;


