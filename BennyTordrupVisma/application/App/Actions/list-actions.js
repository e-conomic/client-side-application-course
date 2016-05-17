var Constants = require('../constants');

module.exports = {
    createList: (listName, allLists) => {
        return {
            type: Constants.CREATE_LIST,
            payload: {
                listName: listName,
                lists: allLists
            }
        }
    },
    
    toggleIsSelected: (listId) => {
        return {
            type: Constants.TOGGLE_IS_SELECTED,
            payload: {
                listId: listId
            }
        }
    },
}