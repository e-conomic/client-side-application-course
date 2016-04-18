var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var ValidationStore = require("./validation-store");

//var _lists = [];
var _lists = [{
    id: 1,
    name: 'List 1',
    isSelected: true,
},
{
    id: 2,
    name: 'List 2',
    isSelected: true,
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
    if (_lists.length == 0) {
        return 1;
    } else {
        var ids = _lists.map(l => l.id);
        return Math.max(...ids) + 1;
    }
}

function createList(payload) {
    _lists.push({
        id: generateId(),
        name: payload.listName,
        isSelected: true
    });
}

function toggleIsSelected(payload) {
    var listToChange = _lists.find(l => l.id == payload.listId);
    listToChange.isSelected = !listToChange.isSelected;
}

var registeredCallback = action =>{
    switch (action.type) {
        case Constants.CREATE_LIST:
            AppDispatcher.waitFor([ValidationStore.distatchToken]);
            var validationResult = ValidationStore.getValidationResult();
            if (!validationResult.isError)
                createList(action.payload);
            break;
            
        case Constants.TOGGLE_IS_SELECTED:
            toggleIsSelected(action.payload);
            break;
            
        default:
            return;
    }
    
    ListStore.emitChange();
}

ListStore.dispatchToken = AppDispatcher.register(registeredCallback);

module.exports = ListStore;