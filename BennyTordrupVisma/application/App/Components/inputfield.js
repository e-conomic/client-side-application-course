var ListActions = require("../Actions/list-actions");
var MessageActions = require("../Actions/message-actions");
var AppDispatcher = require("../Dispatcher/appDispatcher");
var React = require("react");

var InputField = React.createClass({
    getInitialState : function() {
        return {
            message: '',
            selectedList: 0,
            newListVisible: true,
            newListName: ''
        }
    },
    
	render: function() {
        var selectableLists = this.props.lists.map(list => {
            return <option key={list.id} value={list.id}>{list.name}</option>
        });
        
		return <div className="inputfield">
				<label>Text to add: </label>
				<input type="text" onChange={this.onMessageChange} value={this.state.message}/>
                <div>
                    <label>List: </label>
                    <select onChange={this.onListSelection} value={this.state.selectedList}>
                        <option key={0} value={0}>New list</option>
                        {selectableLists}
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
        var listId = Number(event.target.value);
        this.setState({
            newListVisible: listId == 0,
            selectedList: listId
        })
    },
    
    handleCreateList: function() {
        var listName = this.state.newListName;
        
        AppDispatcher.dispatch(ListActions.createList(listName, this.props.lists));
        
        var newList = ListStore.getByName(listName);

        this.setState({
            newListVisible: newList == null,
            selectedList: newList != null ? newList.id : 0,
            newListName: ''
        })        
    },
	
	handleCommit: function() {
        MessageActions.createMessage(this.state.message, this.state.selectedList, this.props.messages, this.props.selectedLanguage);

        this.setState({
            newListVisible: true,
            selectedList: 0,
            message: ''
        })        
	},
});

module.exports = InputField;