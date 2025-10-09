import * as THREE from 'three';

export default class Stars {
  static STAR_COUNT = 1000;
  static PALETTE = [
    [0.7, 0.8, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 0.95, 0.7],
    [1.0, 0.85, 0.5],
    [1.0, 0.6, 0.3],
    [1.0, 0.4, 0.4],
    [0.5, 0.7, 1.0],
  ];

  constructor(scene) {
    this.scene = scene;
    this.init();
  }

  init() {
    const geometry = this.createGeometry();
    const material = this.createMaterial();
    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
    this.scene.background = new THREE.Color(0x000010);
  }

  createGeometry() {
    const positions = new Float32Array(Stars.STAR_COUNT * 3);
    const colors = new Float32Array(Stars.STAR_COUNT * 3);
    const phases = new Float32Array(Stars.STAR_COUNT);

    for (let i = 0; i < Stars.STAR_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 2000;
      positions[idx + 1] = (Math.random() - 0.5) * 2000;
      positions[idx + 2] = (Math.random() - 0.5) * 2000;

      const color = Stars.PALETTE[Math.floor(Math.random() * Stars.PALETTE.length)];
      colors[idx] = color[0];
      colors[idx + 1] = color[1];
      colors[idx + 2] = color[2];

      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    return geometry;
  }

  createMaterial() {
    return new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0.0 },
        uSize: { value: 6.0 },
      },
      vertexShader: `
            uniform float uTime;
            uniform float uSize;
            attribute float phase;
            varying vec3 vColor;
    
            void main() {
              float flicker = 0.7 + sin(uTime + phase) * 0.3;
              vColor = color * flicker;
    
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mvPosition;
              gl_PointSize = uSize * (300.0 / -mvPosition.z);
            }
          `,
      fragmentShader: `
            varying vec3 vColor;
            void main() {
              float d = length(gl_PointCoord - vec2(0.5));
              if (d > 0.5) discard;
              gl_FragColor = vec4(vColor, 1.0 - d * 2.0);
            }
          `,
    });
  }

  update(time) {
    if (this.points) {
      this.points.material.uniforms.uTime.value = time;
    }
  }
}
