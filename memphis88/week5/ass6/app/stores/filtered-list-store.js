var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../dispatcher/constants');
var BaseStore = require('./base');
var MessageStore = require('.message-store');
var ArchiveStore = require('./archive-message-store');


var _filteredMessages = [];

function deepCopy(messages) {
	return JSON.parse(JSON.stringify(messages));
}

function gatherMessagesFromList(ListKey) {

}

var store = Object.assign({}, BaseStore, {
	getAll: function() {
		return deepCopy(_filteredMessages);
	},
	getMessagesFromLists: function(listIds) {

	},
	get: function(listId) {
		_filteredMessages = gatherMessagesFromList(listId);
		return deepCopy(_filteredMessages);
	}
});