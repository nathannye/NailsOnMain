import gsap from 'gsap';
import ScrollSmoother from 'gsap/src/ScrollSmoother.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import { each } from 'lodash';
import twemoji from 'twemoji';

export default class Page {
  constructor({ id, elements, element }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };
  }

  scrollToTop() {
    window.scrollTo(0, 0);
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

  animateOut() {
    return new Promise((resolve) => {
      this.tl = gsap.timeline({
        onComplete: resolve,
      });

      this.tl.to(
        '.content',
        {
          autoAlpha: 0,
          y: -35,
          ease: 'power2.in',
          duration: 0.6,
        },
        0
      );
    });
  }

  animateIn() {
    return new Promise((resolve) => {
      this.tl = gsap.timeline({
        delay: 0.75,
        onComplete: resolve,
      });

      this.tl.fromTo(
        '.content',
        { autoAlpha: 0, y: -35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
        },
        0.05
      );
    });
  }
  createSmoothScroll() {
    // if it hasn't been created, make it
    if (!this.smooth) {
      this.smooth = ScrollSmoother.create({
        content: '.scrollWrapper',
        wrapper: '.content',
        smooth: 0.65,
        normalizeScroll: true,
        effects: true,
      });
    } else if (this.smooth) {
      // if it has been created, kill it, and make a new one
      this.smooth.kill();
      this.smooth = ScrollSmoother.create({
        content: '.scrollWrapper',
        wrapper: '.content',
        normalizeScroll: true,
        effects: true,
        smooth: 0.65,
      });
    }

    ScrollTrigger.refresh();
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
          img.classList.add('emoji');
          let parent = emoji.parentElement;
          // assign the image source
          let src = constructTwemojiURL(icon, options);
          img.src = src;
          img.alt = 'Twemoji';

          // append the tag to our document body
          parent.append(img);
          // emojis[i].append(img);
        },
      });

      emoji.innerHTML = '';
    });
  }
}
