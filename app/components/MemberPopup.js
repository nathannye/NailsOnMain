import Component from 'classes/Component.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import SplitText from 'gsap/src/SplitText.js';

export default class MemberPopup extends Component {
  constructor({ target }) {
    super({
      element: '.teamMemberInfoContainer',
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
    target.name = target.querySelector('h2');
    target.cover = target.querySelector('.teamMemberOverlayBacker');
    target.content = target.querySelector('.teamMemberInfoPopup');
    target.close = target.querySelector('button.closeInfoPopup');
    if (target.tl) {
      target.tl.play();
      target.close.onclick = () => {
        target.tl.reverse();
      };
    } else {
      target.tl = gsap.timeline({});

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
              target,
              {
                duration: 0.5,
                opacity: 1,
              },
              0.04
            )
            .to(
              target.content,
              {
                opacity: 1,
                duration: 0.4,
                y: 0,
                ease: 'power2.out',
              },
              0.1
            )
            .to(
              target.cover,
              {
                opacity: 0.75,
                duration: 0.3,
                ease: 'power2.inOut',
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
              target,
              {
                duration: 0.5,
                opacity: 1,
              },
              0.04
            )
            .to(
              target.content,
              {
                opacity: 1,
                duration: 0.4,
                y: 0,
                ease: 'power2.out',
              },
              0.1
            )
            .to(
              target.cover,
              {
                opacity: 0.75,
                duration: 0.3,
                ease: 'power2.inOut',
              },
              0
            );
        },
      });
    }

    target.close.onclick = () => {
      target.tl.reversed() ? target.tl.play() : target.tl.reverse();
    };
  }

  animateOut() {}
}
