
// let React = require("react");

// var re
//

class wrapper extends React.Component {  

	constructor(props) {
		super(props);

		// init state
		this.state = {
			url: null,
		}
	}

	render: function() { 

		return ( 
			<div>
				<inputField />
			</div>
		);
	}
}

class inputField extends React.Component {

	constructor(props) {
		super(props);

		// init state
		this.state = {
			url: null,
		}
	}
}

ReactDOM.render(
	<Wrapper  />, 
	document.getElementById('app')
);


