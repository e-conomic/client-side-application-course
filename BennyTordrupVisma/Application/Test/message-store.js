var Chai = require("chai");
var MessageActions = require("../App/Actions/message-actions");
//var MessageStore = require("../App/Stores/message-store");
var ValidationStore = require("../App/Stores/validation-store");

describe('MessageStore', () => {
    var wayTooLongMessage = "Message is too long - 12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
    var testLang = "en";

    var MessageStore;    
    var messages;
    
    beforeEach(() => {
        MessageStore = require("../App/Stores/message-store");
        messages = MessageStore.getAll();    
    })
    
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
            var existingMessage = MessageStore.get(1);
            MessageActions.createMessage(existingMessage.text, 1, messages, testLang);
            var validationResult = ValidationStore.getValidationResult();
            Chai.expect(validationResult.isError).to.equal(true);
            Chai.expect(validationResult.message).to.equal("The message is already entered and cannot be added.")
        })
    })
    
    describe('when deleteMessage is called', () => {
        it('should remove the message', () => {
            MessageActions.deleteMessage(3);
            var nonExistingMessage = MessageStore.get(3);
            Chai.expect(nonExistingMessage).to.equal(null);
        })
    })
    
    describe('when moveMessage is called', () => {
        it('should move message to new list', () => {
            MessageActions.moveMessage(4, 1);
            var message4 = MessageStore.get(4);
            Chai.expect(message4.list).to.equal(1);
        })
    })
    
    describe('when archiveMessage is called on active message', () => {
        it('should set isArchived to true', () => {
            MessageActions.toggleIsArchived(5);
            var message5 = MessageStore.get(5);
            Chai.expect(message5.isArchived).to.equal(true);
        })
    })
    
    describe('when archiveMessage is called on archived message', () => {
        it('should set isArchived to false', () => {
            MessageActions.toggleIsArchived(7);
            var message7 = MessageStore.get(7);
            Chai.expect(message7.isArchived).to.equal(false);
        })
    })
})