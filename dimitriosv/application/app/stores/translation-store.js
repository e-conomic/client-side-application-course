var Dispatcher =  require('../dispatcher/dispatcher.js');
var Constants = require('../constants');
var BaseStore = require('./base');


var _languages = [];
var _showLoader = false;

function deepCopy(itemToCopy) {
    var messagesCopy = JSON.parse(JSON.stringify(itemToCopy));
    return messagesCopy;
}


var store = Object.assign({}, BaseStore, {
    getLanguages: function() {
        return deepCopy(_languages);
    },
    getShowLoader: function() {
        return _showLoader;
    },
});

store.dispatchToken = Dispatcher.register(function(payload){
    switch(payload.type) {
        case Constants.LANGUAGES_REQUESTED:
            _showLoader = true;
            break
        default:
            return;
    }

    store.emitChange();
});

module.exports = store;


