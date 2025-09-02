import APOD from './api/api.js';

export default class App {
  constructor(target) {
    this.target = target;
    this.render();
  }

  template() {
    return `<div class="container">
          <canvas class="canvas"></canvas>
    </div>`;
  }

  async mounted() {
    try {
      const data = await APOD();
      console.log('APOD 데이터:', data);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}
