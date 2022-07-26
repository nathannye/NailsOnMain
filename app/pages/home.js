import Page from '../classes/Page.js';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '#homeWrapper',
      elements: {
        marqueeRow: '.marqueeRow',
        nav: document.querySelector('nav.desktopNav'),
        mobileNav: document.querySelector('.mobileMenuContainer'),
        reviewSlider: '#testimonialSliderContainer',
        dates: '.scheduleEntry > h4',
        dateEntry: '.scheduleEntry',
      },
    });
  }

  create() {
    super.create();

    // this.setActiveDate();
  }

  // setActiveDate() {
  //   let today = new Date().getDay();
  //   console.log(today);
  //   console.log(this.elements);
  // }
}
