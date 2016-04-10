var ReactTestUtils = require("react-addons-test-utils");
var React = require("react");
var List = require("../App/Components/list");
var ListStore = require("../App/Stores/list-store");
var MessageStore = require("../App/Stores/message-store");

describe("List Component", () => {
    var sandbox;
    var getAllListsStub;
    var getAllMessagesStub;
    var shallowRenderer = ReactTestUtils.createRenderer();
    
    beforeEach(() => {
        sandbox = global.sinon.sandbox.create();
        getAllListsStub = sandbox.stub(ListStore, "getAll", () => {
            return global.testLists.slice();
        });
        getAllMessagesStub = sandbox.stub(MessageStore, "getAll", () => {
            return global.testMessages.slice();
        })
    })  
    
    afterEach(() => {
        sandbox.restore();
    })
    
    it('should display a lists', () => {
        var lists = ListStore.getAll();
        var messages = MessageStore.getAll();

        var displayList = lists[0];
        shallowRenderer.render(<List key={displayList.id} list={displayList} messages={messages.filter(m => m.list == displayList.id)}/>);        

        var component = shallowRenderer.getRenderOutput();
        
        global.expect(component.props.className).to.equal("list");
        global.expect(component.type).to.equal("div");
        global.expect(component.props.children[0].type).to.equal("h4");
        global.expect(component.props.children[1].type).to.equal("div");
        //global.expect(component.props.children[1].props.children.length).to.equal(2);
        global.expect(component.props.children[2].type).to.equal("h5");
    })
})