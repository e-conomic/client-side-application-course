var ExampleScene = React.createClass({
  displayName: 'ExampleScene',
  render: function() {
    var MainCameraElement = React.createElement(
      ReactTHREE.PerspectiveCamera,
      {name:'maincamera', fov:'75', aspect:this.props.width/this.props.height, near:1, far:5000, position:new THREE.Vector3(0,0,600), lookat:new THREE.Vector3(0,0,0)});

    return (
        React.createElement(ReactTHREE.Renderer, { background: 0x101010,  width:this.props.width, height:this.props.height },
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

module.exports = ExampleScene; 