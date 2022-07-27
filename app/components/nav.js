import gsap from 'gsap';
import Component from '../classes/Component.js';

export default class Nav extends Component {
  constructor() {
    super({
      elements: {
        button: '.mobileMenuButton',
      },
    });
    this.toggleMobileMenu();
  }

  toggleMobileMenu() {
    this.mobileMenuAnim = gsap.timeline({
      paused: true,
    });

    this.mobileMenuAnim.reversed(true);

    this.elements.button.onclick = (event) => {
      this.mobileMenuAnim.reversed()
        ? this.mobileMenuAnim.play()
        : this.mobileMenuAnim.reverse();
    };

    this.mobileMenuAnim.to(this.elements.button, {
      rotate: 90,
      ease: 'expo.inOut',
      duration: 0.45,
      y: this.elements.button.offsetWidth / 4,
      x: this.elements.button.offsetHeight / -2,
      transformOrigin: 'center center',
    });
  }
}
