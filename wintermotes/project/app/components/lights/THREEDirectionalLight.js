import THREE from 'three';
import { createTHREEComponent } from '../../Utils';
import THREEObject3DMixin from '../../mixins/THREEObject3DMixin';
import LightObjectMixin from '../../mixins/LightObjectMixin';

var CommonShadowmapProps = require('./CommonShadowmapProps');

var THREEDirectionalLight = createTHREEComponent(
  'DirectionalLight',
  THREEObject3DMixin,
  {
    createTHREEObject: function() {
      return new THREE.DirectionalLight(0xffffff,1);
    },

    applySpecificTHREEProps: function(oldProps, newProps) {
      LightObjectMixin.applySpecificTHREEProps.call(this, oldProps, newProps);

      this.transferTHREEObject3DPropsByName(oldProps, newProps, CommonShadowmapProps);

      this.transferTHREEObject3DPropsByName(oldProps, newProps,
                                            ['target',
                                             'intensity',
                                             'onlyShadow',
                                             'shadowCameraLeft',
                                             'shadowCameraRight',
                                             'shadowCameraTop',
                                             'shadowCameraBottom',
                                             'shadowCascade',
                                             'shadowCascadeOffset',
                                             'shadowCascadeCount',
                                             'shadowCascadeBias',
                                             'shadowCascadeWidth',
                                             'shadowCascadeHeight',
                                             'shadowCascadeNearZ',
                                             'shadowCascadeFarZ',
                                             'shadowCascadeArray']);

    }
  }
);

export default THREEDirectionalLight;

