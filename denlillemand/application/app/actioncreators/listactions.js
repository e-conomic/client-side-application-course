import Dispatcher from '../dispatcher.js';
import { CREATE_LIST, DELETE_MESSAGE, CREATE_MESSAGE, SWAP_MESSAGE, ARCHIVE_MESSAGE } from '../constants/listconstants.js';
import { changeMessage } from './erroractions';
import ListStore from '../stores/liststore';

class ListActions {
    createList(listName) {
        if( typeof listName !== 'string'  ) {
            throw new TypeError("Invalid type:"+typeof listName);
        }
        var action = {
            type: CREATE_LIST,
            data: {
                listName
            }
        };
        Dispatcher.dispatch(action);
    }

    createMessage(text, listName) {
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

    swapMessage(messageId, destinationList, currentList) {
        Dispatcher.dispatch({
            type: SWAP_MESSAGE,
            data: {
                messageId,
                destinationList,
                currentList
            }
        });
    }


    archiveMessage(messageId, listName, isArchived) {
        Dispatcher.dispatch({
            type: ARCHIVE_MESSAGE,
            data: {
                messageId,
                listName,
                isArchived
            }
        });
    }

    onSubmitMessage(message, listName) {
        Dispatcher.dispatch({
            type: CREATE_MESSAGE,
            data: {
                message,
                listName
            }
        });
    }

    deleteMessage(messageId, listName) {
        Dispatcher.dispatch({
            type: DELETE_MESSAGE,
            data: {
                messageId,
                listName
            }
        });
    }
}
var listActions = new ListActions();
export default listActions;

