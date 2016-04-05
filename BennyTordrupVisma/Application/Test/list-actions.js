var Constants = require('../App/constants');
var ListActions = require("../App/Actions/list-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('ListActions', () => {
    var spy;
    
    beforeEach(() => {
        spy = global.sinon.spy(AppDispatcher, "dispatch");
    })
    
    afterEach(() => {
        AppDispatcher.dispatch.restore();
    })
    
    it('should create a CREATE_LIST action', () => {
        const payload = {
            listName: "Test",
            lists: []
        };
        
        const expectedAction = {
            type: Constants.CREATE_LIST,
            payload: payload
        };

        ListActions.createList(payload.listName, payload.lists);        
        global.assert(spy.calledWith(expectedAction));
    })

    it('should create a TOGGLE_IS_SELECTED action', () => {
        const payload = {
            listId: 1
        };
        
        const expectedAction = {
            type: Constants.TOGGLE_IS_SELECTED,
            payload: payload
        };

        ListActions.toggleIsSelected(payload.listId);
        global.assert(spy.calledWith(expectedAction));
    })
})
