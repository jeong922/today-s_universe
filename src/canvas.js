import * as THREE from 'three';

export default class Canvas {
  constructor(target) {
    this.target = target;
    this.scene = new THREE.Scene();
    this.render();
  }

  template() {
    return ``;
  }

  mounted() {}

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}
