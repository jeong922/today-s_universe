import APOD from './api/api.js';
import Component from './baseComponent.js';
import Universe from './universe.js';

export default class App extends Component {
  constructor(target, props) {
    super(target, props);
  }

  template() {
    return `<div class="container"></div>`;
  }

  async mounted() {
    try {
      // const data = await APOD();
      // console.log('APOD 데이터:', data);
      const container = this.target.querySelector('.container');
      const universe = new Universe(container);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }
}
