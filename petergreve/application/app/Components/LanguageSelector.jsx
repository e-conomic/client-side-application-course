import React, {Component} from 'react';

class LanguageSelector extends Component {

	static propTypes = {
		languages: React.PropTypes.array
	}
	render() {
		return (<div>Select language of messages:
	                <select onChange={this.props.handleSelectLanguage} defaultValue='0'>
	                    {this.props.languages.map(function(language,i) {
	                        return <option key={i} value={language}  >{language}</option>;
	                    },this)}
	           	    </select>
	           	    <br/><br/>
           	   	</div>
			)
	}
}

export default LanguageSelector;