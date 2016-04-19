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

        var action = ListActions.createList("Test", []);        

        AppDispatcher.dispatch(action);
        global.assert(stub.calledWith(action));
    })

    it('should create a TOGGLE_IS_SELECTED action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");

        var action = ListActions.toggleIsSelected(1);        

        AppDispatcher.dispatch(action);
        global.assert(stub.calledWith(action));
    })
})
