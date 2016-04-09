var MessageActions = require("../App/Actions/message-actions");
var MessageStore = require("../App/Stores/message-store");
var ValidationStore = require("../App/Stores/validation-store");

describe('MessageStore', () => {
    var _sandbox;

    var wayTooLongMessage = "Message is too long - 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
    var testLang = "en";

    beforeEach(() => {
        _sandbox = global.sinon.sandbox.create();
        var allMessages = MessageStore.getAll();
        MessageActions.createMessage("Hello world", 1, allMessages, testLang);
        var allMessages = MessageStore.getAll();
        MessageActions.createMessage("This is a test", 2, allMessages, testLang);
        var allMessages = MessageStore.getAll();
        MessageActions.createMessage("Vil du have en is?", 1, allMessages, testLang);
        MessageActions.toggleIsArchived(3);
        var allMessages = MessageStore.getAll();
        MessageActions.createMessage("Habla espanol?", 2, allMessages, testLang);
        MessageActions.toggleIsArchived(4);
    })
    
    afterEach(() => {
        _sandbox.restore();
    })
    
    describe('when getAll is called', () => {
        it('should return a list with 4 messages', () => {
            var returnedMessages = MessageStore.getAll();
            
            global.expect(returnedMessages.length).to.equal(4);
            global.expect(returnedMessages[returnedMessages.length-1].id).to.equal(4);
        })
    })
    
    describe('when createMessage is called with a valid message and list id', () => {
        it('should add the message to the given list id', () => {
            var messages = MessageStore.getAll();
            
            MessageActions.createMessage("Test message", 1, messages, testLang);
            var addedMessage = MessageStore.getNewest();
            global.expect(addedMessage.id).to.equal(5);
            global.expect(addedMessage.list).to.equal(1);
        })
    })
    
    describe('when createMessage is called with an empty message', () => {
        it('should result in validation error', () => {
            var messages = MessageStore.getAll();
            
            MessageActions.createMessage("", 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            global.expect(validationResult.isError).to.equal(true);
            global.expect(validationResult.message).to.equal("You must enter a text to add.")
        })
    })
    
    describe('when createMessage is called with a too long message', () => {
        it('should result in validation error', () => {
            var messages = MessageStore.getAll();
            
            MessageActions.createMessage(wayTooLongMessage, 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            global.expect(validationResult.isError).to.equal(true);
            global.expect(validationResult.message).to.equal("The input may not exceed 200 characters.")
        })
    })
    
    describe('when createMessage is called with an existing message', () => {
        it('should result in validation error', () => {
            var messages = MessageStore.getAll();
            
            MessageActions.createMessage("Hello world", 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            global.expect(validationResult.isError).to.equal(true);
            global.expect(validationResult.message).to.equal("The message is already entered and cannot be added.")
        })
    })
    
    describe('when archiveMessage is called on active message', () => {
        it('should set isArchived to true', () => {
            MessageActions.toggleIsArchived(2);
            var message2 = MessageStore.get(2);
            global.expect(message2.isArchived).to.equal(true);
        })
    })
    
    describe('when archiveMessage is called on archived message', () => {
        it('should set isArchived to false', () => {
            MessageActions.toggleIsArchived(4);
            var message4 = MessageStore.get(4);
            global.expect(message4.isArchived).to.equal(false);
        })
    })
    
    describe('when moveMessage is called', () => {
        it('should move message to new list', () => {
            MessageActions.moveMessage(2, 1);
            var message2 = MessageStore.get(2);
            global.expect(message2.list).to.equal(1);
        })
    })
    
    describe('when deleteMessage is called', () => {
        it('should remove the message', () => {
            MessageActions.deleteMessage(3);
            var nonExistingMessage = MessageStore.get(3);
            global.expect(nonExistingMessage).to.equal(null);
        })
    })
})