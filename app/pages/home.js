import Page from '../classes/page.js';


export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '#homeWrapper',
      elements: {
        marqueeRow: '.marqueeRow',
        reviewSlider: '.testimonialSliderContainer',
      },
    });
  }
}
