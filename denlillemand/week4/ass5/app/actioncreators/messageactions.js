import {  CREATE_MESSAGE, DELETE_MESSAGE, ARCHIVE_MESSAGE } from '../constants/messageconstants.js';
import { Dispatcher } from 'flux';

export function createMessage(message) {
    Dispatcher.dispatch({
        type: CREATE_MESSAGE,
        data: {
            message
        }
    });
}
