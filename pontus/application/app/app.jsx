let React = require('react');
let NamedList = require('./named-list');
let ReactDOM = require('react-dom');
let NotificationBar = require('./notification-bar.jsx');
let MessageView = require('./message-view');

let ListActions = require('./actions/list-actions');
let ListStore = require("./stores/list-store");

let MessageStore = require('./stores/message-store');
let MessageActions = require('./actions/message-actions');

let getListState = () => {
  return {
		lists: ListStore.getAll(),
		messages: MessageStore.getAll(),
		isVisibleNotificationbar: true
  };
}

let Wrapper = React.createClass({ 
	getInitialState() { 
		return { 
			lists: ListStore.getAll(),
			messages: MessageStore.getAll(),
			isVisibleNotificationbar: false,
			text: ''

		};
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

	componentWillMount() { 
		this.setState({ 
			text: window.location.hash
		});


	},
	viewToggle() {
		this.setState({
			viewLists: !this.state.viewLists
		});
	},

	onDismissed() { 
		this.setState({ 
			isVisibleNotificationbar: false
		});
	},

	handleClick() { 
		let lang = this.refs.lang.value || 'da';

		MessageActions.translateMessagesRequested();
		MessageActions.translateMessages(this.state.messages, lang);
	},

	cancelTranslation() { 
		MessageActions.cancelMessageTranslation();
	},

	render() {
		let listProperties = ListStore.getListProperties();

		let messageView = <MessageView lists={this.state.lists}/>;

		let listView = this.state.lists.map( list => { 
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

		let notificationBar = <NotificationBar isVisible={this.state.isVisibleNotificationbar} message={errorMessage} isError={isError} onDismissed={this.onDismissed} />;

		let view = (this.state.viewLists) ? messageView : listView;
		let buttonText = (this.state.viewLists) ? 'view messages' : 'view lists';

		let divStyle = { margin: '1.5em', padding: '1em' };

		return (
			<div>
					{ notificationBar }
				<div style={divStyle}></div>
				<button onClick={this.viewToggle}>{buttonText}</button>
				<input type="text" ref="lang" placeholder="sv,da,no,en, etc... "/><button onClick={this.handleClick}>Choose a Language and Translate (optional)</button> 
				<button onClick={this.cancelTranslation}>Cancel Translation</button>
				<h3>Create New List</h3>
				<input type="text" ref='inputField' onKeyDown={this.createList} placeholder="title" />
				<button onClick={this.createList}>Create new list</button>

				{ view } 

				<div dangerouslySetInnerHTML={{__html: this.state.text}}></div>
			</div>
		);
	},

	_onChange() { 
		this.setState(getListState());
	}
});

ReactDOM.render( <Wrapper/>, document.getElementById('app'));

