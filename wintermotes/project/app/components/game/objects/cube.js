var ReactTHREE = require('../../../react-three-exposeglobals');
var THREE = require('three');

var MeshFactory = React.createFactory(ReactTHREE.Mesh);

var Cupcake = React.createClass({
	displayName: 'Cupcake',
	propTypes: {
		position: React.PropTypes.instanceOf(THREE.Vector3),
		quaternion: React.PropTypes.instanceOf(THREE.Quaternion).isRequired
	},
	render: function() {
		return(
			<div> 
				Hello there!
			</div>
		) 
	}
});

module.exports = Cupcake; 

		//React.createElement(
			//'div', {},
			//  "Hello, world! I am a Cookie ."
			//ReactTHREE.Object3D,
			//{quaternion:this.props.quaternion, position:this.props.position || new THREE.Vector3(0,0,0)},
			//MeshFactory({position:new THREE.Vector3(0,-100,0), geometry:boxgeometry, material:cupcakematerial})
			//MeshFactory({position:new THREE.Vector3(0, 100,0), geometry:boxgeometry, material:creammaterial})