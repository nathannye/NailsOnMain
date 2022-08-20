import Component from 'classes/Component.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import SplitText from 'gsap/src/SplitText.js';

export default class MemberPopup extends Component {
  constructor({ target }) {
    super({
      element: '.teamMemberInfoPopup',
      elements: {
        container: '.teamMemberInfoPopup',
        overlay: '.teamMemberOverlayBacker',
        close: 'button.closeInfoPopup',
        name: '.teamMemberContent h2',
        memoji: '.teamMemberContent .memojiContainer',
        title: '.teamMemberContent h3',
        bio: '.teamMemberContent',
        socials: '.memberSocialContainer a.solidButton',
      },
    });
  }

  create() {
    super.create();
  }

  togglePersonPopup(target) {
    target = target.target;
    target.cover = document.querySelector('.teamMemberOverlayBacker');
    console.log(target.cover);
    target.name = target.querySelector('h2');
    target.close = target.querySelector('button.closeInfoPopup');
    if (target.tl) {
      console.log('has tl');
      target.tl.play();
      target.close.onclick = () => {
        target.tl.reverse();
      };
    } else {
      target.tl = gsap.timeline({});
      target.name.split = new SplitText(target.name, {
        type: 'chars',
      });

      target.close.onclick = () => {
        target.tl.reverse();
      };

      target.cover.onclick = () => {
        target.tl.reverse();
      };

      ScrollTrigger.matchMedia({
        // Below 768, apply this (mobile only)
        '(max-width: 768px)': () => {
          target.tl
            .to(
              target,
              {
                display: 'block',
              },
              0
            )
            .to(
              target.cover,
              {
                opacity: 0.6,
                display: 'block',
                duration: 0.3,
                ease: 'power2.inOut',
              },
              0
            )
            .to(
              target,
              {
                opacity: 1,
                y: '0',
                duration: 0.65,
                ease: 'expo.out',
              },
              0
            )
            .from(
              target.name.split.chars,
              {
                y: 24,
                x: -12,
                duration: 0.65,
                stagger: 0.045,
                autoAlpha: 0,
                ease: 'expo.out',
              },
              0
            );
        },
        // above 769, desktop/tablet
        '(min-width: 769px)': () => {
          target.tl
            .to(
              target,
              {
                display: 'block',
              },
              0
            )
            .to(
              target.cover,
              {
                opacity: 0.6,
                display: 'block',
                duration: 0.3,
                ease: 'power2.inOut',
              },
              0
            )
            .to(
              target,
              {
                opacity: 1,
                y: '0',
                duration: 0.65,
                ease: 'expo.inOut',
              },
              0
            )
            .to(
              target,
              {
                opacity: 1,
                x: '0',
                duration: 0.65,
                ease: 'expo.inOut',
              },
              0
            )
            .from(
              target.name.split.chars,
              {
                y: 24,
                x: -12,
                duration: 0.65,
                stagger: 0.045,
                autoAlpha: 0,
                ease: 'expo.out',
              },
              0
            );
        },
      });
    }

    target.close.onclick = () => {
      target.tl.reversed() ? target.tl.play() : target.tl.reverse();
      console.log(target.tl.reversed());
    };
  }

  animateOut() {}
}
