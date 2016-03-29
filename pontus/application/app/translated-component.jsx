let React = require('react');
let MenuItem = require('./menu-item');
let MessageActions = require('./actions/message-actions');
let MessageStore = require('./stores/message-store');
let ListStore = require("./stores/list-store"); 

let TranslatedMessage = React.createClass({ 
	propTypes: { 
		text: React.PropTypes.string,
	},

	getInitialState() { 

		return { 
			text: ''
		};
	},
	componentDidMount() {

		this.setState({ 
			text: window.location.hash
		});
	},

	render() {
		let translatedMessage = (this.props.translatedMessage) ?  `(Translated Message: ${this.props.translatedMessage})` : "";

		let translatedMessageStyle = { 
			display: 'inline',
			marginRight: '1em'
		};

		return (
			<div>
				<div style={translatedMessageStyle} dangerouslySetInnerHTML={{__html: translatedMessage}}></div>;
				<div dangerouslySetInnerHTML={{__html: this.state.text}}></div>
			 </div>
		 );
	}

}); 

module.exports = TranslatedMessage;
