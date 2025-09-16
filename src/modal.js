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

    const { title, url, explanation, date, media_type } = this.state.apodData;

    let media = '';

    if (media_type === 'image') {
      media = `<img class="img" src="${url}" alt="${title}">`;
    } else if (media_type === 'video') {
      media = `
      <div class="video-wrapper">
        <iframe 
          src="${url}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
    }

    return `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
          <h2>${title}</h2>
          <p class="date">${date}</p>
          ${media}
          <p class="explanation">${explanation}</p>
        </div>
      </div>
    `;
  }

  mounted() {
    if (!this.state.isOpen) {
      return;
    }

    const overlay = this.target.querySelector('.modal-overlay');
    const closeBtn = this.target.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
      this.close();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
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
