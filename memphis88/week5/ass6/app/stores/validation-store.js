var BaseStore = require('./base');
var Constants = require('../dispatcher/constants');
var Dispatcher = require('../dispatcher/dispatcher');

var _state = { message: ''};

var _states =
[
	{
		isError: true,
		message: "Message was more than 200 characters."
	},
	{
		isError: true,
		message: "Message already exists in a list."
	},
	{
		isError: false,
		message: "Message created."
	}
];

var store = Object.assign({}, BaseStore, {
	getStatus: function() {
		return _state;
	},
});

store.dispatchToken = Dispatcher.register(function(payload) {
	switch(payload.type) {
		case Constants.EXCEED_RANGE_ERROR:
			_state = _states[0];
			break;
		case Constants.ALREADY_EXISTS_ERROR:
			_state = _states[1];
			break;
		case Constants.CREATE_MESSAGE:
			_state = _states[2];
			break;
		default:
			_state = { message: ''};
			break;
	}

	store.emitChange();
});

module.exports = store;