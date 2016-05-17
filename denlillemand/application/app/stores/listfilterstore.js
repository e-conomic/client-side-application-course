import Dispatcher from '../dispatcher.js';
import BaseStore from './base.js';

export const CHANGE_FILTER = 'CHANGE_FILTER';

var _filterDictionary = {
    namedLists: []
};

var store = Object.assign({}, BaseStore, {
    getAll() {
        return Object.assign({}, _filterDictionary);
    },
    getListFilter() {
        return _filterDictionary.namedLists.slice()
    }
});

store.dispatchToken = Dispatcher.register((action) => {
    var index, copiedNamedLists;
    switch (action.type) {
        case CHANGE_FILTER:
            index = _filterDictionary.namedLists.findIndex(function(namedList) {
                return action.data.listName === namedList;
            });
            copiedNamedLists = _filterDictionary.namedLists.slice();
            if(index > -1) {
                copiedNamedLists.splice(index, 1);
                _filterDictionary.namedLists = copiedNamedLists;
            } else {
                copiedNamedLists.push(action.data.listName);
                _filterDictionary.namedLists = copiedNamedLists;
            }
            break;
        default:
            return;
    }
    store.emitChange();
});

export default store;
