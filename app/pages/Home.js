import Page from 'classes/Page.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger.js';
import Draggable from 'gsap/Draggable.js';
import InertiaPlugin from 'gsap/InertiaPlugin.js';
import SplitText from 'gsap/src/SplitText.js';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '#homeWrapper',
      elements: {
        marqueeRows: '.marqueeRow',
        cursor: '.testimonialDraggerCursor',
        arrowLeft: '.dragArrow.left',
        parallaxImage: '.parallax img',
        parallaxContainer: '.parallax',
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
        top: 'header .topCurve, main',
        header: '.headerContentWrapper',
        curve: '.topCurve',
        headerImages: '.imageContainerHeader',
        nailsHead: 'header.homeHeader .homeSplitTop .textContainer h1',
        beautyByHead: 'header.homeHeader .homeSplitTop h2',
        onHead: 'header.homeHeader .bottomSplitLeft h1',
        mainHead: 'header.homeHeader .bottomSplitRight h1',
        estHead: 'header.homeHeader .bottomSplitRight h3',
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
    this.createParallaxImages();
    this.parallaxHeader();
  }

  animateIn() {
    const headerTextLeft = [
      this.elements.beautyByHead,
      this.elements.nailsHead,
      this.elements.onHead,
    ];

    const headerTextRight = [this.elements.mainHead, this.elements.estHead];

    const tl = gsap.timeline({
      delay: 0.6,
      // onComplete: () => {
      //   split.revert();
      // },
    });

    headerTextLeft.forEach((text, index) => {
      text.split = new SplitText(text, {
        type: 'chars',
      });

      text.tween = gsap.from(text.split.chars, {
        autoAlpha: 0,
        xPercent: -32,
        yPercent: 64,
        rotateX: -25,
        duration: 0.65,
        transformOrigin: 'left center',
        ease: 'power2.out',
        delay: index / 4,
        stagger: 0.04,
      });

      tl.add(text.tween, 0);
    });

    headerTextRight.forEach((text, index) => {
      text.split = new SplitText(text, {
        type: 'chars',
      });

      text.tween = gsap.from(text.split.chars, {
        autoAlpha: 0,
        xPercent: 32,
        yPercent: 64,
        rotateX: -25,
        duration: 0.65,
        transformOrigin: 'left center',
        ease: 'power2.out',
        delay: index / 4,
        stagger: -0.04,
      });

      tl.add(text.tween, 0);
    });

    tl.from(
      this.elements.headerImages,
      {
        yPercent: 10,
        autoAlpha: 0,
        ease: 'expo.out',
        duration: 1.1,
        stagger: 0.17,
      },
      0.3
    );
  }
  getActiveDate() {
    var today = new Date();
    today = today.toLocaleString('en-US', { weekday: 'long' });
    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    this.elements.dateEntry.forEach((date, i) => {
      // Match name against array of days in the order we want, otherwise Sunday is 0 and it no work
      if (i == days.indexOf(today)) {
        date.classList.add('todaysTheDay');
      }
    });
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

  createParallaxImages() {
    gsap.registerPlugin(ScrollTrigger);

    this.elements.parallaxImage.forEach((el, i) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          start: 'top bottom',
          end: 'bottom top',
          trigger: this.elements.parallaxContainer[i],
          scrub: true,
        },
      });
      tl.fromTo(
        el,
        { yPercent: 0, scale: 1.1 },
        { yPercent: -20, scale: 1 },
        0
      );
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
        gsap.to(this.elements.cursorCircle, {
          scale: 0.85,
          ease: 'expo.inOut',
          duration: 0.25,
        });
      },
      onRelease: () => {
        gsap.to(this.elements.cursorCircle, {
          scale: 1,
          ease: 'expo.inOut',
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
}
