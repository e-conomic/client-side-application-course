var Constants = require('../App/constants');
var OptionActions = require("../App/Actions/options-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('OptionsActions', () => {
    var sandbox;
    
    beforeEach(() => {
        sandbox = global.sinon.sandbox.create();
    })
    
    afterEach(() => {
        sandbox.restore();
    })
    
    it('should create a UPDATE_OPTIONS action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            showCombinedMessages: true
        };
        
        const expectedAction = {
            type: Constants.UPDATE_OPTIONS,
            payload: payload
        };

        OptionActions.updateOptions(payload.showCombinedMessages);
        global.assert(stub.calledWith(expectedAction));
    })

    it('should create a UPDATE_LANGUAGE action', () => {
        var stub = sandbox.stub(AppDispatcher, "dispatch");
        
        const payload = {
            selectedLanguage: "en"
        };
        
        const expectedAction = {
            type: Constants.UPDATE_LANGUAGE,
            payload: payload
        };

        OptionActions.updateSelectedLanguage(payload.selectedLanguage);
        global.assert(stub.calledWith(expectedAction));
    })
})