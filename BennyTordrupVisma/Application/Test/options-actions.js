// var Constants = require('../App/constants');
// var Chai = require("chai");
// var Sinon = require("sinon");
// var OptionActions = require("../App/Actions/options-actions");
// var AppDispatcher = require("../App/Dispatcher/appDispatcher");

// describe('OptionsActions', () => {
//     var spy = Sinon.spy(AppDispatcher, "dispatch");
        
//     it('should create a UPDATE_OPTIONS action', () => {
//         const payload = {
//             showCombinedMessages: true
//         };
        
//         const expectedAction = {
//             type: Constants.UPDATE_OPTIONS,
//             payload: payload
//         };

//         OptionActions.updateOptions(payload.showCombinedMessages);
//         Chai.assert(Sinon.spy.calledWith(expectedAction));
//     })

//     it('should create a UPDATE_LANGUAGE action', () => {
//         const payload = {
//             selectedLanguage: "en"
//         };
        
//         const expectedAction = {
//             type: Constants.UPDATE_LANGUAGE,
//             payload: payload
//         };

//         OptionActions.updateSelectedLanguage(payload.selectedLanguage);
//         Chai.assert(Sinon.spy.calledWith(expectedAction));
//     })
// })