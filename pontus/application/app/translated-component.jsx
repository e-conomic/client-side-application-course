let React = require('react');
let MenuItem = require('./menu-item');
let MessageActions = require('./actions/message-actions');
let MessageStore = require('./stores/message-store');

let ListStore = require("./stores/list-store"); 


let TranslatedMessage = React.createClass({ 
	propTypes: { 
		text: React.PropTypes.string,
	},

	componentWillMount() { 

		// if (true) { 
		// 	MessageStore.get();


	},

	render() {

		// return a translated message.
		let loadingGif = (MessageStore.getTranslationStatus()) ? "loadingGIF" : "";

		let translatedMessage = `(Translated Message: ${this.props.translatedMessage})`;

		let translatedMessageStyle = { 
			display: 'inline',
			marginRight: '1em'
		};

		return (
				<div style={translatedMessageStyle}>

					{loadingGif}

					{translatedMessage}

				</div>
		);
	}
}); 

module.exports = TranslatedMessage;
