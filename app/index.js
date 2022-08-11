import Home from './pagesHome.js';
import About from './pagesAbout.js';
import Missing from './pagesMissing.js';
import OurTeam from './pagesOur-Team.js';
import Cookie from './components/Cookie.js';
import Services from './pagesServices.js';
import Preloader from './components/Preloader.js';
import Navigation from './components/Navigation.js';

class App {
  constructor() {
    // this.addEventListeners();
    this.template = window.location.pathname;
    this.createContent();
    this.createPages();

    this.createPreloader();
    this.createNavigationToggle();
    this.nav.getActivePage({ template: this.template });
    this.addLinkListeners();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createCookie() {
    this.cookie = new Cookie();
  }

  async onPreloaded() {
    this.preloader.destroy();
  }

  createNavigationToggle() {
    this.nav = new Navigation({ template: this.template });
    console.log(this.template);
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
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

    this.page.createSmoothScroll();
    this.page.animateIn();
    this.page.parseEmojis();
    this.createCookie();
    this.page = this.pages[this.template];
  }

  // onPopState() {
  //   this.onChange({
  //     url: window.location.pathname,
  //     push: true,
  //   });

  //   console.log
  // }

  async onChange(url) {
    await this.page.animateOut();

    const res = await window.fetch(url);

    if (res.status === 200) {
      const html = await res.text();
      const div = document.createElement('div');

      div.innerHTML = html;

      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template');

      this.content.setAttribute(
        'data-template',
        divContent.getAttribute('data-template')
      );

      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];
      this.page.create();
      this.nav.getActivePage(window.location.pathname);
      this.page.registerPlugins();
      this.page.createSmoothScroll();
      this.page.animateIn();
      this.addLinkListeners();
      this.page.parseEmojis();
      // window.location.href = url;
    } else {
      console.error(`response status: ${res.status}`);
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a:not(.nonNavLink)');
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const { href } = link;
        this.onChange({ href });
      });
    });
  }
}

new App();
