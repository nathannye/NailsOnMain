import gsap from 'gsap';
import Draggable from 'gsap/Draggable.js';
import InertiaPlugin from 'gsap/InertiaPlugin.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import SplitText from 'gsap/SplitText.js';
import _, { drop } from 'lodash';
import Page from 'classes/Page.js';

export default class Services extends Page {
  constructor() {
    super({
      id: 'services',
      element: '#servicesWrapper',
      elements: {
        service: '.serviceEntry',
        sliderContainer: '.serviceImagesSliderContainer',
        slider: '.serviceImagesSlider',
        heading: 'header.servicesHeader .headingContainer h1',
        images: '.serviceImages',
        sliderButtons: '.desktopImageIndicator',
        top: 'header .topCurve, main',
        header: '.headerContentWrapper',
        curve: '.topCurve',
      },
    });
  }

  create() {
    super.create();
    this.createDropdowns();
    this.createSliders();
    this.parallaxHeader();
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

  createDropdowns() {
    gsap.registerPlugin(SplitText, ScrollTrigger);
    const dur = 0.5;
    const ease = 'power2.out';
    this.elements.service.forEach((dropdown) => {
      dropdown.clicker = dropdown.querySelector('button.serviceSmallTop');
      dropdown.arrow = dropdown.querySelector('div.hasArrow');
      dropdown.info = dropdown.querySelector('.serviceDetails');
      dropdown.details = dropdown.querySelectorAll('.serviceDescription');
      let h = dropdown.info.offsetHeight;

      window.onresize = () => {
        h = dropdown.info.offsetHeight;
      };

      gsap.set(dropdown.info, {
        height: 0,
      });

      dropdown.tl = gsap.timeline({
        paused: true,
      });

      dropdown.tl
        .to(
          dropdown.info,
          {
            height: h,
            duration: 0.62,
            ease: 'expo.inOut',
          },
          0
        )
        .to(
          dropdown.arrow,
          {
            rotate: 180,
            duration: 0.35,
            ease: 'expo.inOut',
          },
          0
        );
      // for any entry underneath a service
      dropdown.details.forEach((d, i) => {
        d.heading = d.querySelector('h3');
        d.para = d.querySelector('p');
        d.prices = d.querySelectorAll('.priceEntry');

        d.tl = gsap.timeline({
          delay: 0.15 + i / 8,
          onComplete: () => {
            ScrollTrigger.refresh();
          },
          onReverseComplete: () => {
            ScrollTrigger.refresh();
          },
        });

        d.tl
          .from(
            d.heading,
            {
              autoAlpha: 0,
              duration: dur,
              ease: ease,
            },
            0
          )
          .from(
            d.para,
            {
              y: 8,
              autoAlpha: 0,
              duration: dur,
              ease: ease,
            },
            0.08
          )
          .from(
            d.prices,
            {
              autoAlpha: 0,
              duration: dur,
              ease: 'none',
              stagger: 0.05,
            },
            '<'
          );
        dropdown.tl.add(d.tl, 0);
      });

      dropdown.tl.reversed(true);
      dropdown.clicker.onclick = () => {
        dropdown.tl.reversed()
          ? dropdown.tl.play()
          : dropdown.tl.timeScale(1.5).reverse();
      };
    });
  }

  createSliders() {
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
    const slider = this.elements.images;
    ScrollTrigger.matchMedia({
      // Below 768, apply this (mobile only)
      '(max-width: 768px)': () => {
        slider.forEach((s) => {
          this.drag = Draggable.create(
            s.querySelector('.serviceImagesSlider'),
            {
              bounds: s.querySelector('.serviceImagesSliderContainer'),
              type: 'x',
              inertia: true,
              edgeResistance: 0.65,
            }
          );
        });
      },
      '(min-width: 768px)': () => {
        slider.forEach((s, i) => {
          s.img = s.querySelectorAll('figure');
          s.btn = s.querySelectorAll('button.indicatorStrip');
          s.img[0].classList.add('active');
          s.btn[0].classList.add('active');
          s.btn.forEach((btn, index) => {
            btn.onclick = () => {
              s.img.forEach((img, i) => {
                img.classList.remove('active');
              });
              s.btn.forEach((button, i) => {
                button.classList.remove('active');
              });
              s.btn[index].classList.add('active');
              s.img[index].classList.add('active');
            };
          });

          // Match clicked position, to position in img array
        });
      },
    });
  }
}
