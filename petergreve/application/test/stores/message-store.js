var rewire = require("rewire");

var MessageStore = rewire('../../app/stores/message-store')
import MessageActions from '../../app/actions/message-actions'
import dispatcher from '../../app/dispatcher/dispatcher'

describe('Message Store methods', () => {
	
	let spy;
	before(() => {
        spy = sinon.spy(dispatcher, "dispatch");
        MessageStore.__set__('_messages',[])
	});

	after(() => {
        dispatcher.dispatch.restore();
	});


	describe('Create Message', () => {
		let  message = {listId: 0, text: 'test message'}



		it('should create a message', () => {
			MessageActions.createMessage(message);

			expect(spy).to.have.been.calledOnce;

			const messages = MessageStore.getAll()

			expect(messages.length).to.equal(1);

		})

	})

})