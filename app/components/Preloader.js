import gsap from 'gsap';
import SplitText from 'gsap/SplitText.js';
import Flip from 'gsap/src/Flip.js';
import { each } from 'lodash';
import Component from 'classes/Component.js';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloaderContainer',
      elements: {
        gradient: '.preloaderGradientContainer',
        g: '.gradient',
        title: '.preloaderContainer h2',
        assets: '[data-src]',
        number: '.preloaderNumber',
      },
    });
    this.length = 0;
  }

  create() {
    super.create();
    this.createLoader();
  }

  createLoader() {
    each(this.elements.assets, (asset) => {
      asset.onload = (_) => this.onAssetLoaded(asset);
      asset.src = asset.getAttribute('data-src');
    });
  }

  onAssetLoaded(image) {
    this.length += 1;
    var percentLoaded = this.length / this.elements.assets.length;
    this.elements.number.innerHTML = Math.round(percentLoaded * 100) + '%';

    if (percentLoaded == 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    gsap.registerPlugin(Flip, SplitText);
    return new Promise((resolve) => {
      // const state = Flip.getState(this.elements.g);
      // let originalContainer = this.elements.gradient;
      // let backer = document.querySelector('.headerGradientContainer');

      this.animateOut = gsap.timeline({
        delay: 1.75,
      });

      let split = new SplitText(this.elements.title, {
        type: 'chars',
      });

      this.animateOut
        .to(
          this.element,
          {
            autoAlpha: 0,
          },
          0
        )
        // .call(
        //   () => {
        //     backer.appendChild(this.elements.g);

        //     Flip.from(state, {
        //       duration: 4,
        //       ease: 'expo.inOut',
        //       scale: true,
        //       absolute: true,
        //     });

        //     // originalContainer.removeChild(this.elements.g);
        //   }
        //   // null,
        //   // 1
        // )
        .to(
          split.chars,
          {
            autoAlpha: 0,
            y: -5,
            stagger: 0.02,
            duration: 0.5,
            ease: 'expo.in',
          },
          0
        )
        .call(
          (_) => {
            this.emit('completed');
          },
          null,
          '>'
        );
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }

  animateOut() {}
}
