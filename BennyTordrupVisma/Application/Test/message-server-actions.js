var Constants = require('../App/constants');
var MessageServerActions = require("../App/Actions/message-server-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('MessageServerActions', () => {
    var sandbox;
    
    beforeEach(() => {
        sandbox = global.sinon.sandbox.create();
    })
    
    afterEach(() => {
        sandbox.restore();
    })

    // REQUEST_LANGUAGES_RESPONSE: 'REQUEST_LANGUAGES_RESPONSE',

    it('should create a TRANSLATE_MESSAGE_RESPONSE action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            response: "This is the response"
        };
        
        const expectedAction = {
            type: Constants.TRANSLATE_MESSAGE_RESPONSE,
            payload: payload
        };

        MessageServerActions.receiveTranslationResponse(payload.response);        
        global.assert(stub.calledWith(expectedAction));
    })

    it('should create a REQUEST_LANGUAGES_RESPONSE action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            response: "This is the response"
        };
        
        const expectedAction = {
            type: Constants.REQUEST_LANGUAGES_RESPONSE,
            payload: payload
        };

        MessageServerActions.receiveLanguagesResponse(payload.response);        
        global.assert(stub.calledWith(expectedAction));
    })

})