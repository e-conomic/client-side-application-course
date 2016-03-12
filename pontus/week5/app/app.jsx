let React = require('react');
let NamedList = require('./named-list');
let MessageContainer = require('./message-container.jsx');
let ReactDOM = require('react-dom');
let NotificationBar = require('./notification-bar.jsx');

let ListActions = require('./list-actions');
let ListStore = require("./list-store");

let MessageStore = require('./message-store');
let MessageActions = require('./message-actions');

let getListState = () => {
  return {
		lists: ListStore.getAll(),
		messages: MessageStore.getAll(),
		viewLists: true
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

	componentWillUnmount() { 
		ListStore.removeChangeListener(this._onChange);
		MessageStore.removeChangeListener(this._onChange);
	},

	viewToggle() {
		this.setState({
			viewLists: !this.state.viewLists
		});
	},

	onDismissed() { 
		// console.log('onDismissed');
	},

	render() {
		let listProperties = ListStore.getListProperties();
		let ids = MessageStore.getIDs();
		console.log('ids');
		console.log(ids);


		let messages = <MessageContainer lists={this.state.lists}/>;

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

		let errorMessage = MessageStore.getErrorMessage() || "OK";
		let isError = (errorMessage != "OK") ? true : false;

		let notificationBar = <NotificationBar message={errorMessage} isError={isError} onDismissed={this.onDismissed} />;

		let view = (this.state.viewLists) ? lists : messages;
		let buttonText = (this.state.viewLists) ? 'view messages' : 'view lists';

		let divStyle = { margin: '1.5em', padding: '1em' };

		return (
			<div>
					{ notificationBar }
				<div style={divStyle}></div>
				<button onClick={this.viewToggle}>{buttonText}</button>
				<h3>Create New List</h3>
				<input type="text" ref='inputField' onKeyDown={this.createList} placeholder="title" />
				<button onClick={this.createList}>Create new list</button>
				{ view } 
				

			</div>
		);
	},

	_onChange() { 
		console.log('on change in app');
		this.setState(getListState());
	}
});

ReactDOM.render( <Wrapper/>, document.getElementById('app'));

