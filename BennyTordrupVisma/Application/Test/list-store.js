var rewire = require("rewire");
var ListActions = require("../App/Actions/list-actions");
var ListStore = rewire("../App/Stores/list-store");
var ValidationStore = require("../App/Stores/validation-store");

describe('ListStore', () => {

    beforeEach(() => {
        ListStore.__set__("_lists", global.testLists);
   })
    
    describe('when getAll is called', () => {
        it("should return list with 2 lists", () => {
            var returnedList = ListStore.getAll();
            
            global.expect(returnedList.length).to.equal(2);
        })    
    })
    
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
            ListActions.createList("Test List 2", lists);
            var validationResult = ValidationStore.getValidationResult();
            global.expect(validationResult.isError).to.equal(true);
            global.expect(validationResult.message).to.equal("List already exists");
        })
    })
    
    describe('when toggleIsSelected is called on List 1', () => {
        it('should deselect List 1', () => {
            ListActions.toggleIsSelected(1);
            var list1 = ListStore.get(1);
            global.expect(list1.isSelected).to.equal(false);
        })
    })
})