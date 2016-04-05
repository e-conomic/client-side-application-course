var expect = require('chai').expect
var ReactTestUtils = require('react-addons-test-utils');
var React = require('react');
var Sinon = require('sinon');

var ListActions = require('../app/actions/list-actions');
var ListStore = require('../app/stores/list-store');
var Dispatcher = require('../app/dispatcher')

describe('List actions should', function() {
	var DispatcherSpy = Sinon.spy(Dispatcher, 'dispatch');
	var ListActionsSpy = Sinon.spy(ListActions, 'createList')
	ListActions.createList("new list")

	it('dispatch an event', function(done) {
		setTimeout(function() {
	    	Sinon.assert.calledOnce(DispatcherSpy);
	    	Sinon.assert.calledOnce(ListActionsSpy);
	    	done();
		}, 0);
	});

	it('dispatch a createList event with the given paramater', function () {
		Sinon.assert.calledWith(DispatcherSpy, {type: 'CREATE_LIST', listName: 'new list'})
	});

	ListActionsSpy.restore();
	DispatcherSpy.restore();
});
