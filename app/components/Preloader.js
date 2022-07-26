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
      },
    });
    // this.createLoader();

    setTimeout(() => {
      this.emit('completed');
    }, 2000);
  }

  // createLoader() {
  //   each(this.elements.images, (image) => {
  //     console.log(image);
  //   });
  // }
}
