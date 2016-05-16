import Dispatcher from '../dispatcher.js';
import { CREATE_LIST, DELETE_MESSAGE, CREATE_MESSAGE, SWAP_MESSAGE, ARCHIVE_MESSAGE } from '../constants/listconstants.js';
import { changeMessage } from './erroractions';
import ListStore from '../stores/liststore';

export function createList(listName) {
    Dispatcher.dispatch({
        type: CREATE_LIST,
        data: {
            listName
        }
    });
}

export function createMessage(text, listName) {
    let validation = ListStore.isMessageValid(text);
    changeMessage(validation.text, validation.isError);
    if(!validation.isError) {
        Dispatcher.dispatch({
            type: CREATE_MESSAGE,
            data: {
                text,
                listName
            }
        });
    }
}

export function swapMessage(messageId, destinationList, currentList) {
    Dispatcher.dispatch({
        type: SWAP_MESSAGE,
        data: {
            messageId,
            destinationList,
            currentList
        }
    });
}


export function archiveMessage(messageId, listName, isArchived) {
    Dispatcher.dispatch({
        type: ARCHIVE_MESSAGE,
        data: {
            messageId,
            listName,
            isArchived
        }
    });
}

export function onSubmitMessage(message, listName) {
    Dispatcher.dispatch({
        type: CREATE_MESSAGE,
        data: {
            message,
            listName
        }
    });
}

export function deleteMessage(messageId, listName) {
    Dispatcher.dispatch({
        type: DELETE_MESSAGE,
        data: {
            messageId,
            listName
        }
    });
}

