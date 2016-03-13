let React = require('react');
let NamedList = require('./named-list');
let ReactDOM = require('react-dom');

let ListActions = require('./list-actions');
let ListStore = require("./list-store");

let MessageStore = require('./message-store');
let MessageActions = require('./message-actions');

let getListState = () => {
  return {
		lists: ListStore.getAll(),
		messages: MessageStore.getAll(),
  };
}

let Wrapper = React.createClass({ 
	getInitialState() { 
		return getListState();
	},

	createList(e) { 
		if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
			let listName = this.refs.inputField.value;
			ListActions.createList(listName);
			this.refs.inputField.value = "";
		}
	},

	componentDidMount() { 
		ListStore.addChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
	},

	render() {
		let listProperties = ListStore.getListProperties();

		let lists = this.state.lists.map( (list) => { 
			let messages = this.state.messages.filter( message => message.listID === list.listID );

			return <NamedList 
				key={list.listID}
				listID={list.listID} 
				listName={list.listName} 
				messages={messages} 
				listProperties={listProperties}
			/>; 
		});

		return (
			<div>
				<h3>Create New List</h3>
				<input type="text" ref='inputField' onKeyDown={this.createList} placeholder="title" />
				<button onClick={this.createList}>Create new list</button>
				{lists}
			</div>
		);
	},

	_onChange() { 
		this.setState(getListState());
	}
});

ReactDOM.render( <Wrapper/>, document.getElementById('app'));
