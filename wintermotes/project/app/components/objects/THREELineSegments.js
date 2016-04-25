import THREE from 'three';
import { createTHREEComponent } from '../../Utils';
import THREEObject3DMixin from '../../mixins/THREEObject3DMixin';

var THREELineSegments = createTHREEComponent(
    'LineSegments',
    THREEObject3DMixin,
    {
        createTHREEObject: function() {
            return new THREE.LineSegments();
        },

        applySpecificTHREEProps: function(oldProps, newProps) {
            this.transferTHREEObject3DPropsByName(oldProps,newProps,
                ['geometry','material','mode']);
        }
    }
);

export default THREELineSegments;
