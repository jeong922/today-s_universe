import * as THREE from 'three';
import Stars from './stars.js';
import Galaxy from './galaxy.js';

export default class Universe {
  constructor(target) {
    this.target = target;
    this.init();
    this.animate();
    this.addEvent();
    this.onResize();
  }

  init() {
    this.scene = new THREE.Scene();
    this.initRenderer();
    this.initCamera();

    this.stars = new Stars(this.scene);
    this.galaxy = new Galaxy(this.scene, {
      galaxyParams: {
        count: 60000,
        size: 0.03,
        radius: 380,
        branches: 5,
        spin: 5,
        randomness: 0.11,
        randomnessPower: 1.8,
        insideColor: '#d4a15f',
        outsideColor: '#6644ff',
      },
    });
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.target.clientWidth, this.target.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.target.appendChild(this.renderer.domElement);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.target.clientWidth / this.target.clientHeight, 0.1, 2000);
    this.camera.position.set(300, 200, 800);
    this.camera.lookAt(0, 0, 0);
  }

  addEvent() {
    this.onResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.onResize);
  }

  handleResize() {
    if (!this.camera || !this.renderer) {
      return;
    }

    this.camera.aspect = this.target.clientWidth / this.target.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.target.clientWidth, this.target.clientHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const elapsed = performance.now() * 0.001;

    this.stars.update(elapsed);
    this.galaxy.update(0.01);

    const radius = 800;
    this.camera.position.x = Math.cos(elapsed * 0.01) * radius;
    this.camera.position.z = Math.sin(elapsed * 0.01) * radius;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }
}
