import Dispatcher from '../dispatcher.js';
import { CHANGE_MESSAGE, DISMISS_MESSAGE } from '../stores/errorstore';


export function changeMessage(text, isError) {
    Dispatcher.dispatch({
        type: CHANGE_MESSAGE,
        data: {
            text,
            isError
        }
    });
}

export function dismissMessage() {
    Dispatcher.dispatch({
        type: DISMISS_MESSAGE
    });
}