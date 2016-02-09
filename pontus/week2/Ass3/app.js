


// the wrapper contains an {} of lists

	// each list contains an {} of messages

		// each msg is an {}


class Wrapper extends React.Component { 
	constructor(props) { 
		super(props);

		// init state
      this.state = {
			lists: {

				"listID": {
					"messageID":{ text: "message one of list"},
					"messageID2": { text: "message two of list"}
				},

				"listID2": {
					"messageID":  { text: "message one of second list"},
					"messageID2": { text: "message two of second list"}
				}
			}

		};
	}

	genRandomNr()  { 
		console.log('hej');
	}        

	createMsg(id, message) {
		console.log(id);
		console.log(message);

		// let newId = genRandomNr();
		this.genRandomNr();
	}

	render() {

		let lists = [];

		for (let list in this.state.lists) { 
			console.log(list);
			lists.push(<NamedList createMsg={this.createMsg} id={list} list={this.state.lists[list]} />);
		}
			
		return (
			<div>
				{lists}
			</div>
		);
	}
}

class NamedList extends React.Component { 
	constructor(props) { 
		super(props);

		// this.createMsg = this.createMsg.bind(this);

		this.createMsg = () => { 
		// console.log(`create msg for list ${this.props.id}`);
		
		let message = this.refs.inputField.value;

		// callback to wrapper
		this.props.createMsg(this.props.id, message);
		}
	}


	// createMsg() { 
	// 	// console.log(`create msg for list ${this.props.id}`);
	// 	
	// 	let message = this.refs.inputField.value;
   //
	// 	// callback to wrapper
	// 	this.props.createMsg(this.props.id, message);
	// }

	render() {

		let messages = [];

		for (let message in this.props.list) { 
			messages.push(<Message message={this.props.list[message].text}/>);
		}

		return (
			<div>
				<ul>
					{messages}
				</ul> 
				<input ref='inputField' type="text" />
				<button onClick={this.createMsg}>Create New Message</button>
			</div>
		);
	}
}

class Message extends React.Component { 
	constructor(props) { 
		super(props);
	}

	render() {
		return (
			<div>
				<li>{this.props.message}</li>
			</div>
		);
	}
}

ReactDOM.render(
	<Wrapper />, 
	document.getElementById('app')
);

