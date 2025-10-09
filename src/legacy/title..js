import Component from './baseComponent.js';

export default class Title extends Component {
  constructor(target, props) {
    super(target, props);
    this.addEvents();
  }

  template() {
    return `
    <h1 class="title">오늘의 우주는?</h1>
    <button class="start">시작하기</button>
  `;
  }

  addEvents() {
    const btn = this.target.querySelector('.start');
    btn.addEventListener('click', () => {
      this.target.classList.add('fade-out');
      this.target.addEventListener(
        'transitionend',
        () => {
          this.target.remove();
        },
        { once: true }
      );
    });
  }
}
