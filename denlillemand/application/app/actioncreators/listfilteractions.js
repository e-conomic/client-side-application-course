import Dispatcher from '../dispatcher.js';
import { CHANGE_FILTER } from '../stores/listfilterstore';

export function changeFilter(listName) {
    console.log('action was fired !' + listName);
    Dispatcher.dispatch({
        type: CHANGE_FILTER,
        data: {
            listName
        }
    });
}