import * as THREE from 'three';

export default class Galaxy {
  constructor(scene, props) {
    this.scene = scene;
    this.props = props;
    this.group = new THREE.Group();
    this.group.rotation.x = THREE.MathUtils.degToRad(5);
    this.group.rotation.z = THREE.MathUtils.degToRad(5);
    this.scene.add(this.group);

    this.init();

    // const axesHelper = new THREE.AxesHelper(400);
    // this.group.add(axesHelper);
  }

  init() {
    const geometry = this.createGeometry();
    const material = this.createMaterial();
    this.points = new THREE.Points(geometry, material);
    this.group.add(this.points);
  }

  createGeometry() {
    const { count, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor } =
      this.props.galaxyParams;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      const r = Math.pow(Math.random(), 2.0) * radius;

      const branch = i % branches;
      const branchAngle = (branch / branches) * Math.PI * 2;

      const spinAngle = (r * spin) / radius;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[idx] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[idx + 1] = randomY;
      positions[idx + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / radius);

      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;

      scales[i] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    return geometry;
  }

  createMaterial() {
    const { size } = this.props.galaxyParams;
    return new THREE.ShaderMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      uniforms: {
        size: { value: size * Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        uniform float size;
        attribute float scale;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (1.0 / -mvPosition.z) * scale;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
    });
  }

  update(delta) {
    this.group.rotation.y += delta * 0.006;
  }
}
