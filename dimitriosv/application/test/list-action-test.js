import { expect } from 'chai';
import { assert } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';
import React from 'react';
import sinon from 'sinon';
import ListActions from '../app/actions/list-actions'
import Dispatcher from '../app/dispatcher/dispatcher.js';
import Constants from '../app/constants.js';
var sandbox;


describe('List Actions', () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    // here we use sinon to create a spy on the Dispatcher.dispatch function
  });

  afterEach(() => {
    // clean up our sinon spy so we do not affect other tests
    sandbox.restore();
  });

  describe('Add an element to list', () => {
    it('should dispatch correct data', () => {
        var dispatcherSpy = sandbox.spy(Dispatcher, 'dispatch');
        var listName = "a list element";
        // fire the action
        ListActions.createList(listName);
        var dispatcherArgs = dispatcherSpy.args[0];
        console.log(dispatcherArgs)
        var firstArg = dispatcherArgs[0];
        assert.equal(firstArg.type, Constants.CREATE_LIST);
        assert.equal(firstArg.listName, listName);
        //assert.deepEqual(firstArg.data, {pet, cost: totalCost});
    });

    
  });
});