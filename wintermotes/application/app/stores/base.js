var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

module.exports = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
});

module.exports.setMaxListeners(0);