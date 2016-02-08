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
		return <div>
			<Header />
			<List {...this.props} />
		</div>
	}

});
