import Page from 'classes/Page.js';
import mapboxgl from 'mapbox-gl';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText.js';

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '#aboutWrapper',
      elements: {
        map: '#mapboxContainer',
        heading: '#aboutHeader .headingContainer h1',
        popupContainer: '.teamMemberInfoPopup',
        closeButton: 'button.closeInfoPopup',
        overlay: '.teamMemberOverlayBacker',
        person: '.teamMemberContainer',
        top: 'header .topCurve, main',
        header: '.headerContentWrapper',
        curve: '.topCurve',
      },
    });
  }

  create() {
    super.create();
    this.parallaxHeader();
    this.createMap();
  }

  parallaxHeader() {
    let tl = gsap.timeline({
      scrollTrigger: {
        start: 'top bottom',
        end: 'bottom top',
        trigger: this.elements.curve,
        scrub: true,
      },
    });
    tl.to(
      this.elements.top,
      {
        y: -220,
      },
      0
    );
  }

  animateIn() {
    const split = new SplitText(this.elements.heading, {
      type: 'words, lines',
    });
    const tl = gsap.timeline({
      onComplete: () => {
        split.revert();
      },
    });

    split.lines.forEach((line, index) => {
      line.split = new SplitText(line, {
        type: 'chars',
      });
      // If its even (0,2,4), create an up and left animation
      if (index % 2 == 0) {
        let tween = gsap.from(
          line.split.chars,
          {
            autoAlpha: 0,
            x: -17,
            y: 24,
            rotateX: -35,
            duration: 0.7,
            transformOrigin: 'left center',
            ease: 'power2.out',
            delay: index / 9,
            stagger: 0.045,
          },
          0
        );
        tl.add(tween, 0);
      } else if (index % 2 == 1) {
        // if its odd (1,3,5...), create an up and right
        let tween = gsap.from(
          line.split.chars,
          {
            autoAlpha: 0,
            x: 17,
            y: 24,
            rotateX: -35,
            duration: 0.8,
            transformOrigin: 'left center',
            ease: 'power2.out',
            delay: index / 9,
            stagger: 0.025,
          },
          0
        );
        tl.add(tween, 0);
      }
    });
  }

  createMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibnllLTExIiwiYSI6ImNsMG9zeGRuOTE4MHMza3Rrcm5qcjVoZzgifQ.gB3lktc24CQYcAauqQ40Fw';
    const map = new mapboxgl.Map({
      container: this.elements.map,
      style: 'mapbox://styles/nye-11/cl5ganty8002b15o5xfrcw9o8',
      center: [-83.41974, 42.72242],
      zoom: 17,
      bearing: -135,
      pitch: 52,
    });
    map.addControl(new mapboxgl.NavigationControl());
  }
}
