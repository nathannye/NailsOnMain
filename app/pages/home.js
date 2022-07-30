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
        marqueeRows: '.marqueeRow',
        marqueeContainer: '#servicesMarquee',
        nav: document.querySelector('nav.desktopNav'),
        mobileNav: document.querySelector('.mobileMenuContainer'),
        reviewSlider: '#testimonialSliderContainer',
        dates: '.scheduleEntry > h4',
        dateEntry: '.scheduleEntry',
      },
    });
    this.getActiveDate();
    this.createTestimonialSlider();
    this.createMarquee();
    this.createCursor();
  }

  getActiveDate() {
    const dates = document.querySelectorAll('.scheduleEntry');
    const today = new Date().getDay();
    dates.forEach((date, i) => {
      if (i + 1 == today) {
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

  createMarquee() {
    const rows = document.querySelectorAll('.marqueeRow');
    gsap.registerPlugin(ScrollTrigger);

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#servicesMarquee',
        scrub: true,
        start: 'top bottom',
        end: 'bottom+=20% top',
      },
    });

    rows.forEach((row, i) => {
      // if divisible by 2 = 0, its even, add an anim to move right
      if (i % 2 == 0) {
        row.anim = gsap.to(
          row,
          {
            xPercent: -18 + i * 3,
            ease: 'none',
          },
          0
        );

        this.tl.add(row.anim, 0);
      } else {
        // add a left anim if its odd
        row.anim = gsap.fromTo(
          row,
          { xPercent: -25 + i * 4 },

          { xPercent: 0, ease: 'none' }
        );
        this.tl.add(row.anim, 0);
      }
    });
  }
  createCursor() {
    const cursor = document.querySelector('.testimonialDraggerCursor');

    // window.addEventListener('mousemove', (e) => {
    //   cursor.style.left = e.pageX + 'px';
    //   cursor.style.top = e.pageY + document.scrollTop + 'px';
    // });
  }
}
