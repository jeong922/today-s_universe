import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import Stars from './stars.js';
import Galaxy from './galaxy.js';
import PhotoSphere from './photoSphere.js';
import Modal from './modal.js';

export default class Universe {
  constructor(target, props) {
    this.target = target;
    this.props = props;

    const modalTarget = document.querySelector('.modal');
    this.modal = new Modal(modalTarget);

    this.init();
    this.animate();
    this.addEvent();
    this.onResize();
  }

  init() {
    this.scene = new THREE.Scene();
    this.initRenderer();
    this.initCamera();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 300, 200);
    this.scene.add(directionalLight);

    this.stars = new Stars(this.scene);
    this.galaxy = new Galaxy(this.scene, {
      galaxyParams: {
        count: 50000,
        size: 0.01,
        radius: 350,
        branches: 5,
        spin: 5,
        randomness: 0.15,
        randomnessPower: 1.8,
        insideColor: '#d4a15f',
        outsideColor: '#5744ff',
      },
    });

    this.photoSpheres = this.createPhotoSpheres();

    this.setupBloom();

    // Raycaster 준비
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.target.appendChild(this.renderer.domElement);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(300, 200, 800);
    this.camera.lookAt(0, 0, 0);
  }

  setupBloom() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.9, 0.8, 0.2);

    this.composer.addPass(this.bloomPass);
  }

  createPhotoSpheres() {
    const positions = [
      { x: 500, y: 100, z: 100 },
      { x: 350, y: 100, z: 300 },
      { x: -400, y: -60, z: 600 },
      { x: -500, y: 300, z: 200 },
      { x: 200, y: -100, z: -600 },
    ];
    const colors = ['#fffd98', '#8ddbff', '#f885a8', '#b3f774', '#c9a7ff'];

    return this.props.data.map((apod, i) => {
      const position = positions[i];
      const color = colors[i];
      const sphere = new PhotoSphere(this.scene, position, color, apod);
      return sphere.sphere;
    });
  }

  addEvent() {
    this.onResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.onResize);

    // 클릭 이벤트
    this.onClick = this.handleClick.bind(this);
    this.renderer.domElement.addEventListener('click', this.onClick);
  }

  handleClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.photoSpheres);

    if (intersects.length > 0) {
      const clickedSphere = intersects[0].object;
      console.log('클릭한 구 데이터:', clickedSphere.userData);

      this.modal.open(clickedSphere.userData);
    }
  }

  handleResize() {
    if (!this.camera || !this.renderer) return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (this.composer) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const elapsed = performance.now() * 0.001;

    this.stars.update(elapsed);
    this.galaxy.update(0.01);

    const radius = 900;
    this.camera.position.x = Math.cos(elapsed * 0.01) * radius;
    this.camera.position.z = Math.sin(elapsed * 0.01) * radius;
    this.camera.lookAt(0, 0, 0);

    this.composer.render();
  }
}
