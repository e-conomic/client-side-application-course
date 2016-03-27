import Dispatcher from '../dispatcher.js';
import BaseStore from './base.js';

export const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE';

var _message = {
    isDismissed: true,
    text: "",
    isError: false
};

var store = Object.assign({}, BaseStore, {
    getMessage() {
        return Object.assign({}, _message);
    }
});

store.dispatchToken = Dispatcher.register((action) => {
    switch (action.type) {
        case CHANGE_MESSAGE:
            _message.isDismissed = false;
            _message.text = action.data.text;
            _message.isError = action.data.isError;
            break;
        case DISMISS_MESSAGE:
            _message.isDismissed = true;
            break;
        default:
            return;
    }
    store.emitChange();
});

export default store;
