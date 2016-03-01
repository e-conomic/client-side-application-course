import Dispatcher from '../dispatcher.js';
import { CREATE_LIST, CREATE_MESSAGE, DELETE_MESSAGE, SWAP_MESSAGE, ARCHIVE_MESSAGE } from '../constants/listconstants.js';
import BaseStore from './base.js';

var _listDictionary = {};

var store = Object.assign({}, BaseStore, {
    getAll() {
        return Object.assign({}, _listDictionary);
    },
    get(id) {
        return Object.assign({}, _listDictionary[id]);
    }
});

store.dispatchToken = Dispatcher.register((payload) => {
    let { currentList, destinationList, messageId, isArchived, listName, message } = payload.data;
    let messageIndex = -1;
    let removedMessage = null;
    switch (payload.type) {
        case CREATE_LIST:
            _listDictionary[listName] = [];
            break;
        case SWAP_MESSAGE:
            messageIndex = _listDictionary[currentList].findIndex(function (message) {
                return message.id === messageId;
            });
            if (messageIndex > -1) {
                let copiedCurrentList = _listDictionary[currentList].slice();
                removedMessage = copiedCurrentList.splice(messageIndex, 1);
                if (removedMessage[0].archived) {
                    //Set a error
                } else {
                    _listDictionary[currentList] = copiedCurrentList;
                    _listDictionary[destinationList] = _listDictionary[destinationList].concat(removedMessage);
                }
            }
            break;
        case DELETE_MESSAGE:
            let copiedMessages = _listDictionary[listName].slice();
            messageIndex = copiedMessages.findIndex(function (message) {
                return message.id = messageId;
            });
            if (messageIndex > -1) {
                copiedMessages.splice(messageIndex, 1);
                _listDictionary[listName] = copiedMessages;
            } else {
                //set a error
            }
            break;
        case ARCHIVE_MESSAGE:
            var mutatedArray = _listDictionary[listName].map(function (message) {
                if (message.id === messageId) {
                    var clonedMessage = Object.assign({}, message);
                    clonedMessage.isArchived = !isArchived;
                    return clonedMessage;
                }
                return message;
            });
            _listDictionary[listName] = mutatedArray;
            break;
        case CREATE_MESSAGE:
            let copiedList = _listDictionary[listName].slice();
            copiedList.push(message);
            _listDictionary[listName] = copiedList;
            break;
        default:
            return;
    }
    store.emitChange();
});

export default store;

