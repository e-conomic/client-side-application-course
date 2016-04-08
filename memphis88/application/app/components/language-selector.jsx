var React = require('react');
var AjaxHandler = require('../utilities/ajax-handler');
var Url = require('../../translate-url');

var LanguageSelector = React.createClass({
	getInitialState: function() {
		return {
			languages: []
		}
	},

	componentDidMount: function() {
		var pos = Url.indexOf('?');
		var langUrl = [Url.slice(0, pos), '/languages', Url.slice(pos), '&target=en'].join('');
		var data = [];
		AjaxHandler.get(langUrl).then(function(response) {
			response = JSON.parse(response);
			data = response.data.languages;
			this.setState({ languages: data });
		}.bind(this), function(error) {
			console.log(error);
		});
	},

	onChange: function(e) {
		this.props.onChange(e);
	},

	render: function() {
		var renderLanguages = function(data) {
			return <option
				key={data.language}
				value={data.language}>{data.name}
			</option>;
		};
		return (
			<select onChange={this.onChange}>
				<option value="none">No translation</option>
				<option disabled>------------</option>
				{this.state.languages.map(renderLanguages)}
			</select>
		);
	}
});

module.exports = LanguageSelector;