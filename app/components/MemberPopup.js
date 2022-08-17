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
    target.name = target.querySelector('h2');
    target.name.split = new SplitText(target.name, {
      type: 'chars',
    });

    target.tl = gsap.timeline({
      // paused: true,
      // onComplete: () => {
      //   target.tl.reversed(true);
      // },
    });

    // console.log(target.tl.reversed());

    // target.tl.reversed() ? target.tl.reverse() : target.tl.play();

    target.tl
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
          duration: 0.85,
          stagger: 0.045,
          autoAlpha: 0,
          ease: 'expo.out',
        },
        0.45
      );
  }

  animateOut() {}
}
