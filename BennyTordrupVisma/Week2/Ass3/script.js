		var Message = React.createClass({
			getInitialState: function() {
				return {
					id: 0,
					text: '',
					isArchived: false
				};
			},
			
			render: function() {
				return (
					<div>
						{this.props.text}
					</div>
				);
			},
			
			handleDelete: function() {
				window.alert("Delete");
			},
			
			handleArchive: function() {
				window.alert("Archive");
			},
		})
		
		var MessagesComponent = React.createClass({
			render: function() {
				/*
				var messagesList = this.props.data.map(function(message) {
					return (
						<Message key={message.id}, text={message.text} />
					);
				});
				*/
				return	<div>
							<h5>Test message component</h5>
						</div>
			},
		})
		
		var List = React.createClass({
			getInitialState: function() {
				return {
					name: '',
					messages: []
				}
			},
			
			render: function() {
				return 	<div>
							<h4>{this.props.name}</h4>
							<MessagesComponent data={this.state.messages}/>
						</div>
			},
		})
		
		var ListsComponent = React.createClass({
			render: function() {
				var listList = this.props.data.map(function(list) {
					return (
						<List key={list.name} name={list.name}/>
					);
				});
				return (
					<div>
						{listList}
					</div>
				);
			}
		})
		
		var InputField = React.createClass({
			render: function() {
				return <div>
						<label>Text to add:</label>
						<input type="text" ref="input" />
						<label>Name of list:</label>
						<input type="text" ref="listInput" />
						<button onClick={this.handleCommit}>Commit</button>
					</div>;
			},
			
			isInputValid: function(input, list) {
				if (input.length > 200)
				{
					window.alert("The input may not exceed 200 characters.");
					return false;
				}
				
				if (list.length == 0)
				{
					window.alert("You have to enter a name on the list to add message to.");
					return false;
				}
				
				return true;
			},
			
			handleCommit: function() {
				var input = this.refs.input.value;
				var list = this.refs.listInput.value;
				if (this.isInputValid(input, list)) {
					this.props.handleCommit(input, list);
					this.refs.input.value = '';
					this.refs.listInput.value = '';
				}
			},
		});
		
		var App = React.createClass({
			getInitialState: function() {
				return {
					lists: []
				}
			},
			
			render: function() {
				return 	<div>
							<InputField handleCommit={this.commitMessage}/>
							<h3>Lists</h3>
							<ListsComponent data={this.state.lists} />
						</div>
			},

			commitMessage: function(message, list) {
				window.alert("Commit message " + message + " to list " + list);

				var msgToAdd = {
					id: 0,
					text: message,
					isArchived: false
				};
				var destinationList = this.state.lists.find(el => el.name == list);	
				if (destinationList == null) {
					window.alert("List not found. Attempting to add message to new list.");
					
					msgToAdd.id=1;
					
					destinationList = {name: list, messages: [msgToAdd]};
					this.setState({
						lists: this.state ? this.state.lists.concat([destinationList]) : [destinationList]
					});
				}
				else {
					window.alert("List found. Attempting to add message to list.");
					
					msgToAdd.id= destinationList.messages.length + 1;
					destinationList.setState({
						messages: messages ? messages.concat([msgToAdd]) : [msgToAdd]
					})
				}
					
				window.alert("Commit message");
			},
		})

		
		ReactDOM.render(<App/>, document.getElementById("content"));
