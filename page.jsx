var React = require('react');

var { Button, ButtonToolbar, ListGroup, ListGroupItem } = require('react-bootstrap');

var HeadTag = React.createClass({

	render: function() {
		return (
			<head>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
				<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
			</head>
		);
	}
});

var Header = React.createClass({
	render: function() {
		return <ButtonToolbar>
			<Button href="/">Home</Button>
			<Button href="/public" bsStyle="info">Assignments</Button>
			<Button href="/course-info/details.md" bsStyle="info">Course-info</Button>
		</ButtonToolbar>
	}
});

var List = React.createClass({
	propTypes: {
		items: React.PropTypes.array
	},
	render: function() {
		return <ListGroup>
			{this.props.items.map(item => <ListGroupItem href={item.path}>{item.name}</ListGroupItem>)}
		</ListGroup>
	}
});

module.exports = React.createClass({
	displayName: 'Page',
	render: function() {
		return <html>
			<HeadTag />
			<body style={{padding: '30px'}}>
				<div>
					<Header />
					<div style={{padding: '30px 0'}}>
						<List {...this.props} />
					</div>
				</div>
			</body>
		</html>
	}

});
