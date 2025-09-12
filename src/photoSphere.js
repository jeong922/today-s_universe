import * as THREE from 'three';

export default class PhotoSphere {
  constructor(scene, position = { x: 0, y: 0, z: 0 }, color = '#fdfb74', apodData) {
    this.scene = scene;
    this.position = position;
    this.apodData = apodData;
    this.color = color;
    this.createSphereGeometry();
  }

  createSphereGeometry() {
    const geometry = new THREE.SphereGeometry(20, 64, 32);
    const material = new THREE.MeshStandardMaterial({
      color: this.color,
      emissive: this.color,
      emissiveIntensity: 0.5,
      metalness: 0,
      roughness: 0.7,
    });

    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(this.position.x, this.position.y, this.position.z);

    this.sphere = sphere;
    this.scene.add(sphere);

    sphere.userData = this.apodData;
  }
}
