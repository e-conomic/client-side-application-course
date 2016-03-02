var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _lists = [];

var ListStore = Object.assign({}, BaseStore, {
    getAll: function() {
        var newList = _list.slice();
        return newList;
    },
    
    get: function(listId) {
        var list = _lists.find(l => l.id == listId);
        return Object.assign({}, list);
    },
    
});

function generateId() {
    var ids = _list.map(l => l.id);
    return Math.max(...ids) + 1;
}

function createList(listName) {
    _lists.push({
        id: generateId(),
        name: listName
    });
}

AppDispatcher.register(payload => {
    switch (payload.type){
        case Constants.CREATE_LIST:
            createList(payload.listName);
            break;
            
        default:
            return;
    }
    
    ListStore.emitChange();
});

module.exports = ListStore;