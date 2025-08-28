export default class App {
  constructor(target) {
    this.target = target;
    this.render();
  }

  template() {
    return `<div class="container">test</div>`;
  }

  mounted() {}

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}
