var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

var _lists = [{
    id: 1,
    name: 'List 1',
},
{
    id: 2,
    name: 'List 2',
}];

var ListStore = Object.assign({}, BaseStore, {
    getAll: function() {
        var newList = _lists.slice();
        return newList;
    },
    
    get: function(listId) {
        var list = _lists.find(l => l.id == listId);
        return (list) ? Object.assign({}, list) : null;
    },
    
    getByName: function(listName) {
        var list = _lists.find(l => l.name == listName);
        return (list) ? Object.assign({}, list) : null;
    }
    
});

function generateId() {
    var ids = _lists.map(l => l.id);
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