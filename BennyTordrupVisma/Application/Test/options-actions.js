var Constants = require('../App/constants');
var OptionActions = require("../App/Actions/options-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('OptionsActions', () => {
    var spy;

    beforeEach(() => {
        spy = global.sinon.spy(AppDispatcher, "dispatch");
    })

    afterEach(() => {
        AppDispatcher.dispatch.restore();
    })
    
    it('should create a UPDATE_OPTIONS action', () => {
        const payload = {
            showCombinedMessages: true
        };
        
        const expectedAction = {
            type: Constants.UPDATE_OPTIONS,
            payload: payload
        };

        OptionActions.updateOptions(payload.showCombinedMessages);
        global.assert(spy.calledWith(expectedAction));
    })

    it('should create a UPDATE_LANGUAGE action', () => {
        const payload = {
            selectedLanguage: "en"
        };
        
        const expectedAction = {
            type: Constants.UPDATE_LANGUAGE,
            payload: payload
        };

        OptionActions.updateSelectedLanguage(payload.selectedLanguage);
        global.assert(spy.calledWith(expectedAction));
    })
})