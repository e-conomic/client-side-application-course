var rewire = require("rewire");
var Constants = require('../../app/constants/constants')
var MessageStore = rewire('../../app/stores/message-store')
import Dispatcher from '../../app/dispatcher/dispatcher'

describe('Message Store methods', () => {
	
	before(() => {
        MessageStore.__set__('_messages',[])
	});

	describe('Create Message', () => {

		it('should create a message with correct properties', () => {
			Dispatcher.dispatch({
                type: Constants.CREATE_MESSAGE,
                listId: 0,
                text: 'test message'
            });

			const messages = MessageStore.getAll()
			let message = messages[0];

			expect(messages.length).to.equal(1);
			expect(message.id).to.equal(0);
			expect(message.listId).to.equal(0);
			expect(message.text).to.equal('test message');
			expect(message.isArchived).to.equal(false);
			expect(message.translation).to.equal('');

		})

	})

})