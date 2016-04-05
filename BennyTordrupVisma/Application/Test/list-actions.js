var Constants = require('../App/constants');
var ListActions = require("../App/Actions/list-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('ListActions', () => {
    var sandbox;
    
    beforeEach(() => {
        sandbox = global.sinon.sandbox.create();
    })
    
    afterEach(() => {
        sandbox.restore();
    })
    
    it('should create a CREATE_LIST action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            listName: "Test",
            lists: []
        };
        
        const expectedAction = {
            type: Constants.CREATE_LIST,
            payload: payload
        };

        ListActions.createList(payload.listName, payload.lists);        
        global.assert(stub.calledWith(expectedAction));
    })

    it('should create a TOGGLE_IS_SELECTED action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            listId: 1
        };
        
        const expectedAction = {
            type: Constants.TOGGLE_IS_SELECTED,
            payload: payload
        };

        ListActions.toggleIsSelected(payload.listId);
        global.assert(stub.calledWith(expectedAction));
    })
})
