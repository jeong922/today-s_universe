export default class Component {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.state = {};
    this.render();
  }

  template() {
    return ``;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  mounted() {}

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}
