import * as THREE from 'three';

export default class PhotoSphere {
  constructor(scene, position = { x: 0, y: 0, z: 0 }) {
    this.scene = scene;
    this.position = position;
    this.createSphereGeometry();
  }

  createSphereGeometry() {
    const geometry = new THREE.SphereGeometry(20, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: '#fdfb74' });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(this.position.x, this.position.y, this.position.z);

    this.scene.add(sphere);
  }
}
