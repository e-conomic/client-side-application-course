var MessageStore = require("../Stores/message-store");
var ListStore = require("../Stores/list-store");
var MessageActions = require("../Actions/message-actions");
var ListActions = require("../Actions/list-actions");
var React = require("react");

module.exports = React.createClass({
    getInitialState : function() {
        return {
            message: '',
            selectedList: 0,
            newListVisible: true,
            newListName: ''
        }
    },
    
	render: function() {
        var lists = ListStore.getAll().map((list, index) => {
            return <option key={list.id} value={list.id}>{list.name}</option>
        });
        
		return <div>
				<label>Text to add: </label>
				<input type="text" onChange={this.onMessageChange} value={this.state.message}/>
                <div>
                    <label>List: </label>
                    <select onChange={this.onListSelection} value={this.state.selectedList}>
                        <option key={0} value={0}>New list</option>
                        {lists}
                    </select>
                    {this.state.newListVisible &&
                        <div>
                            <input type="text" onChange={this.onNewListNameChange} value={this.state.newListName}/>
                            <button onClick={this.handleCreateList}>Create list</button>
                        </div>}
                </div>
                {!this.state.newListVisible &&
                    <div>
                        <button onClick={this.handleCommit}>Commit</button>
                    </div>}
			</div>;
	},

    onMessageChange: function(event) {
        this.setState({
            message: event.target.value
        })
    },
    
    onNewListNameChange: function(event) {
        this.setState({
            newListName: event.target.value
        })
    },
     
    onListSelection: function(event) {
        var listId = event.target.value;
        this.setState({
            newListVisible: listId == 0,
            selectedList: listId
        })
    },
    
    handleCreateList: function() {
        var listName = this.state.newListName;
        
        ListActions.createList(listName);
        
        var newList = ListStore.getByName(listName);

        this.setState({
            newListVisible: newList == null,
            selectedList: newList != null ? newList.id : 0,
            newListName: ''
        })        
    },
	
	handleCommit: function() {
        MessageActions.createMessage(this.state.message, this.state.selectedList);

        this.setState({
            newListVisible: true,
            selectedList: 0,
            message: ''
        })        
	},
});
