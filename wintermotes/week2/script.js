var MessageBox = React.createClass({

			//Question 1: Is there no way i can pass a function to a component without having it to traverse the whole tree? 
			//Question 2: what is the cost of passing down an array as "lists" down the tree? For instance, in setState i copy the state, and resets it for each render. 
			// 			  isn't that expensive? 
			//Question 3: How to create seperate files with different react classes, e.g a picture file with relevant react classes, a user file with relevant react classes etc. 
			// 			  Code seems to be able to pile up pretty quickly 
			//Question 4+5: Are listed in the code, since pure code is better than trying to explain the issue. 

	    	getInitialState : function() {
				var lists = [
					{
						listId : 0, 
						listName : 'List1', 
						messages : [
							{messageId : 0, messageText : "List1 msg1", archived : false, listId : 0}, 
							{messageId : 1, messageText : "List1 msg2", archived : false, listId : 0}
						], 
						archivedMessages : [
							{messageId : 0, messageText : "Archived: List1 msg1", archived : true, listId : 0},
							{messageId : 1, messageText : "Archived: List1 msg2", archived : true, listId : 0}
						],
					},
					{
						listId : 1, 
						listName : 'List2', 
						messages : [
							{messageId : 0, messageText : "List2 msg1", archived : false, listId : 1}, 
							{messageId : 1, messageText : "List2 msg2", archived : false, listId : 1},
							{messageId : 2, messageText : "List2 msg3", archived : false, listId : 1}
						], 
						archivedMessages : [
							{messageId : 0, messageText : "Archived: List1 msg1", archived : true, listId : 1},
							{messageId : 1, messageText : "Archived: List1 msg2", archived : true, listId : 1}
						],
					}
				];
				return {lists};
			},
			createList: function(listName){
				var listId = this.state.lists.length
				var listObject = {listId : listId, listName : listName, messages : [], archivedMessages : []}
				
				this.setState({
				  lists: this.state.lists.concat([listObject])
				})
			},
			createMessage: function(messageObject, listId) {
				console.log("Create Message call")
				var newList = Object.assign({}, this.state.lists[listId])
				if(messageObject.archived){
					var newMessages = newList.archivedMessages.slice();
					newMessages.push(messageObject)		
					newList.archivedMessages = newMessages;
				}	else {
					var newMessages = newList.messages.slice();
					newMessages.push(messageObject)		
					newList.messages = newMessages;
				}

				this.setState({lists : this.state.lists.map(function(list){
					return list.listId === parseInt(listId) ? newList : list;
				})});
			},
			moveMessage: function(listId, newListId, messageId){
				var lists = this.state.lists.slice()
				//var messageToMove = lists[listId].messages[messageId]
				var messageToMove = Object.assign({}, lists[listId].messages[messageId])

				lists[listId].messages.splice(messageId, 1)
				messageToMove.messageId = lists[newListId].messages.length
				messageToMove.listId = newListId
				this.createMessage(messageToMove, newListId)
			},
			deleteMessage : function(listId, messageId, archived){
				var newLists = this.state.lists.slice()
				var index = newLists[listId].messages.indexOf(messageId);

				if(archived)
					newLists[listId].archivedMessages.splice(index, 1)
				else 
					newLists[listId].messages.splice(index, 1)

				this.setState({lists : newLists})
			},
			archiveMessage : function (listId, messageId){
				//var messageToArchive = newLists[listId].messages[messageId]
				var messageToArchive = Object.assign({}, this.state.lists[listId].messages[messageId])
				var archiveId = this.state.lists[listId].archivedMessages.length

				messageToArchive.archived = true
				messageToArchive.messageId = archiveId

				this.deleteMessage(listId, messageId, false)
				this.createMessage(messageToArchive, listId)
			},
			unarchiveMessage : function (listId, messageId){
				var archivedMessages = this.state.lists[listId].archivedMessages.slice()
				//var index = this.findIndexById(archivedMessages, messageId)
				var index = archivedMessages.findIndex(function(archivedMessage){
					return archivedMessage.messageId === messageId
				}) // Don't know why this wont work.

				var messageToUnarchive = archivedMessages[index]
				var newMessageId = this.state.lists[listId].messages.length

				messageToUnarchive.archived = false
				messageToUnarchive.messageId = newMessageId

				this.deleteMessage(listId, messageId, true)
				this.createMessage(messageToUnarchive, listId)
			},
			findIndexById : function(list, id){
				for(var i = 0; i<list.length;i++){
					if(list[i].messageId == id){
						return i
					} 
				}
			},
			render: function() {
		    	return (
		    		<div id="container">
			      		<h1>Message box Week 2, Assignment 3: Create lists and messages</h1>
			      		<CreateListField onListSubmit={this.createList}/>
			      		<MessageField onMessageSubmit={this.createMessage} lists={this.state.lists} />
			      		<OutputField lists={this.state.lists} onMessageArchive={this.archiveMessage} onMessageChange={this.moveMessage} onMessageDelete={this.deleteMessage}
			      		 onMessageUnarchive={this.unarchiveMessage}/>
		      		</div>
		    	);
		  	}
		});

		var List = React.createClass({		
			render: function() {
				var listStyle = {
					border: '2px solid black',
					margin: '48px 0 0 0'
				}
				return(
					<div style={listStyle}>
						<p><b>ListID: {this.props.data.listId} | ListName: {this.props.data.listName} |</b></p>
						<Messages messages={this.props.data.messages}/>
						<ArchivedMessages archivedMessages={this.props.data.archivedMessages} onMessageUnarchive={this.props.onMessageUnarchive}/>
					</div>
				);
			}
		});

		var Messages = React.createClass({
			render: function() {
				var messageNodes = this.props.messages.map(function(message){
					return (
						<Message listId={message.listId} messageId={message.messageId} messageText={message.messageText} archived={message.archived} />	
					);
				});
				return(
					<div>
						{messageNodes}
					</div>
				);
				
			}
		});

		var ArchivedMessages = React.createClass({
			render : function () {
				// Question 4: how to achieve "border-top" property without causing a syntax? 
				var archiveStyle = {
					margin: '48px 0 0 0',
					color: 'gray'
				}
				var unarchiveFunction = this.props.onMessageUnarchive
				var messageNodes = this.props.archivedMessages.map(function(message){
					return (
						<span>

							<ArchivedMessage listId={message.listId} messageId={message.messageId} messageText={message.messageText} archived={message.archived} 
							 onMessageUnarchive={unarchiveFunction}/>		
						</span>
					);
				});
				return (
					<div style={archiveStyle}>
						<p><b>Archived Messages: </b></p>
						{messageNodes}
					</div>
				);
			}
		});

		var Message = React.createClass({
			render: function() {
				var boolToString = this.props.archived.toString() 
			    return (
			        <p>messageId: {this.props.messageId} | Text: {this.props.messageText} | Archived: {boolToString} | ListId: {this.props.listId}</p>
			    );
			}
		});

		var CreateListField = React.createClass({
			handleText: function(event){
				this.setState({text: event.target.value})
			},
			submitList: function(event){
				event.preventDefault();
				this.props.onListSubmit(this.state.text)
			},
			render:function() {
				return (
					<div>
						<p><b>CreateListField</b></p>
				        <input type="text" onChange={this.handleText} />
				      	<input type="submit" value="Create List" onClick={this.submitList} />
			      	</div>
				)
			}
		});

		var MessageField = React.createClass({
			handleText: function(event){
				this.setState({messageText: event.target.value})
			},
			handleListId: function(event){
				this.setState({listId: event.target.value})
			},
			submitMessage: function(event){
				event.preventDefault(); // So we don't refresh page when submitting a message
				if(this.state.messageText.length >= 200)
					return
				var listId = this.state.listId
				var messageId = this.props.lists[this.state.listId].messages.length
				var message = {messageId : messageId, messageText : this.state.messageText, archived : false, listId : listId}
				this.props.onMessageSubmit(message, listId)
			},
			render: function() {
			var listOptionValues = this.props.lists.map(function(list) {
		        return (
			      <option value={list.listId}>{list.listName}</option>
			    );
		    });
				return (
				<div>
					<p>Add a new message to one of the lists:</p>
			        <input type="text" onChange={this.handleText} />
			        <select name="list" onChange={this.handleListId}>
			        <option selected>Choose List: </option>
					    {listOptionValues}
					</select>
					<input type="submit" value="Submit Message" onClick={this.submitMessage} />
		      	</div>
				);
			}
		});

		var ArchivedMessage = React.createClass({
			handleMessageUnarchive : function(){
				this.props.onMessageUnarchive(this.props.listId, this.props.messageId)
			},
			render : function() {
				var boolToString = this.props.archived.toString() 
				return(
					<span>
						<input style={{float : 'right'}} type="submit" value="Unarchive Message" onClick={this.handleMessageUnarchive} />
						<p>messageId: {this.props.messageId} | Text: {this.props.messageText} | Archived: {boolToString} | ListId: {this.props.listId}</p>
					</span>
				);
			}
		});



		var EditListField = React.createClass({
			getInitialState: function(){
				return {
					newListId : -1, 
				}
			},
			handleListOptionValues: function(event){
				var list = this.props.lists[event.target.value]
				this.setState({newListId : event.target.value})
			},
			handleMessageOptionValues : function(event){
				this.setState({messageId : event.target.value})
			},
			submitMessageChange : function (event){
				event.preventDefault();
				this.props.onMessageChange(this.props.listId, this.state.newListId, this.state.messageId)
			},
			render: function() {
			var listOptionValues = this.props.lists.map(function(list) {
		        return (
			      <option value={list.listId}>{list.listName}</option>
			    );
		    });
		    var messageOptionValues = this.props.lists[this.props.listId].messages.map(function(message) {
		        return (
			      <option value={message.messageId}>{message.messageText}</option>
			    );
		    });
			    return (
			      <div>
			        <p><b>Move message from list {this.props.listId}: </b></p> 
					<select onChange={this.handleMessageOptionValues}>
			        	<option selected>Choose Message</option>
					    {messageOptionValues}
					</select>
					<select onChange={this.handleListOptionValues}>
			        	<option>Choose list</option>
					    {listOptionValues}
					</select>
					<input type="submit" value="Move Message" onClick={this.submitMessageChange} />
		        </div>
			    );
			}
		});

		var DeleteMessageField = React.createClass({
			submitMessageDelete : function(event) {
				event.preventDefault();
				this.props.onMessageDelete(this.props.listId, this.state.messageId)
			},
			handleMessageChange : function(event) {
				this.setState({messageId : event.target.value})
			},
			render: function(){
				var messageOptionValues = this.props.messages.map(function(message) {
			        return (
				      <option value={message.messageId}>{message.messageText}</option>
				    );
		   		});
				return (
					<div>
						<p><b>DeleteMessageField</b></p>
						<select onChange={this.handleMessageChange}>
				        	<option value="" selected>Choose message to delete:</option>
						    {messageOptionValues}
						</select>
						<input type="submit" value="Delete Message" onClick={this.submitMessageDelete} />
					</div>
				)
			}
		});

		var ArchiveMessageField = React.createClass({
			handleMessageArchive : function (event) {
				event.preventDefault();
				this.props.onMessageArchive(this.props.listId, this.state.messageId)
			},
			handleMessageValue : function (event){
				this.setState({messageId : event.target.value})
			},
			render: function(){
				var messageOptionValues = this.props.messages.map(function(message) {
			        return (
				      <option value={message.messageId}>{message.messageText}</option>
				    );
		   		});
				return (
					<div>
						<p><b>ArchiveMessageField</b></p>
							<select onChange={this.handleMessageValue}>
					        	<option value="" selected>Choose message to archive:</option>
							    {messageOptionValues}
							</select>
							<input type="submit" value="Archive Message" onClick={this.handleMessageArchive} />
					</div>
				)
			}
		});

		

		var OutputField = React.createClass({
			render: function() {
				// Question 5: how to access props inside of a map() function, or is there another more clean way?
				var data = this.props.lists
				var editFunction = this.props.onMessageChange
				var deleteMessageFunction = this.props.onMessageDelete
				var archiveMessageFunction = this.props.onMessageArchive
				var unarchiveMessageFunction = this.props.onMessageUnarchive
			    var lists = this.props.lists.map(function(list) {
		        	return (
		        	<div>
			      		<List data={list} onMessageUnarchive={this.props.onMessageUnarchive}/>
			      		<EditListField lists={this.props.lists} listId={list.listId} onMessageChange={this.props.onMessageChange} />
			      		<DeleteMessageField onMessageDelete={this.props.onMessageDelete} listId={list.listId} messages={list.messages}/>
			      		<ArchiveMessageField onMessageArchive={archiveMessageFunction} listId={list.listId} messages={list.messages}/>
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