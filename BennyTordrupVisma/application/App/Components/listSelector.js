var React = require("react");
var ListActions = require("../Actions/list-actions");
var AppDispatcher = require("../Dispatcher/appDispatcher");

var ListSelector = React.createClass({
	render: function() {
		var listSelections = this.props.lists.map((list) => {
            return  <div key={list.id}>
                        <input id={list.id} type="checkbox" checked={list.isSelected} onChange={this.handleChange}/>
                        <label>{list.name}</label>
                    </div>
		});
        
		return 	<div className="listSelector">
                    {listSelections}
				</div>
	},

    handleChange: function(event) {
        AppDispatcher.dispatch(ListActions.toggleIsSelected(event.target.id));
    }
	
});

module.exports = ListSelector;