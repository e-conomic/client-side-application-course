describe('Message Store', function() {

	var Dispatcher;
	var MessageStore;
	var registerStub;
	var dispatchSpy;

	var createMessage = {
		type: Constants.CREATE_MESSAGE,
		listKey: 0,
		message: 'A test message'
	};

	var createAnotherMessage = {
		type: Constants.CREATE_MESSAGE,
		listKey: 0,
		message: 'This message should appear second'
	};

	beforeEach(function() {
		Dispatcher = require('../../app/dispatcher/dispatcher');
		MessageStore = rewire('../app/stores/message-store');
		registerStub = sinon.stub(Dispatcher, 'register');
		dispatchSpy = sinon.spy(Dispatcher, 'dispatch');
		Dispatcher.register(MessageStore);
	});

	afterEach(function() {
		registerStub.restore();
		dispatchSpy.restore();
	});

	it('should register a callback with the dispatcher', function() {
		registerStub.should.have.been.calledOnce;
	});

	it('should return an empty object if an id does not exist or is not specified', function() {
		var message = MessageStore.get();
		expect(message).to.be.a('object');
		expect(message).to.be.empty;
		message = MessageStore.get('an invalid id');
		expect(message).to.be.a('object');
		expect(message).to.be.empty;
	});

	it('should create and push a message from the dispatched action', function() {
		Dispatcher.dispatch(createMessage);
		var message = MessageStore.getAll();
		expect(message[0]).to.be.a('object');
		expect(message[0].message).to.be.equal('A test message');
	});

	it('should return all messages from a specified list', function() {
		Dispatcher.dispatch(createMessage);
		var message = MessageStore.getAllForList(0);
		expect(message).to.be.a('array');
		expect(message.length).to.be.equal(1);
	});

	it('should return a list of alphabetically-ordered messages', function() {
		Dispatcher.dispatch(createAnotherMessage);
		Dispatcher.dispatch(createMessage);
		var allMessages = MessageStore.getAllSorted();
		expect(allMessages.length).to.be.equal(2);
		expect(allMessages[0]).to.be.a('object');
		expect(allMessages[0].message).to.be.equal('A test message');
		expect(allMessages[1]).to.be.a('object');
		expect(allMessages[1].message).to.be.equal('This message should appear second');
	});
});