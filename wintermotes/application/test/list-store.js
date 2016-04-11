var Dispatcher = require('../app/dispatcher')
var Constants = require('../app/constants')
var ListStore = require('../app/stores/list-store');


describe('List store', function() {
	var Sandbox; 

	beforeEach(function () {
		Sandbox = Sinon.sandbox.create();
	});

	afterEach(function () {
	});

	it('can add a list to the store', function() {
		var originalListSize = ListStore.getAllLists().length 

		Dispatcher.dispatch({
			type : Constants.CREATE_LIST, 
			listName : "new_list, list-store.js"
		});

		var testList = ListStore.getAllLists()[originalListSize]
		
		expect(testList).to.have.property('listId').that.is.eql(originalListSize) // length is not array starting for 0, so originalListSize works for testing
		expect(testList).to.have.property('listName').that.is.eql("new_list, list-store.js")
		expect(testList).to.have.property('visible').that.is.true

	});

	it('has function for getting all lists, or a list with id', function() {
		var lists = ListStore.getAllLists(); 
		var list = ListStore.getListById(0)

		expect(lists[0]).to.eql(list);
	});


});