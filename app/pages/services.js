import gsap from 'gsap';
import Draggable from 'gsap/Draggable.js';
import InertiaPlugin from 'gsap/InertiaPlugin.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Page from '../classes/Page.js';

export default class Services extends Page {
  constructor() {
    super({
      id: 'services',
      element: '#servicesWrapper',
      elements: {
        service: '.serviceEntry',
      },
    });
    this.createDropdowns();
    this.createSliders();
  }

  createDropdowns() {
    const dropdowns = document.querySelectorAll('.serviceEntry');

    dropdowns.forEach((dropdown) => {
      let btn = dropdown.querySelector('button.dropdown');
      let info = dropdown.querySelector('.serviceDetails');
      let h = info.offsetHeight;
      gsap.set(info, {
        height: 0,
      });

      dropdown.tl = gsap.timeline({
        paused: true,
      });

      dropdown.tl.to(info, {
        height: h,
        duration: 0.7,
        ease: 'expo.inOut',
      });

      dropdown.tl.reversed(true);
      btn.onclick = () => {
        dropdown.tl.reversed() ? dropdown.tl.play() : dropdown.tl.reverse();
      };
    });
  }

  createSliders() {
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
    // ScrollTrigger.matchMedia({
    //   // Below 768, apply this (mobile only)
    //   '(max-width: 768px)': function () {
    //     Draggable.create('.');
    //   },
    // });
  }
}
