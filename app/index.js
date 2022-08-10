import Home from 'pages/Home.js';
import About from 'pages/About.js';
import Missing from 'pages/Missing.js';
import OurTeam from 'pages/Our-Team.js';
import Services from 'pages/Services.js';
import Preloader from './components/Preloader.js';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/src/ScrollSmoother.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Nav from './components/Nav.js';

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

  async onPreloaded() {
    this.preloader.destroy();
  }

  createNavigationToggle() {
    this.nav = new Nav({ template: this.template });
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

    this.page = this.pages[this.template];
  }

  async onChange(url) {
    await this.page.animateOut();

    const request = await window.fetch(url);
    const page = this.pages[url];

    if (request.status === 200) {
      const html = await request.text();
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
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a:not(.nonNavLink)');
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const { href } = link;
        this.onChange(href);
      });
    });
  }
}

new App();
