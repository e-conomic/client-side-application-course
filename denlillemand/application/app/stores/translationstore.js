import Dispatcher from '../dispatcher.js';
import BaseStore from './base.js';
import ListStore from './liststore';

import { TRANSLATE_MESSAGES, GET_TARGETS } from '../constants/translationconstants';

var _translatedListDictionary = { };


var _translationOptions = {
    enabled: false,
    targets: []
};


var store = Object.assign({}, BaseStore, {
    getAll() {
        return Object.assign({}, _translatedListDictionary);
    },
    getOptions() {
        return Object.assign({}, _translationOptions);
    }
});

store.dispatchToken = Dispatcher.register((action) => {
    switch (action.type) {
        case TRANSLATE_MESSAGES:
            _translatedListDictionary = Object.assign({}, action.data.translatedLists);
            break;
        case GET_TARGETS:
            _translationOptions.targets = action.data.targets.slice();
            break;
        default:
            return;
    }
    store.emitChange();
});

export default store;
