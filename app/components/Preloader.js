import gsap from 'gsap';
import { each } from 'lodash';
import Component from '../classes/Component.js';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloaderContainer',
      elements: {
        gradient: 'preloaderGradientContainer',
        title: '.preloaderContainer h2',
        images: document.querySelectorAll('img'),
        number: '.preloaderNumber',
      },
    });

    this.length = 0;
    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (e) => {
      e.onload = (_) => this.onAssetLoaded(e);
      e.src = e.getAttribute('data-src');
    });
  }

  onAssetLoaded(image) {
    this.length += 1;

    var percentLoaded = this.length / this.elements.images.length;
    this.elements.number.innerHTML = Math.round(percentLoaded * 100) + '%';

    if ((percentLoaded = 1)) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = gsap.timeline({
        delay: 1.75,
      });

      this.animateOut
        .to(this.element, {
          autoAlpha: 0,
        })
        .call((_) => {
          this.emit('completed');
        });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  } 

  animateOut() {}
}
