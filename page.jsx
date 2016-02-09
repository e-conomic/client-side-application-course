var React = require('react');

var Header = React.createClass({
	render: function() {
		return <nav style={{padding: '20px'}}>
			<li><a href="/">HOME</a></li>
		</nav>
	}
});

var List = React.createClass({
	propTypes: {
		items: React.PropTypes.array
	},
	render: function() {
		return <div>
			<ul>{this.props.items.map(item => <li key={item.path}><a href={item.path}>{item.name}</a></li>)}</ul>
		</div>
	}
});

module.exports = React.createClass({
	displayName: 'Page',
	render: function() {
		return <html>
			<head>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
			</head><body>
			<div>
				<Header />
				<List {...this.props} />
			</div></body></html>
	}

});
