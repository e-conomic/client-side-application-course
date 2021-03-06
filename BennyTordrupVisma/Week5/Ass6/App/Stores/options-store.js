var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _options = {
    showCombinedMessages: true
};

var OptionsStore = Object.assign({}, BaseStore, {
    get: function() {
        return Object.assign({}, _options);
    },
    
});

function updateOptions(showCombinedMessages) {
    _options = {
        showCombinedMessages: showCombinedMessages
    };
}

OptionsStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type){
        case Constants.UPDATE_OPTIONS:
            updateOptions(action.payload.showCombinedMessages);
            break;
            
        default:
            return;
    }
    
    OptionsStore.emitChange();
});

module.exports = OptionsStore;