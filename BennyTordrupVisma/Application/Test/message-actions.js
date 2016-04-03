var Chai = require("chai");
var MessageActions = require("../App/Actions/message-actions");
var MessageStore = require("../App/Stores/message-store");
var ValidationStore = require("../App/Stores/validation-store");

describe('MessageActions', () => {
    var wayTooLongMessage = "Message is too long - 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
    var testLang = "en";
    
    var messages = MessageStore.getAll();
    var existingMessage = MessageStore.get(1);
    
    describe('when createMessage is called with a valid message and list id', () => {
        
        it('should add the message to the given list id', () => {
            MessageActions.createMessage("Test message", 1, messages, testLang);
            var addedMessage = MessageStore.getNewest();
            Chai.expect(addedMessage.id).to.equal(11);
            Chai.expect(addedMessage.list).to.equal(1);
        })
    })
    
    describe('when createMessage is called with an empty message', () => {
        
        it('should result in validation error', () => {
            MessageActions.createMessage("", 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            Chai.expect(validationResult.isError).to.equal(true);
            Chai.expect(validationResult.message).to.equal("You must enter a text to add.")
        })
    })
    
    describe('when createMessage is called with a too long message', () => {
        
        it('should result in validation error', () => {
            MessageActions.createMessage(wayTooLongMessage, 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            Chai.expect(validationResult.isError).to.equal(true);
            Chai.expect(validationResult.message).to.equal("The input may not exceed 200 characters.")
        })
    })
    
    describe('when createMessage is called with an existing message', () => {
        
        it('should result in validation error', () => {
            MessageActions.createMessage(existingMessage.text, 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            Chai.expect(validationResult.isError).to.equal(true);
            Chai.expect(validationResult.message).to.equal("The message is already entered and cannot be added.")
        })
    })
})