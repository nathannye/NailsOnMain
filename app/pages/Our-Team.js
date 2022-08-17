import gsap from 'gsap';
import SplitText from 'gsap/src/SplitText.js';
import Page from 'classes/Page.js';
import MemberPopup from 'components/MemberPopup.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';

export default class OurTeam extends Page {
  constructor() {
    super({
      id: 'our-team',
      element: '#ourTeamWrapper',
      elements: {
        heading: 'header#teamHeader .headingContainer h1',
        awesomeHeading: 'header#teamHeader .headingContainer h2',
        people: '.teamMemberContainer',
        peopleWithInfo: '.teamMemberContainer.hasInfo',
        teamMemberInfoContainer: '.teamMemberInfoPopup',
        videos: 'videos',
      },
    });
  }

  create() {
    super.create();
    this.feedTeamMemberData();
    this.animatePeopleVideos();
  }

  feedTeamMemberData() {
    if (this.elements.peopleWithInfo instanceof Array) {
      this.elements.peopleWithInfo.forEach((person, index) => {
        person.popup = new MemberPopup({
          target: this.elements.teamMemberInfoContainer.item(index),
        });

        person.onclick = () => {
          person.popup.togglePersonPopup({
            target: this.elements.teamMemberInfoContainer.item(index),
          });
        };
      });
    } else {
      let person = new MemberPopup({
        target: this.elements.teamMemberInfoContainer,
      });
      this.elements.peopleWithInfo.onclick = () => {
        person.togglePersonPopup({
          target: this.elements.teamMemberInfoContainer,
        });
      };
    }
  }

  animatePeopleVideos() {
    ScrollTrigger.matchMedia({
      // Below 768, apply this (mobile only)
      '(max-width: 768px)': () => { },
      // Above 769, desktop only
      '(min-width: 769px)': () => {
        this.elements.people.forEach((person) => {
          person.video = person.querySelector('video');
          person.onmouseover = () => {
            if (person.video.paused) {
              person.video.currentTime = 0;
              person.video.play();
              setTimeout(() => {
                person.video.pause();
              }, 1000 * (person.video.duration - 0.2));
            }
          };
        });
      },
    });
  }

  animateIn() {
    const tl = gsap.timeline({
      delay: 3,
    });
    const headingSplit = new SplitText(this.elements.heading, {
      type: 'words',
    });

    const awesomeSplit = new SplitText(this.elements.awesomeHeading, {
      type: 'chars',
    });

    awesomeSplit.anim = gsap.from(awesomeSplit.chars, {
      y: -10,
      rotateX: -30,
      ease: 'power3.inOut',
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.03,
    });

    tl.add(awesomeSplit.anim, 0.4);

    headingSplit.words.forEach((word, index) => {
      word.split = new SplitText(word, {
        type: 'chars',
      });
      if (index % 2 == 0) {
        let tween = gsap.from(
          word.split.chars,
          {
            autoAlpha: 0,
            x: -17,
            y: 24,
            rotateX: -35,
            duration: 0.75,
            transformOrigin: 'left center',
            ease: 'power2.out',
            delay: index / 9,
            stagger: 0.075,
          },
          0
        );
        tl.add(tween, 0);
      } else if (index % 2 == 1) {
        // if its odd (1,3,5...), create an up and right
        let tween = gsap.from(
          word.split.chars,
          {
            autoAlpha: 0,
            x: 17,
            y: 24,
            rotateX: -35,
            duration: 0.75,
            transformOrigin: 'left center',
            ease: 'power2.out',
            delay: index / 9,
            stagger: 0.075,
          },
          0
        );
        tl.add(tween, 0);
      }
    });
  }
}
