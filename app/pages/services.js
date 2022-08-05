import gsap from 'gsap';
import Draggable from 'gsap/Draggable.js';
import InertiaPlugin from 'gsap/InertiaPlugin.js';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import SplitText from 'gsap/SplitText.js';
import _, { drop } from 'lodash';
import Page from '../classes/Page.js';

export default class Services extends Page {
  constructor() {
    super({
      id: 'services',
      element: '#servicesWrapper',
      elements: {
        service: '.serviceEntry',
        sliderContainer: '.serviceImagesSliderContainer',
        slider: '.serviceImagesSlider',
        images: '.serviceImages',
        sliderButtons: '.desktopImageIndicator',
      },
    });
  }

  create() {
    super.create();
    this.createDropdowns();
    this.createSliders();
  }

  createDropdowns() {
    gsap.registerPlugin(SplitText);
    console.log('drops');
    const dur = 0.7;
    const ease = 'power2.out';
    this.elements.service.forEach((dropdown) => {
      dropdown.btn = dropdown.querySelector('button.dropdown');
      dropdown.info = dropdown.querySelector('.serviceDetails');
      dropdown.details = dropdown.querySelectorAll('.serviceDescription');
      // dropdown.thumbnail = dropdown.querySelector('img.serviceImageThumbnail');
      // dropdown.imgContainer = dropdown.querySelector('.serviceImagesSlider');

      // gsap.set(dropdown.imgContainer, {
      //   clipPath: 'circle(0% at 0% 0%)',
      // });

      let h = dropdown.info.offsetHeight;
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
          dropdown.btn,
          {
            rotate: 180,
            duration: 0.35,
            ease: 'expo.inOut',
          },
          0
        );
      // .to(
      //   dropdown.thumbnail,
      //   {
      //     duration: 0.75,
      //     ease: 'expo.inOut',
      //     yPercent: 100,
      //     autoAlpha: 0,
      //     rotate: 25,
      //   },
      //   0.25
      // )
      // .to(
      //   dropdown.imgContainer,
      //   {
      //     clipPath: 'circle(90% at 0%,0%)',
      //     duration: 0.75,
      //     ease: 'expo.inOut',
      //   },
      //   0.25
      // );
      // for any entry underneath a service
      dropdown.details.forEach((d, i) => {
        d.heading = d.querySelector('h3');
        d.para = d.querySelector('p');
        d.prices = d.querySelectorAll('.priceEntry');
        d.split = new SplitText(d.para, {
          type: 'lines',
        });

        d.tl = gsap.timeline({
          delay: 0.2 + i / 4,
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
            d.split.lines,
            {
              y: 8,
              autoAlpha: 0,
              duration: dur,
              ease: ease,
              stagger: 0.075,
            },
            0.08
          )
          .from(
            d.prices,
            {
              autoAlpha: 0,
              duration: dur,
              ease: 'none',
              stagger: 0.1,
            },
            '<'
          );

        dropdown.tl.add(d.tl, 0);
      });

      dropdown.tl.reversed(true);
      dropdown.btn.onclick = () => {
        dropdown.tl.reversed() ? dropdown.tl.play() : dropdown.tl.reverse();
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
          Draggable.create(s.querySelector('.serviceImagesSlider'), {
            bounds: s.querySelector('.serviceImagesSliderContainer'),
            type: 'x',
            inertia: true,
            edgeResistance: 0.4,
          });
        });
      },
      '(min-width: 769px)': () => {
        slider.forEach((s, i) => {
          s.img = s.querySelectorAll('figure');
          s.btn = s.querySelectorAll('button.indicatorStrip');
          s.img[0].classList.add('active');

          s.btn.forEach((btn, index) => {
            btn.onclick = () => {
              s.img.forEach((img, i) => {
                img.classList.remove('active');
              });

              s.img[index].classList.add('active');
            };
          });

          // Match clicked position, to position in img array
        });
      },
    });
  }
}
