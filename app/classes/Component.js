import EventEmitter from 'events';
import gsap from 'gsap';
import { each } from 'lodash';
import twemoji from 'twemoji';

export default class Component extends EventEmitter {
  constructor({ elements, element }) {
    super();
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };

    this.create();
    this.parseEmojis();
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
  parseEmojis() {
    function constructTwemojiURL(icon, options) {
      switch (icon) {
        case 'a9': // © copyright
        case 'ae': // ® registered trademark
        case '2122': // ™ trademark
          return false;
      }
      return ''.concat(options.base, options.size, '/', icon, options.ext);
    }

    const emojis = document.querySelectorAll('.twemojiReplace');

    emojis.forEach((emoji, i) => {
      // emoji = `${emoji.innerHTML}`;
      twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg',
        callback: (icon, options) => {
          // create the image tag
          let img = document.createElement('img');
          let parent = emoji.parentElement;
          // assign the image source
          let src = constructTwemojiURL(icon, options);
          img.setAttribute('data-src', src);
          img.alt = 'Twemoji';

          // append the tag to our document body
          parent.append(img);
          // emojis[i].append(img);
        },
      });

      emoji.innerHTML = '';
    });
  }

  addEventListeners() {}

  removeEventListeners() {}
}
