import MessageActions from '../../app/actions/message-actions';
import dispatcher from '../../app/dispatcher/dispatcher';

describe('Message Actions', () => {
	let spy;
	before(() => {
        spy = sinon.spy(dispatcher, "dispatch");
	});

	after(() => {
        dispatcher.dispatch.restore();
	});

	describe('When createMessage method called', () => {	

		describe('If message is unique', () => {
			let message = {listId: 0, text: 'message text'};


			it('Should dispatch an action', () => {
				MessageActions.createMessage(message);
				expect(spy).to.have.been.calledOnce;
			})

			it('Should dispatch with correct payload', () => {
				expect(spy).to.have.been.calledWith({
	                type: 'CREATE_MESSAGE',
	                listId: message.listId,
	                text: message.text
      		 	});
			})
		})

		describe('If message is not unique', () => {
			let message = {listId: 0, text: 'message text'};


			it('Should dispatch an action', () => {
				MessageActions.createMessage(message);
				expect(spy).to.have.been.calledTwice;
			})

			it('Should dispatch with correct payload', () => {
				expect(spy).to.have.been.calledWith({
	                type: 'ERROR_CREATE_MESSAGE',
	                listId: message.listId,
	                errorMessage: 'Message is not unique'
            	});
			})
		})
	})

	describe('When translateMessages method called', () => {	

		it('dispatches an event', function(done) {
		  MessageActions.translateMessages('en');
		  setTimeout(function() {
			expect(spy).to.have.been.calledThrice;
		    done();
		  }, 0)
		});
	})
})