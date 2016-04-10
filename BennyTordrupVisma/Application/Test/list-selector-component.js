var ReactTestUtils = require("react-addons-test-utils");
var React = require("react");
var ListSelector = require("../App/Components/listSelector");
var ListStore = require("../App/Stores/list-store");

describe("ListSelector Component", () => {
    var sandbox;
    var getAllStub;
    var shallowRenderer = ReactTestUtils.createRenderer();
    
    beforeEach(() => {
        sandbox = global.sinon.sandbox.create();
        getAllStub = sandbox.stub(ListStore, "getAll", () =>
        {
            return global.testLists.slice();
        });
    })  
    
    afterEach(() => {
        sandbox.restore();
    })
    
    it("should display the test lists", () => {
        var lists = ListStore.getAll();
        
        shallowRenderer.render(React.createElement(ListSelector, {lists: lists}));
        
        var component = shallowRenderer.getRenderOutput();
        
        global.expect(component.props.className).to.equal("listSelector");
        global.expect(component.type).to.equal("div");
        global.expect(component.props.children[0].props.children[0].type).to.equal("input");
        //global.expect(component.props.children[0].props.children[0].attributes["type"]).to.equal("checkbox");
        global.expect(component.props.children[0].props.children[1].type).to.equal("label");
        //global.expect(component.props.children[0].props.children[1].textContent).to.equal("List 1");
    })
})