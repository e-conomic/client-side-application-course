var expect = require('chai').expect
var ReactTestUtils = require('react-addons-test-utils');
var React = require('react');
var Sinon = require('sinon');

var MessageActions = require('../app/actions/message-actions');
var MessageStore = require('../app/stores/message-store');
var Dispatcher = require('../app/dispatcher')

describe('Message actions', function() {
	var DispatcherSpy = Sinon.spy(Dispatcher, 'dispatch');
	var MessageActionsSpy = Sinon.spy(MessageActions, 'createMessage')
	MessageActions.createMessage("new message", 4, ["message1", "message2"])

	describe('with valid input should ', function () {
		it('dispatch create, delete, move, archive and unarchive events', function(done) {
			setTimeout(function() {
				//TODO: Spy each event 
		    	Sinon.assert.calledOnce(DispatcherSpy);
		    	Sinon.assert.calledOnce(MessageActionsSpy);
		    	done();
			}, 0);
		});

		it('add and remove filters', function () {

		});

		it('validate new messages to be unique and no longer than 200 characters', function () {

		});
	});

	describe('with invalid input should', function () {
		it('should create a notification bar with a message error', function () {

		});
	});
	DispatcherSpy.restore();
});

