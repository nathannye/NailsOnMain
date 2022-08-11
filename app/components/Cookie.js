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
        buttons: '.cookieConsentOptions > *',
        cookie: '.cookieTextContainer img',
        para: 'p.cookieParagraph',
      },
    });
  }

  create() {
    super.create();
    this.registerPlugins();
    this.acceptExplodeAnim();
    this.denyExplodeAnim();
    this.animateIn();
  }

  registerPlugins() {
    gsap.registerPlugin(Physics2DPlugin);
  }

  animateIn() {
    let tl = gsap.timeline({
      delay: 1.5,
    });
    const dur = 0.65;
    const ease = 'elastic.out(.75, 0.75)';
    tl.from(
      this.element,
      {
        y: 15,
        duration: dur,
        autoAlpha: 0,
        ease: ease,
      },
      0
    )
      .from(
        this.elements.para,
        {
          y: 7,
          duration: dur,
          autoAlpha: 0,
          stagger: 0.15,
          ease: ease,
        },
        0.05
      )
      .from(
        this.elements.cookie,
        {
          y: 7,
          duration: dur,
          autoAlpha: 0,
          ease: ease,
        },
        0.09
      )
      .from(
        this.elements.buttons,
        {
          y: 7,
          duration: dur,
          autoAlpha: 0,
          stagger: 0.15,
          ease: ease,
        },
        0.15
      );
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
