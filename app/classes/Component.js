import EventEmitter from 'events';
import gsap from 'gsap';
import { each } from 'lodash';

export default class Component extends EventEmitter {
  constructor({ elements, element }) {
    super();
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };

    this.create();
    this.addEventListeners();
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

  addEventListeners() {}

  removeEventListeners() {}
}
