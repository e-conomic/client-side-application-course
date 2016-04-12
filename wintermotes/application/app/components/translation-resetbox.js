var React = require('react');
var MessageActions = require('../actions/message-actions');

var TranslationCheckbox = React.createClass({
	onChange : function() {
		MessageActions.disableTranslation(); 
	},
	render : function(){
		return (
			<div>
			 	<input type="button" value="reset translation" onClick={this.onChange}/>
			</div>
		);
	}
});

module.exports = TranslationCheckbox;