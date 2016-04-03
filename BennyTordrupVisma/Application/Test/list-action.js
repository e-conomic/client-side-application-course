var Chai = require("chai");
var ListActions = require("../App/Actions/list-actions");
var ListStore = require("../App/Stores/list-store");
var ValidationStore = require("../App/Stores/validation-store");

describe('ListActions', () => {
    
    describe('when createList is called with new list name', () => {
        
        it('should add the list', () => {
            var lists = ListStore.getAll();
            ListActions.createList("List 3", lists);
            var list = ListStore.getByName("List 3");
            Chai.expect(list.name).to.equal("List 3");
        })
    })

    describe('when createList is called with existing list name', () => {
        
        it('should generate validation error', () => {
            var lists = ListStore.getAll();
            ListActions.createList("List 2", lists);
            var validationResult = ValidationStore.getValidationResult();
            Chai.expect(validationResult.isError).to.equal(true);
            Chai.expect(validationResult.message).to.equal("List already exists");
            //Chai.expect(ListActions.createList("List 2", lists)).to.Throw(/List already exists/);
        })
    })
    
    describe('when toggleIsSelected is called on List 1', () => {
        
        it('should deselect List 1', () => {
            ListActions.toggleIsSelected(1);
            var list1 = ListStore.get(1);
            Chai.expect(list1.isSelected).to.equal(false);
        })
    })
})