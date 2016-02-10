var Message = React.createClass({
	render: function() {
		return <h1>{"Hello world"}</h1>;
	}
});
var MessageList = React.createClass({

});
var ArchiveList = React.createClass({

});
var AssignmentApp = React.createClass({

});
ReactDOM.render(
	<Message />, 
	document.getElementById('app')
);