import Home from 'pages/home.js';
import About from 'pages/about.js';
import OurTeam from 'pages/our-team.js';
import Services from 'pages/services.js';
import Preloader from './components/Preloader.js';

class App {
  constructor() {
    this.createContent();
    this.createPreloader();
    this.createPages();
    this.addLinkListeners();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded);
  }

  onPreloaded() {
    console.log('loaded');
  }
 
  createContent() {
    this.content = document.querySelector('#content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      'our-team': new OurTeam(),
      services: new Services(),
    };
    this.page = this.pages[this.template];
    this.page.create();
    this.page.animateIn();
  }

  async onChange(url) {
    await this.page.animateOut();
    const request = await window.fetch(url);
    window.scrollTo({ top: 0 });
    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');

      div.innerHTML = html;

      const divContent = div.querySelector('#content');
      this.template = divContent.getAttribute('data-template');

      this.content.setAttribute(
        'data-template',
        divContent.getAttribute('data-template')
      );

      this.content.innerHTML = divContent.innerHTML;
      this.page = this.pages[this.template];
      this.page.create();
      this.page.animateIn();
      this.addLinkListeners();
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a:not(.nonNavLink)');
    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;
        this.onChange(href);
      };
    });
  }
}

new App();
