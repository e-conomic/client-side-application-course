describe('Validation Store', function() {

	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var ValidationStore;
	var registerSpy;
	var dispatchStub;

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
		ValidationStore = rewire('../app/stores/validation-store');
		registerSpy = sinon.stub(Dispatcher, 'register');
		dispatchStub = sinon.spy(Dispatcher, 'dispatch');
		Dispatcher.register(ValidationStore);
	});

	afterEach(function() {
		registerSpy.restore();
		dispatchStub.restore();
	});

	it('should register a callback with the dispatcher', function() {
		registerSpy.should.have.been.calledOnce;
	});

	describe('getStatus', function() {

		it('should return an object with an empty string as a message property', function() {
			var state = ValidationStore.getStatus();
			expect(state).to.be.a('object');
			expect(state.message).to.equal('');
		});

		it('should return an object with isError false and an appropriate message on message creation', function() {
			Dispatcher.dispatch(createMessage);
			var state = ValidationStore.getStatus();
			expect(state.isError).to.be.equal(false);
			expect(state.message).to.be.equal('Message created.');
		});

		it('should return an object with isError true and an appropriate message when message exists', function() {
			Dispatcher.dispatch(messageExists);
			var state = ValidationStore.getStatus();
			expect(state.isError).to.be.equal(true);
			expect(state.message).to.be.equal('Message already exists in a list.');
		});

		it('should return an object with isError true and an appropriate message when message exceeds the length of 200 characters', function() {
			Dispatcher.dispatch(messageExceedsRange);
			var state = ValidationStore.getStatus();
			expect(state.isError).to.be.equal(true);
			expect(state.message).to.be.equal('Message was more than 200 characters.');
		});

	});
});