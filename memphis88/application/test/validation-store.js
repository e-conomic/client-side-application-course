describe('Validation Store', function() {

	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var ValidationStore;
	var registerSpy;
	var dispatchStub;
	var registeredCallback;

	var createMessage = {
		type: Constants.CREATE_MESSAGE
	}
	var messageExists = {
		type: Constants.ALREADY_EXISTS_ERROR
	}
	var messageExceedsRange = {
		type: Constants.EXCEED_RANGE_ERROR
	}
	beforeEach(function() {
		Dispatcher = require('../app/dispatcher/dispatcher');
		ValidationStore = require('../app/stores/validation-store');
		registerSpy = sinon.stub(Dispatcher, 'register');
		dispatchStub = sinon.spy(Dispatcher, 'dispatch');
		Dispatcher.register(ValidationStore);
		registeredCallback = registerSpy.lastCall.args[0];
	});

	afterEach(function() {
		registerSpy.restore();
		dispatchStub.restore();
	});

	it('should register a callback with the dispatcher', sinon.test(function() {
		registerSpy.should.have.been.calledOnce;
	}));

	it('should return an object with a message property as an empty string', sinon.test(function() {
		var state = ValidationStore.getStatus();
		expect(state).to.be.a('object');
		expect(state.message).to.equal('');
	}));

	it('should return an object with isError true and an appropriate message', sinon.test(function() {
		Dispatcher.dispatch(createMessage);
		var state = ValidationStore.getStatus();
		expect(state.isError).to.be.equal(false);
		expect(state.message).to.be.equal('Message created.');
		Dispatcher.dispatch(messageExists);
		var state = ValidationStore.getStatus();
		expect(state.isError).to.be.equal(true);
		expect(state.message).to.be.equal('Message already exists in a list.');
		Dispatcher.dispatch(messageExceedsRange);
		var state = ValidationStore.getStatus();
		expect(state.isError).to.be.equal(true);
		expect(state.message).to.be.equal('Message was more than 200 characters.');
	}));
});