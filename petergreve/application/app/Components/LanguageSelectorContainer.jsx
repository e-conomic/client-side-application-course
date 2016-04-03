import React, {Component} from 'react';
var MessageActions = require('../actions/message-actions'); 
var MessageStore = require('../stores/message-store');
import LanguageSelector from './LanguageSelector'

class LanguageSelectorContainer extends Component {
	state = {
		languages: MessageStore.getLanguageCodes()	
	}
	componentWillMount() {
		MessageActions.fetchLanguageCodes();
	}
	componentDidMount() {
	    MessageStore.on('change', this.onChange)  
	}
	componentWillUnmount() {
	      MessageStore.removeListener('change', this.onChange)
	}
	render() {
		return <LanguageSelector languages={this.state.languages} handleSelectLanguage={this.handleSelectLanguage} />
	}
	onChange = () => {
		this.setState({
			languages: MessageStore.getLanguageCodes()
		});
	}

	handleSelectLanguage(event) {
		MessageActions.translateMessages(event.target.value)
	}
}

export default LanguageSelectorContainer;