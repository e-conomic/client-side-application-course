import Dispatcher from '../dispatcher.js';
import { CREATE_LIST, DELETE_MESSAGE, CREATE_MESSAGE, SWAP_MESSAGE, ARCHIVE_MESSAGE } from '../constants/listconstants.js';

export function createList(listName) {
    Dispatcher.dispatch({
        type: CREATE_LIST,
        data: {
            listName
        }
    });
}

export function createMessage(id, text, isArchived, listName) {
    let message = {
        id,
        text,
        isArchived
    };
    Dispatcher.dispatch({
        type: CREATE_MESSAGE,
        data: {
            message,
            listName
        }
    });
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

