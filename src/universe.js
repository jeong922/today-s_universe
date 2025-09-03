import * as THREE from 'three';
import Component from './aa.js';

export default class Universe extends Component {
  constructor(target, props) {
    super(target, props);
    this.init();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
  }

  animate() {}
}
