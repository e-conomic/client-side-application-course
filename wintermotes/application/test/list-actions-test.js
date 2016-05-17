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

describe('List actions', function() {
	var Sandbox; 
	var DispatcherSpy;
	var ListActionsSpy;

	beforeEach(function () {
		Sandbox = Sinon.sandbox.create();
		DispatcherSpy = Sandbox.spy(Dispatcher, 'dispatch');
		ListActionsSpy = Sandbox.spy(ListActions, 'createList');
	});

	afterEach(function () {
		Sandbox.restore();
	});

	describe('With valid input ', function () {
		it('dispatch a createList event with the given paramater', function () {
			ListActions.createList("new list, list-actions-test.js")

			// Question, how do i delete this after testing?
			expect(DispatcherSpy).to.have.been.calledWith({type: 'CREATE_LIST', listName: 'new list, list-actions-test.js'});
		});
	});
});
