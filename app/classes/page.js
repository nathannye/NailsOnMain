import gsap from 'gsap';
import ScrollSmoother from 'gsap/src/ScrollSmoother.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { each } from 'lodash';

export default class Page {
  constructor({ id, elements, element }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };
  }

  create() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    this.element = document.querySelector(this.selector);
    this.elements = {};
    each(this.selectorChildren, (e, i) => {
      if (
        e instanceof window.HTMLElement ||
        e instanceof window.NodeList ||
        Array.isArray(e)
      ) {
        this.elements[i] = e;
      } else {
        this.elements[i] = document.querySelectorAll(e);
        if (this.elements[i].length === 0) {
          this.elements[i] = null;
        } else if (this.elements[i].length === 1) {
          this.elements[i] = document.querySelector(e);
        }
      }
    });
  }

  registerPlugins() {
    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
  }

  animateIn() {
    return new Promise((resolve) => {
      gsap.from(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
  }

  createSmoothScroll(content, wrapper) {
    // if it hasn't been created, make it
    if (!this.smooth) {
      this.smooth = ScrollSmoother.create({
        content: '.scrollWrapper',
        wrapper: '#content',
      });
    } else if (this.smooth) {
      // if it has been created, kill it, and make it new
      this.smooth.kill();
      this.smooth = ScrollSmoother.create({
        content: '.scrollWrapper',
        wrapper: '#content',
      });
    }

    ScrollTrigger.refresh();
  }

  animateOut() {
    return new Promise((resolve) => {
      gsap.to(this.element, {
        autoAlpha: 0,
        duration: 1,
        duration: 1,
        onComplete: resolve,
      });
    });
  }
}
