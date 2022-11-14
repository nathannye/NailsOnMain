import Home from './pages/Home.js';
import About from './pages/About.js';
import Missing from './pages/Missing.js';
import OurTeam from './pages/Our-Team.js';
import Cookie from './components/Cookie.js';
import Services from './pages/Services.js';
import Preloader from './components/Preloader.js';
import Nav from './components/Nav.js';
import Lenis from '@studio-freight/lenis';

class App {
  constructor() {
    this.w = window.innerWidth;
    this.updateWidth();
    this.template = window.location.pathname;
    this.createContent();
    this.createPages();
    this.createPreloader();
    this.createNavigationToggle();
    this.createLenis();
    this.nav.getActivePage({ template: this.template });
    this.addEventListeners();
    this.addLinkListeners();
  }

  updateWidth() {
    this.w = window.innerWidth;
  }

  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));

    window.addEventListener('resize', this.updateWidth());
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createCookie() {
    this.cookie = new Cookie();
  }

  onPreloaded() {
    this.preloader.destroy();
  }

  createNavigationToggle() {
    this.nav = new Nav({ template: this.template });
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: true,
    });
  }

  createLenis() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      'our-team': new OurTeam(),
      services: new Services(),
      404: new Missing(),
    };

    this.page = this.pages[this.template];
    this.page.create();

    // this.page.createSmoothScroll();

    this.page.parseEmojis();
    this.createCookie();
    this.page = this.pages[this.template];
    setTimeout(() => {
      this.page.animateIn();
    }, 1700);
  }

  async onChange({ url, push = true }) {
    await this.page.animateOut();

    const res = await window.fetch(url);

    if (res.status === 200) {
      const html = await res.text();
      const div = document.createElement('div');

      if (push) {
        window.history.pushState({}, '', url);
        console.log(window.location.pathname);
      }

      div.innerHTML = html;

      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template');

      this.content.setAttribute(
        'data-template',
        divContent.getAttribute('data-template')
      );

      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];
      this.page.scrollToTop();

      this.page.create();
      this.page.registerPlugins();
      // mobile no smooth
      if (this.w > 768 && this.smooth) {
        this.smooth = null;
      } else if (this.w < 768) {
        this.page.createSmoothScroll();
      }
      this.addLinkListeners();
      this.page.parseEmojis();
      // setTimeout(() => {
      this.page.animateIn();
      // }, 800);
    } else {
      console.error(`response status: ${res.status}`);
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a.navLink');
    links.forEach((link) => {
      // link.addEventListener('click', (event) => {
      //   event.preventDefault();
      //   const { href } = link;
      //   this.onChange({ url: href });
      // });
      link.onclick = (event) => {
        event.preventDefault();

        const { href } = link;
        this.onChange({ url: href });
      };
    });
  }
}

new App();
