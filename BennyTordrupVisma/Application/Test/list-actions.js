var Constants = require('../App/constants');
var Chai = require("chai");
var Sinon = require("sinon");
var ListActions = require("../App/Actions/list-actions");
var OptionActions = require("../App/Actions/options-actions");
var AppDispatcher = require("../App/Dispatcher/appDispatcher");

describe('Actions', () => {
    // var spy;
    
    // beforeEach(() => {
    //     var spy = Sinon.spy(AppDispatcher, "dispatch");
    // })
    
    // afterEach(() => {
    //     AppDispatcher.dispatcher.restore();
    // })
    
    var spy = Sinon.spy(AppDispatcher, "dispatch");
    
    describe('ListActions', () => {
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
            Chai.assert(spy.calledWith(expectedAction));
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
            Chai.assert(spy.calledWith(expectedAction));
        })
    })

    describe('OptionsActions', () => {
        it('should create a UPDATE_OPTIONS action', () => {
            const payload = {
                showCombinedMessages: true
            };
            
            const expectedAction = {
                type: Constants.UPDATE_OPTIONS,
                payload: payload
            };

            OptionActions.updateOptions(payload.showCombinedMessages);
            Chai.assert(spy.calledWith(expectedAction));
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
            Chai.assert(spy.calledWith(expectedAction));
        })
    })
    
    //spy.dispatch.restore();
    //AppDispatcher.dispatch.restore();
})