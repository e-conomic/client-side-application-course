//
// Basic React-THREE example using a custom 'Cupcake' Component which consists of two cubes
//

/* global React */
/* global ReactTHREE */
/* global THREE */

var assetpath = function(filename) { return '../assets/' + filename; };

var MeshFactory = React.createFactory(ReactTHREE.Mesh);

//
// Cupcake component is two cube meshes textured with cupcake textures
//

var boxgeometry = new THREE.BoxGeometry( 200,200,200);

var cupcaketexture = THREE.ImageUtils.loadTexture( assetpath('cupCake.png') );
var cupcakematerial = new THREE.MeshBasicMaterial( { map: cupcaketexture } );

var creamtexture = THREE.ImageUtils.loadTexture( assetpath('creamPink.png') );
var creammaterial = new THREE.MeshBasicMaterial( { map: creamtexture } );

var Cupcake = React.createClass({
  displayName: 'Cupcake',
  propTypes: {
    position: React.PropTypes.instanceOf(THREE.Vector3),
    quaternion: React.PropTypes.instanceOf(THREE.Quaternion).isRequired
  },
  render: function() {
    return React.createElement(
      ReactTHREE.Object3D,
      {quaternion:this.props.quaternion, position:this.props.position || new THREE.Vector3(0,0,0)},
      MeshFactory({position:new THREE.Vector3(0,-100,0), geometry:boxgeometry, material:cupcakematerial}),
      MeshFactory({position:new THREE.Vector3(0, 100,0), geometry:boxgeometry, material:creammaterial})
    );
  }
});

//
// The top level component
// props:
// - width,height : size of the overall render canvas in pixels
// - xposition: x position in pixels that governs where the elements are placed
//

var ExampleScene = React.createClass({
  displayName: 'ExampleScene',
  render: function() {
    var MainCameraElement = React.createElement(
      ReactTHREE.PerspectiveCamera,
      {name:'maincamera', fov:'75', aspect:this.props.width/this.props.height, near:1, far:5000, position:new THREE.Vector3(0,0,600), lookat:new THREE.Vector3(0,0,0)});

    return (
        React.createElement(ReactTHREE.Renderer, { width:this.props.width, height:this.props.height },
            React.createElement(ReactTHREE.Scene,
                {width:this.props.width, height:this.props.height, camera:'maincamera'}
                ,MainCameraElement
                ,React.createElement(Cupcake, this.props.cupcakedata)
            ),
            React.createElement(ReactTHREE.Scene,
                {width:this.props.width, height:this.props.height, camera:'maincamera'}
                ,MainCameraElement
                ,React.createElement(Cupcake, this.props.cupcakedata2)
            )
        )
    );
  }
});

var cupcakestart = function() { // eslint-disable-line no-unused-vars
  var renderelement = document.getElementById("three-box");

  var w = window.innerWidth-6;
  var h = window.innerHeight-6;

  var sceneprops = {width:w, height:h,
    cupcakedata:{position:new THREE.Vector3(0,0,0), quaternion:new THREE.Quaternion()},
    cupcakedata2:{position:new THREE.Vector3(0,0,0), quaternion:new THREE.Quaternion()}
  };
  var cupcakeprops = sceneprops.cupcakedata;
  var cupcakeprops2 = sceneprops.cupcakedata2;
  var rotationangle = 0;

  ReactTHREE.render(React.createElement(ExampleScene,sceneprops), renderelement);

  function spincupcake(t) {
    rotationangle = t * 0.001;
    cupcakeprops.quaternion.setFromEuler(new THREE.Euler(rotationangle,rotationangle*3,0));
    cupcakeprops.position.x = 300  * Math.sin(rotationangle);
    cupcakeprops2.quaternion.setFromEuler(new THREE.Euler(rotationangle,rotationangle*3,0));
    cupcakeprops2.position.x = 300  * Math.sin(-rotationangle);

    ReactTHREE.render(React.createElement(ExampleScene,sceneprops), renderelement);

    requestAnimationFrame(spincupcake);
  }

  spincupcake();
}
