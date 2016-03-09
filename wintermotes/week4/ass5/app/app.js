var React = require('react')
var ReactDOM = require('react-dom')

var List = require('./components/list')

var Messages = require('./components/message').Messages
var Message = require('./components/message').Message 
var ArchivedMessages = require('./components/message').ArchivedMessages
var ArchivedMessage = require('./components/message').ArchivedMessage

var CreateListField = require('./components/fields').CreateListField
var CreateMessageField = require('./components/fields').CreateMessageField
var MoveMessageField = require('./components/fields').MoveMessageField
var DeleteMessageField = require('./components/fields').DeleteMessageField
var ArchiveMessageField = require('./components/fields').ArchiveMessageField

var ListActions = require('./actions/list-actions');
var ListStore = require('./stores/list-store')

function getAppState(){
	return {
		lists : ListStore.getAll(), 
	}
}

var MessageBox = React.createClass({
			getInitialState : function() {
				var lists = getAppState()
				return lists; 
			},
			componentDidMount : function() {
				console.log("MessageBox Component did mount: ")
				ListStore.addChangeListener(this._onChange);
		    },
		    componentWillUnmount: function() {
		        ListStore.removeChangeListener(this._onChange);
		    },
		    _onChange : function(){
		    	this.setState(getAppState())
		    },
			render: function() {
				return (
					<div id="container">
						<h1>Message box Week 2, Assignment 3: Create lists and messages</h1>
						<CreateListField onListSubmit={this.createList}/>
						<CreateMessageField onMessageSubmit={this.createMessage} lists={this.state.lists} />
						<OutputField lists={this.state.lists} onMessageArchive={this.archiveMessage} onMessageChange={this.moveMessage} onMessageDelete={this.deleteMessage}
						 onMessageUnarchive={this.unarchiveMessage}/>
					</div>
				);
			}
		});

		var OutputField = React.createClass({
			render: function() {
				var lists = this.props.lists.map(function(list) {
					return (
					<div key ={"output-" + list.listId}>
						<List data={list} onMessageUnarchive={this.props.onMessageUnarchive}/>
						<MoveMessageField lists={this.props.lists} listId={list.listId} onMessageChange={this.props.onMessageChange} />
						<DeleteMessageField onMessageDelete={this.props.onMessageDelete} listId={list.listId} messages={list.messages}/>
						<ArchiveMessageField onMessageArchive={this.props.onMessageUnarchive} listId={list.listId} messages={list.messages}/>
					</div>
					);
				}.bind(this));
				return (
					<div>
						<p>Hello there this is the Output box, listing the lists</p>
						{lists}
					</div>
				);
			}
		});

	ReactDOM.render(
	  <MessageBox />,
	  document.getElementById('app')
	);    

// Ressources: 
// - http://stackoverflow.com/questions/26325675/how-to-handle-data-changes-in-flux-react 