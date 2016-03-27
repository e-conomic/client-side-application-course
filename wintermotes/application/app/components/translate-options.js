var React = require('react');
var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');

var TranslateOptions = React.createClass({
	getInitialState: function(){
		return {
			messages : MessageStore.getAllMessages(),
			languages : [], 
			selectedLanguage : null
		}
	},
	onClickAction: function(event){
		MessageActions.translateMessages(this.state.messages, this.state.selectedLanguage);
	},
	handleLanguage: function(event){
		this.setState({selectedLanguage : event.target.value})
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
		MessageActions.getAllLangugages(); 

	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({
			languages : MessageStore.getAllLangugages(), 
			messages : MessageStore.getAllMessages()
		});
	},
	render: function() {
		var output = "Loading languages..."
		if(this.state.languages.length != 0){
			output = this.state.languages.languages.map(function(language) {
				return(
					<option key={language.language} value={language.language}>Select Language: {language.language}</option>
				)
			});	
		}
		return (
			<div>
				<select onChange={this.handleLanguage}>
					{output}
				</select>
				<input type="submit" value="Translate messages" onClick={this.onClickAction} />
			</div>
		)
	}
});

module.exports = TranslateOptions