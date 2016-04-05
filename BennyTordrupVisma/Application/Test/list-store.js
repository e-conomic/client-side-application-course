var ListActions = require("../App/Actions/list-actions");
var ListStore = require("../App/Stores/list-store");
var ValidationStore = require("../App/Stores/validation-store");

describe('ListStore', () => {
    
    describe('when createList is called with new list name', () => {
        it('should add the list', () => {
            var lists = ListStore.getAll();
            ListActions.createList("List 3", lists);
            var list = ListStore.getByName("List 3");
            global.expect(list.name).to.equal("List 3");
        })
    })

    describe('when createList is called with existing list name', () => {
        it('should generate validation error', () => {
            var lists = ListStore.getAll();
            ListActions.createList("List 2", lists);
            var validationResult = ValidationStore.getValidationResult();
            global.expect(validationResult.isError).to.equal(true);
            global.expect(validationResult.message).to.equal("List already exists");
            //global.expect(ListActions.createList("List 2", lists)).to.Throw(/List already exists/);
        })
    })
    
    describe('when toggleIsSelected is called on List 1', () => {
        it('should deselect List 2', () => {
            ListActions.toggleIsSelected(2);
            var list1 = ListStore.get(2);
            global.expect(list1.isSelected).to.equal(false);
        })
    })
})