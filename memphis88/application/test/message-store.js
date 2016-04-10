describe('Message Store', function() {

	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var MessageStore;
	var registerSpy;
	var dispatchStub;
	var registeredCallback;

	var createMessage = {}

	beforeEach(function() {
		Dispatcher = require('../app/dispatcher/dispatcher');
		MessageStore = require('../app/stores/message-store');
		registerSpy = sinon.stub(Dispatcher, 'register');
		dispatchStub = sinon.spy(Dispatcher, 'dispatch');
		Dispatcher.register(MessageStore);
		registeredCallback = registerSpy.lastCall.args[0];
	});

	afterEach(function() {
		registerSpy.restore();
		dispatchStub.restore();
	});

	it('should register a callback with the dispatcher', sinon.test(function() {
		registerSpy.should.have.been.calledOnce;
	}));

	it('should return an empty object if an id does not exist or is not specified', sinon.test(function() {
		var message = MessageStore.get();
		expect(message).to.be.a('object');
		expect(message).to.be.empty;
		message = MessageStore.get('an invalid id');
		expect(message).to.be.a('object');
		expect(message).to.be.empty;
	}));
});