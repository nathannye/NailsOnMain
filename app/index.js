import Home from 'pages/home.js';
import About from 'pages/about.js';
import OurTeam from 'pages/our-team.js';
import Services from 'pages/services.js';

class App {
  constructor() {
    this.createContent();
    this.createPages();
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

    console.log(this.page);
  }
}

new App();
