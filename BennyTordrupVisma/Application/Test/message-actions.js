var Constants = require('../App/constants');
var MessageActions = require("../App/Actions/message-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('MessageActions', () => {
    var sandbox;
    
    beforeEach(() => {
        sandbox = global.sinon.sandbox.create();
    })
    
    afterEach(() => {
        sandbox.restore();
    })

    it('should create a CREATE_MESSAGE action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            messageText: "Test message",
            listId: 1,
            messages: [],
            language: "en"
        };
        
        const expectedAction = {
            type: Constants.CREATE_MESSAGE,
            payload: payload
        };

        MessageActions.createMessage(payload.messageText, payload.listId, payload.messages, payload.language);        
        global.assert(stub.calledWith(expectedAction));
    })

    it('should create a DELETE_MESSAGE action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            messageId: 1
        };
        
        const expectedAction = {
            type: Constants.DELETE_MESSAGE,
            payload: payload
        };

        MessageActions.deleteMessage(payload.messageId);
        global.assert(stub.calledWith(expectedAction));
    })
    
    it('should create a MOVE_MESSAGE action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            messageId: 1,
            newListId: 2
        };
        
        const expectedAction = {
            type: Constants.MOVE_MESSAGE,
            payload: payload
        };

        MessageActions.moveMessage(payload.messageId, payload.newListId);
        global.assert(stub.calledWith(expectedAction));
    })

    it('should create a TOGGLE_IS_ARCHIVED action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            messageId: 1
        };
        
        const expectedAction = {
            type: Constants.TOGGLE_IS_ARCHIVED,
            payload: payload
        };

        MessageActions.toggleIsArchived(payload.messageId);
        global.assert(stub.calledWith(expectedAction));
    })

    it('should create a TRANSLATE_ALL_MESSAGES action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            destLanguage: "da"
        };
        
        const expectedAction = {
            type: Constants.TRANSLATE_ALL_MESSAGES,
            payload: payload
        };

        MessageActions.translateAllMessages(payload.destLanguage);
        global.assert(stub.calledWith(expectedAction));
    })
})
