import APOD from './api/api.js';
import Component from './baseComponent.js';
import Galaxy from './galaxy.js';
import Title from './title..js';
import Universe from './universe.js';

export default class App extends Component {
  constructor(target, props) {
    super(target, props);
  }

  template() {
    return `
    <div class="container">
      <div class="title-container"></div>
      <div class="canvas-container"></div>
    </div>
  `;
  }

  async mounted() {
    try {
      // const data = await APOD();
      // console.log('APOD 데이터:', data);
      const titleContainer = this.target.querySelector('.title-container');
      const canvasContainer = this.target.querySelector('.canvas-container');
      const universe = new Universe(canvasContainer);
      const title = new Title(titleContainer);
    } catch (err) {
      console.error(err);
    }
  }
}
