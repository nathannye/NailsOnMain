import gsap from 'gsap';
import SplitText from 'gsap/src/SplitText.js';
import Component from 'classes/Component.js';

export default class Nav extends Component {
  constructor({ template }) {
    super({
      element: '.mobileMenuContainer',
      elements: {
        button: '.mobileMenuButton',
        links: '.mobileNavLink',
        menuLines: 'span.hamburgerLine',
        funny: '.mobileMenuContainer h3',
        phone: '.mobileNavContactItem img',
        desktopLinks: 'ul.navLinks li a',
      },
    });
    this.getActivePage(template);
  }

  create() {
    super.create();
    this.toggleMobileMenu();
  }

  toggleMobileMenu() {
    gsap.registerPlugin(SplitText);

    this.mobileMenuAnim = gsap.timeline({
      paused: true,
    });

    this.mobileMenuAnim.reversed(true);

    this.elements.button.onclick = (event) => {
      this.mobileMenuAnim.reversed()
        ? this.mobileMenuAnim.play()
        : this.mobileMenuAnim.reverse();
    };

    gsap.set(this.element, {
      autoAlpha: 0,
      display: 'none',
    });

    this.mobileMenuAnim
      .to(
        this.elements.button,
        {
          rotate: 90,
          ease: 'expo.inOut',
          duration: 0.5,
          y: this.elements.button.offsetWidth / 4,
          x: this.elements.button.offsetHeight / -2,
          transformOrigin: 'center center',
        },
        0
      )
      .from(
        this.elements.funny,
        {
          autoAlpha: 0,
          y: 4,
          duration: 0.3,
        },
        0.12
      )
      // animate the top one down 1/2 of .75rem
      .to(
        this.elements.menuLines[0],
        {
          y: 3.75,
          rotate: 45,
          transformOrigin: 'center center',
          duration: 0.6,
          delay: 0.1,
          ease: 'expo.inOut',
        },
        0
      )
      // aniamte the bottom one up 1/2 of .75rem
      .to(
        this.elements.menuLines[1],
        {
          y: -3.75,
          rotate: -45,
          transformOrigin: 'center center',
          duration: 0.6,
          delay: 0.1,
          ease: 'expo.inOut',
        },
        0
      )
      .to(
        this.element,
        {
          display: 'flex',
        },
        0
      )
      .to(
        this.element,
        {
          autoAlpha: 1,
          duration: 0.25,
        },
        0.02
      )
      .from(
        this.elements.phone,
        {
          autoAlpha: 0,
          x: 7,
          y: 18,
          rotateX: -35,
          transformOrigin: 'left center',
          ease: 'power2.out',
        },
        0.6
      );

    this.elements.links.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        this.mobileMenuAnim.reversed()
          ? this.mobileMenuAnim.play()
          : this.mobileMenuAnim.reverse();
      });

      link.split = new SplitText(link, {
        type: 'chars',
      });

      link.tl = gsap.timeline();

      link.tl.from(link.split.chars, {
        autoAlpha: 0,
        x: 7,
        y: 18,
        rotateX: -35,
        duration: 0.6,
        transformOrigin: 'left center',
        ease: 'power2.out',
        delay: index / 9,
        stagger: 0.025,
      });

      this.mobileMenuAnim.add(link.tl, 0.24);
    });
  }
  getActivePage(template) {
    // Match URLified string against urls of links
    this.elements.links.forEach((link) => {
      link.classList.remove('activePage');
      if (link.getAttribute('href') == template) {
        link.classList.add('activePage');
      }
    });
    this.elements.desktopLinks.forEach((link) => {
      link.classList.remove('activePage');
      if (link.getAttribute('href') == template) {
        link.classList.add('activePage');
      }
    });
  }
}
