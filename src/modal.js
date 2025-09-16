import Component from './baseComponent.js';

export default class Modal extends Component {
  constructor(target, props = {}) {
    super(target, props);

    this.state = {
      isOpen: false,
      apodData: null,
    };
  }

  template() {
    if (!this.state.isOpen || !this.state.apodData) {
      return '';
    }

    const { title, url, explanation, date } = this.state.apodData;

    return `
      <div class="modal-overlay">
        <div class="modal-content">
        <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
          <h2>${title}</h2>
          <p class="date">${date}</p>
          <img class="img" src="${url}">
          <p class="explanation">${explanation}</p>
        </div>
      </div>
    `;
  }

  mounted() {
    if (!this.state.isOpen) {
      return;
    }

    this.target.querySelector('.close-modal')?.addEventListener('click', () => {
      this.close();
    });

    this.target.querySelector('.modal-overlay')?.addEventListener('click', () => {
      this.close();
    });
  }

  open(apodData) {
    this.setState({
      isOpen: true,
      apodData,
    });
  }

  close() {
    this.setState({
      isOpen: false,
      apodData: null,
    });
  }
}
