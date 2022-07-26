import gsap from 'gsap';
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

  animateIn() {
    return new Promise((resolve) => {
      gsap.from(this.element, {
        autoAlpha: 0,
        duration: 1,
        onComplete: resolve,
      });
    });
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
