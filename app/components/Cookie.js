import Component from '../classes/Component.js';
import gsap from 'gsap';
import Physics2DPlugin from 'gsap/src/Physics2DPlugin.js';

export default class Cookie extends Component {
  constructor() {
    super({
      element: '.cookieNotificationContainer',
      elements: {
        acceptExplodeContainer: '.acceptExplosionContainer',
        denyExplodeContainer: '.denyExplosionContainer',
      },
    });
  }

  create() {
    super.create();
    this.registerPlugins();
    this.acceptExplodeAnim();
    this.denyExplodeAnim();
  }

  registerPlugins() {
    gsap.registerPlugin(Physics2DPlugin);
  }

  acceptExplodeAnim() {
    const cookies = [];
    for (let i = 0; i < 22; i++) {
      let cookie = document.createElement('p');
      cookie.innerHTML = '🍪';
      cookie.classList.add('twemojiReplace');
      cookies.push(cookie);
      this.elements.acceptExplodeContainer.appendChild(cookie);
    }
    gsap.set(cookies, {
      x: 0,
      y: 0,
    });
    let tl = gsap.timeline();
    tl.to(cookies, {
      duration: 1.25,
      paused: true,
      physics2D: {
        velocity: 'random(120,280)',
        angle: 'random(-33, 42)',
        gravity: 100,
      },
      delay: 'random(0,.2)',
    });
  }
  denyExplodeAnim() {
    const sadFaces = [];
    gsap.set(sadFaces, {
      x: 0,
      y: 0,
    });
    for (let i = 0; i < 22; i++) {
      let sadFace = document.createElement('p');
      sadFace.innerHTML = '😔';
      sadFace.classList.add('twemojiReplace');
      sadFaces.push(sadFace);
      this.elements.denyExplodeContainer.appendChild(sadFace);
    }
    let tl = gsap.timeline();
    tl.to(sadFaces, {
      duration: 1.25,
      paused: true,
      physics2D: {
        velocity: 'random(120,280)',
        angle: 'random(-33, 42)',
        gravity: 100,
      },
      delay: 'random(0,.2)',
    });
  }
}
