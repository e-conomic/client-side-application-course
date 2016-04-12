var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher');

var MessageStore = require('../stores/message-store');
var Url = require('../../translate-url');
var AjaxHandler = require('../utilities/ajax-handler');

function isValidMessage(msg) {
	if (msg.length <= 200) {
		return true;
	}
	return false;
}

function messageExists(msg) {
	var allMessages = MessageStore.getAll();
	for (var i = 0; i < allMessages.length; i++) {
		if (allMessages[i].message == msg) return true;
	};
	return false;
}

module.exports = {
	createMessage: function(listKey, msgText) {
		if (msgText == '') return;
		if (isValidMessage(msgText)) {
			if (!messageExists(msgText)) {
				Dispatcher.dispatch({
					type: Constants.CREATE_MESSAGE,
					listKey: listKey,
					message: msgText
				});
			} else {
				Dispatcher.dispatch({
					type: Constants.ALREADY_EXISTS_ERROR
				})
			}
		} else {
			Dispatcher.dispatch({
				type: Constants.EXCEED_RANGE_ERROR
			});
		}
	},

	deleteMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.DELETE_MESSAGE,
			id: msgId
		});
	},

	moveMessage: function(msgId, targetListId, color) {
		Dispatcher.dispatch({
			type: Constants.MOVE_MESSAGE,
			id: msgId,
			listKey: targetListId,
			color: color
		});
	},

	archiveMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.ARCHIVE_MESSAGE,
			id: msgId
		});
	},

	extractMessage: function(msgId) {
		Dispatcher.dispatch({
			type: Constants.EXTRACT_MESSAGE,
			id: msgId
		});
	},

	translateMessages: function(language, messages) {
		var query = "";
		for (var i = 0; i < messages.length; i++) {
			query += '&q=' + messages[i].message;
		};
		query += '&target=' + language;
		var requestUri = Url + query;

		return AjaxHandler.get(requestUri).then(function(response) {
			var data = JSON.parse(response).data;
			for (var i = 0; i < messages.length; i++) {
				messages[i].message = data.translations[i].translatedText;
			};
			Dispatcher.dispatch({
				type: Constants.TRANSLATE_MESSAGES,
				translatedMessages: messages,
			});
		}, function(error) {
			Dispatcher.dispatch({
				type: Constants.TRANSLATE_MESSAGES_FAILED,
				error: error,
			});
		});
	}
}