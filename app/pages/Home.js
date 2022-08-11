import Page from '../classes/Page.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Draggable from 'gsap/Draggable.js';
import InertiaPlugin from 'gsap/InertiaPlugin.js';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '#homeWrapper',
      elements: {
        marqueeRows: '.marqueeRow',
        cursor: '.testimonialDraggerCursor',
        arrowLeft: '.dragArrow.left',
        cursorCircle: '.dragInstructionCircle',
        arrowRight: '.dragArrow.right',
        testimonials: '#testimonials',
        allReviews: '.testimonialEntryContainer',
        marqueeRows: 'span.marqueeRow',
        reviewerNames: '.testimonialTextContainer h3',
        reviewerInitials: '.testimonialInitialsContainer p',
        marqueeContainer: '#servicesMarquee',
        nav: 'nav.desktopNav',
        testimonialEmoji: '.testimonialEmoji p',
        testimonialEmojiContainer: '.testimonialEmoji',
        mobileNav: '.mobileMenuContainer',
        nav: 'nav.desktopNav',
        mobileNav: '.mobileMenuContainer',
        reviewSliderInner: '#testimonialSlider',
        reviewSliderContainer: '#testimonialSliderContainer',
        dates: '.scheduleEntry > h4',
        dateEntry: '.scheduleEntry',
        headerImages: 'header.homeHeader img',
        headerLargeText:
          'header.homeHeader .smallTextContainer h2, header.homeHeader .nailsOnText h1, .homeSplitRight h1',
      },
    });
  }

  create() {
    super.create();
    this.getActiveDate();
    this.createTestimonialSlider();
    this.createMarquee();
    this.createCursor();
    this.populateReviewInitials();
  }

  getActiveDate() {
    const dates = document.querySelectorAll('.scheduleEntry');
    const today = new Date().getDay();
    dates.forEach((date, i) => {
      if (i + 1 == today) {
        date.classList.add('todaysTheDay');
      }
    });
  }

  createTestimonialSlider() {
    gsap.registerPlugin(Draggable, InertiaPlugin);
    // Set thing that stores positon of the cricle in crusor
    let xTo = gsap.utils.pipe(
      gsap.utils.clamp(-12, 12),
      gsap.quickTo(this.elements.cursorCircle, 'x', {
        duration: 0.4,
        ease: 'circ.out',
      })
    );

    const tracker = InertiaPlugin.track(this.elements.cursor, 'x')[0];
    Draggable.create('#testimonialSlider', {
      type: 'x',
      inertia: true,
      edgeResistance: 0.65,
      bounds: this.elements.reviewSliderContainer,
      onPress: () => {
        gsap.to(this.elements.allReviews, {
          scale: 0.97,
          ease: 'expo.inOut',
          duration: 0.4,
        });
      },
      onRelease: () => {
        gsap.to(this.elements.allReviews, {
          scale: 1,
          ease: 'circ.inOut',
          duration: 0.25,
        });
      },
      onDrag: () => {
        // set it back when you start dragging
        xTo(0);
        let velocityX = tracker.get('x');
        let maxVelocity = window.innerWidth;
        let minVelocity = maxVelocity * -1;
        let v = gsap.utils.mapRange(minVelocity, maxVelocity, -1, 1, velocityX);
        xTo(v * 10);
      },
      onDragEnd: () => {
        setTimeout(() => {
          gsap.quickTo(this.elements.cursorCircle, 'x', {
            x: 0,
          });
        });
        xTo(v * 10);
      },
      onDragEnd: () => {
        // AND WHEN YOU STOP, DO NOT MOVE THIS SHIT
        xTo(0);
      },
    });
  }

  createMarquee() {
    gsap.registerPlugin(ScrollTrigger);

    this.tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.elements.marqueeContainer,
        scrub: true,
        start: 'top bottom',
        end: 'bottom+=20% top',
      },
    });

    this.elements.marqueeRows.forEach((row, i) => {
      // if divisible by 2 = 0, its even, add an anim to move right
      if (i % 2 == 0) {
        row.anim = gsap.to(
          row,
          {
            xPercent: -18 + i * 3,
            ease: 'none',
          },
          0
        );

        this.tl.add(row.anim, 0);
      } else {
        // add a left anim if its odd
        row.anim = gsap.fromTo(
          row,
          { xPercent: -25 + i * 4 },

          { xPercent: 0, ease: 'none' }
        );
        this.tl.add(row.anim, 0);
      }
    });
  }
  createCursor() {
    gsap.set(this.elements.cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.5,
      autoAlpha: 0,
    });
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.19;

    const xSet = gsap.quickSetter(this.elements.cursor, 'x', 'px');
    const ySet = gsap.quickSetter(this.elements.cursor, 'y', 'px');

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    let tl = gsap.timeline({
      paused: true,
    });

    tl.to(
      this.elements.cursor,
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'elastic.out(1, .5)',
      },
      0
    )
      .from(
        this.elements.arrowLeft,
        {
          autoAlpha: 0,
          x: 7,
          ease: 'elastic.out(1, 0.4)',
          duration: 1,
        },
        0.11
      )
      .from(
        this.elements.arrowRight,
        {
          autoAlpha: 0,
          x: -7,
          ease: 'elastic.out(1, 0.4)',
          duration: 1,
        },
        0.11
      );

    this.elements.testimonials.addEventListener('mouseenter', (event) => {
      tl.play();
    });

    this.elements.testimonials.addEventListener('mouseleave', (event) => {
      tl.reverse();
    });

    gsap.ticker.add(() => {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  }

  populateReviewInitials() {
    this.elements.reviewerNames.forEach((name, i) => {
      let words = name.innerHTML.split(' ');

      if (words.length === 2) {
        name.initials = [words[0].charAt(0), words[1].charAt(0)];
        this.elements.reviewerInitials[
          i
        ].innerHTML = `${name.initials[0]}${name.initials[1]}`;
      } else if (words.length === 1) {
        name.initials = words[0].chartAt(0);
        this.elements.reviewerInitials[i].innerHTML = name.initials;
      }
    });
  }

  destroy() {
    super.destroy();
  }

  animateIn() {
    let tl = gsap.timeline();

    tl.from(this.elements.headerImages, {
      y: 90,
      autoAlpha: 0,
      ease: 'expo.inOut',
      duration: 1,
      stagger: 0.1,
    }).from(
      this.elements.headerLargeText,
      {
        autoAlpha: 0,
      },
      0.1
    );
  }
}
