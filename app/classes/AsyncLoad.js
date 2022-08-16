import Component from 'classes/Component';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';

export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element });
    this.createObserver();
  }

  createObserver() {
    this.observer = ScrollTrigger.create();
  }
}
