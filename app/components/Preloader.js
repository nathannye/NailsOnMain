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
        title: '.preloaderContainer h2',
        assets: '[data-src]',
        emoji: '.preloaderTextContainer .emoji',
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
      this.animateOut = gsap.timeline({
        delay: 1.75,
      });

      let split = new SplitText(this.elements.title, {
        type: 'chars',
      });

      this.animateOut
        .to(
          split.chars,
          {
            autoAlpha: 0,
            y: -15,
            rotateX: 25,
            stagger: 0.025,
            duration: 0.65,
            ease: 'expo.inOut',
          },
          0
        )
        .to(
          this.elements.emoji,
          {
            scale: 0.675,
            autoAlpha: 0,
            ease: 'back.inOut(2)',
            duration: 0.4,
          },
          0.35
        )
        .to(
          this.elements.gradient,
          {
            scale: 1.25,
            autoAlpha: 0,
            ease: 'expo.out',
            duration: 0.75,
          },
          0.35
        )
        .to(
          this.element,
          {
            autoAlpha: 0,
            duration: 0.6,
          },
          0.4
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
