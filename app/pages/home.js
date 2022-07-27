import Page from '../classes/Page.js';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/src/ScrollSmoother.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Draggable from 'gsap/Draggable.js';
import InertiaPlugin from 'gsap/InertiaPlugin.js';

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
    this.getActiveDate();
    this.createTestimonialSlider();
  }

  getActiveDate() {
    const dates = document.querySelectorAll('.scheduleEntry');
    const today = new Date().getDay();
    dates.forEach((date, i) => {
      if (i == today) {
        date.classList.add('todaysTheDay');
      }
    });
  }

  createTestimonialSlider() {
    gsap.registerPlugin(Draggable, InertiaPlugin);

    Draggable.create('#testimonialSlider', {
      type: 'x',
      inertia: true,
      edgeResistance: 0.4,
      bounds: '#testimonialSliderContainer',
    });
  }
}
