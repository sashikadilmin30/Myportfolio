window.addEventListener('load', () => {
  /* ===== PRELOADER ===== */
  const preloader = document.getElementById('preloader');
  
  // Hide preloader after a slight delay to ensure smooth transition
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
        if (window.initScrollReveal) window.initScrollReveal();
        if (window.initTypewriter) window.initTypewriter();
      }, 600);
    }
  }, 500); // reduced timeout for better UX
});

document.addEventListener('DOMContentLoaded', () => {

  /* ===== CUSTOM CURSOR ===== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px)').matches;

  if (canUseCustomCursor && cursorDot && cursorOutline) {
    let cursorX = 0;
    let cursorY = 0;
    let dotScale = 1;

    const renderCursor = () => {
      cursorDot.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(${dotScale})`;
      cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    };

    window.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      renderCursor();
    });

    // Add hover effect to links and buttons
    const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .timeline-card, .about-card, .skills-block, .tech-card, .oss-card, .achievement-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'rgba(6, 182, 212, 0.8)';
        dotScale = 1.5;
        renderCursor();
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '36px';
        cursorOutline.style.height = '36px';
        cursorOutline.style.borderColor = 'rgba(124, 58, 237, 0.6)';
        dotScale = 1;
        renderCursor();
      });
    });
  }

  /* ===== NAVBAR SCRIPTS ===== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('scrolled'); // Always keep scrolled style for better visibility
    }
  });

  // Always apply scrolled style immediately
  if (navbar) navbar.classList.add('scrolled');

  // Mobile Menu Toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close Mobile Menu on Link Click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (hamburger) {
          const spans = hamburger.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  });

  /* ===== TYPEWRITER EFFECT ===== */
  const roles = [
    "Statistics & Computer Science Undergraduate",
    "Full-Stack Developer",
    "Computer Vision Enthusiast",
    "Research Leader",
    "AI & Data Analytics Enthusiast"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedSpan = document.getElementById("typed");
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;

  function initTypewriter() {
    if (!typedSpan) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = newTextDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(initTypewriter, typeSpeed);
  }
  window.initTypewriter = initTypewriter;

  /* ===== SCROLL REVEAL ===== */
  const reveals = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-bar-fill');

  function initScrollReveal() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    // General Reveal
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('visible');
      }
    });

    // Skill Bars Animation
    skillFills.forEach((fill) => {
      const elementTop = fill.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      }
    });
  }
  window.initScrollReveal = initScrollReveal;

  // Initial Check for Scroll Reveal (after preloader)
  // window.addEventListener('scroll', initScrollReveal); is already attached below

  window.addEventListener('scroll', initScrollReveal);

  /* ===== PROJECT GALLERIES ===== */
  const galleryConfigs = [
    {
      root: 'career',
      projectName: 'AI-Based Career Guidance System',
      slides: [
        { label: 'Login Page', src: 'images/career guidance/C1.png' },
        
        { label: 'Dashboard', src: 'images/career guidance/M2.png' },
        
      ]
    },
    
    {
      root: 'road',
      projectName: 'Autonomous Road Understanding System',
      slides: [
        { label: 'Original Input Frame', src: 'images/image-processing/a1.png' },
        { label: 'Region of Interest Selection', src: 'images/image-processing/a2.png' },
        { label: 'Edge Detection Result', src: 'images/image-processing/a3.png' },
        { label: 'Lane Detection Result', src: 'images/image-processing/a4.png' },
        { label: 'Road Curvature Estimation', src: 'images/image-processing/a5.png' },
        { label: 'Vehicle Detection Result', src: 'images/image-processing/a6.png' },
        { label: 'Pedestrian Detection Result', src: 'images/image-processing/a7.png' },
        { label: 'Traffic Sign Detection Result', src: 'images/image-processing/a8.png' },
        
        
      ]
    },

    {
      root: 'retail',
      projectName: 'Retail Sales Intelligence Dashboard',
      slides: [
        { label: 'Dashboard Overview', src: 'images/Power BI/d1.png' }
      ]
    }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const createFallbackImage = (projectName, label) => {
    const safeProjectName = projectName.replace(/&/g, '&amp;');
    const safeLabel = label.replace(/&/g, '&amp;');
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#080b14"/>
            <stop offset="100%" stop-color="#111827"/>
          </linearGradient>
          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7c3aed"/>
            <stop offset="100%" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#bg)"/>
        <circle cx="1250" cy="260" r="260" fill="#7c3aed" fill-opacity="0.12"/>
        <circle cx="300" cy="760" r="320" fill="#06b6d4" fill-opacity="0.10"/>
        <rect x="110" y="110" width="1380" height="780" rx="42" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)"/>
        <rect x="150" y="150" width="130" height="28" rx="14" fill="url(#accent)" fill-opacity="0.9"/>
        <text x="150" y="250" fill="#e2e8f0" font-family="Outfit, Arial, sans-serif" font-size="52" font-weight="700">${safeProjectName}</text>
        <text x="150" y="330" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="34">${safeLabel}</text>
        <rect x="150" y="390" width="560" height="14" rx="7" fill="#7c3aed" fill-opacity="0.6"/>
        <rect x="150" y="430" width="470" height="14" rx="7" fill="#06b6d4" fill-opacity="0.45"/>
        <rect x="150" y="470" width="390" height="14" rx="7" fill="#ffffff" fill-opacity="0.18"/>
        <text x="150" y="820" fill="#64748b" font-family="JetBrains Mono, monospace" font-size="24">Add the screenshot file to the matching path in the gallery array</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  function initProjectGalleries() {
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('gallery-lightbox-image');
    const lightboxCaption = document.getElementById('gallery-lightbox-caption');
    const lightboxClose = document.getElementById('gallery-lightbox-close');

    if (!lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) return;

    let activeGallery = null;

    const openLightbox = (src, caption, alt, gallery) => {
      lightboxImage.src = src;
      lightboxImage.alt = alt || caption;
      lightboxCaption.textContent = caption;
      activeGallery = gallery || activeGallery;
      if (activeGallery) {
        stopAutoplay(activeGallery);
      }
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus({ preventScroll: true });
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImage.src = '';
      if (activeGallery?.imageButton) {
        activeGallery.imageButton.focus({ preventScroll: true });
        startAutoplay(activeGallery);
      }
    };

    const stopAutoplay = (gallery) => {
      if (gallery.timer) {
        clearInterval(gallery.timer);
        gallery.timer = null;
      }
    };

    const startAutoplay = (gallery) => {
      if (prefersReducedMotion || gallery.slides.length < 2 || gallery.timer) return;
      gallery.timer = setInterval(() => {
        advanceSlide(gallery, 1);
      }, 4000);
    };

    const refreshTimer = (gallery) => {
      stopAutoplay(gallery);
      startAutoplay(gallery);
    };

    const renderSlide = (gallery, nextIndex) => {
      const slide = gallery.slides[nextIndex];
      if (!slide) return;

      gallery.currentIndex = nextIndex;
      gallery.label.textContent = slide.label;
      gallery.counter.textContent = `${nextIndex + 1} / ${gallery.slides.length}`;
      gallery.progress.style.width = `${((nextIndex + 1) / gallery.slides.length) * 100}%`;

      gallery.dots.forEach((dot, index) => {
        const isActive = index === nextIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      gallery.image.classList.remove('is-ready');
      gallery.image.alt = `${gallery.projectName} - ${slide.label}`;

      const fallbackSrc = createFallbackImage(gallery.projectName, slide.label);
      const imageLoader = new Image();

      imageLoader.onload = () => {
        gallery.image.src = slide.src;
        gallery.image.onload = () => gallery.image.classList.add('is-ready');
        gallery.image.onerror = () => {
          gallery.image.onerror = null;
          gallery.image.src = fallbackSrc;
          gallery.image.classList.add('is-ready');
        };

        if (gallery.image.src === slide.src) {
          gallery.image.classList.add('is-ready');
        }
      };

      imageLoader.onerror = () => {
        gallery.image.onload = null;
        gallery.image.onerror = null;
        gallery.image.src = fallbackSrc;
        gallery.image.classList.add('is-ready');
      };

      imageLoader.src = slide.src;

      if (imageLoader.complete) {
        gallery.image.src = slide.src;
        gallery.image.classList.add('is-ready');
      }
    };

    const advanceSlide = (gallery, step) => {
      const nextIndex = (gallery.currentIndex + step + gallery.slides.length) % gallery.slides.length;
      renderSlide(gallery, nextIndex);
    };

    const galleries = galleryConfigs.map((config) => {
      const root = document.querySelector(`[data-gallery-root="${config.root}"]`);
      if (!root) return null;

      const imageButton = root.querySelector('[data-gallery-image-button]');
      const image = root.querySelector('[data-gallery-image]');
      const label = root.querySelector('[data-gallery-slide-label]');
      const counter = root.querySelector('[data-gallery-counter]');
      const progress = root.querySelector('[data-gallery-progress]');
      const dotsContainer = root.querySelector('[data-gallery-dots]');
      const prevButton = root.querySelector('[data-gallery-prev]');
      const nextButton = root.querySelector('[data-gallery-next]');

      if (!imageButton || !image || !label || !counter || !progress || !dotsContainer || !prevButton || !nextButton) {
        return null;
      }

      const gallery = {
        projectName: config.projectName,
        slides: config.slides,
        currentIndex: 0,
        timer: null,
        root,
        imageButton,
        image,
        label,
        counter,
        progress,
        dots: []
      };

      dotsContainer.innerHTML = '';
      gallery.dots = config.slides.map((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'gallery-dot';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}: ${slide.label}`);
        dot.addEventListener('click', () => {
          renderSlide(gallery, index);
          refreshTimer(gallery);
        });
        dotsContainer.appendChild(dot);
        return dot;
      });

      prevButton.addEventListener('click', () => {
        advanceSlide(gallery, -1);
        refreshTimer(gallery);
      });

      nextButton.addEventListener('click', () => {
        advanceSlide(gallery, 1);
        refreshTimer(gallery);
      });

      imageButton.addEventListener('click', () => {
        const currentSlide = config.slides[gallery.currentIndex];
        openLightbox(gallery.image.src || currentSlide.src, `${config.projectName} - ${currentSlide.label}`, `${config.projectName} preview: ${currentSlide.label}`, gallery);
      });

      root.addEventListener('mouseenter', () => stopAutoplay(gallery));
      root.addEventListener('mouseleave', () => {
        if (!root.matches(':focus-within')) {
          startAutoplay(gallery);
        }
      });
      root.addEventListener('focusin', () => stopAutoplay(gallery));
      root.addEventListener('focusout', () => {
        setTimeout(() => {
          if (!root.matches(':focus-within')) {
            startAutoplay(gallery);
          }
        }, 0);
      });

      renderSlide(gallery, 0);
      startAutoplay(gallery);
      return gallery;
    }).filter(Boolean);

    const firstGallery = galleries[0] || null;
    activeGallery = firstGallery;

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });

    galleries.forEach((gallery) => {
      if (gallery) {
        gallery.openLightbox = openLightbox;
      }
    });

    window.projectGalleries = galleries;
  }

  initProjectGalleries();

  /* ===== TECH STACK CARD GLOW ===== */
  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });

  /* ===== CREATE BACKGROUND PARTICLES ===== */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      createParticle();
    }
  }

  function createParticle() {
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const left = Math.random() * 100;
    const dur = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.setProperty('--dur', `${dur}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    
    // Randomly change color of some particles
    if (Math.random() > 0.6) {
      particle.style.background = 'var(--accent)';
    }
    
    particlesContainer.appendChild(particle);
  }

  /* ===== CONTACT FORM SUBMISSION ===== */
  const copyButtons = document.querySelectorAll('.copy-btn');
  const copyToast = document.getElementById('copy-toast');

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy');
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
      } catch (error) {
        const tempInput = document.createElement('input');
        tempInput.value = value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        tempInput.remove();
      }

      const originalText = button.textContent;
      button.textContent = 'Copied';
      button.classList.add('copied');

      if (copyToast) {
        copyToast.classList.add('show');
        setTimeout(() => copyToast.classList.remove('show'), 1800);
      }

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 1800);
    });
  });

  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('btn-submit');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btnSpan = submitBtn.querySelector('span');
      const originalText = btnSpan.textContent;
      
      // Simulating sending state
      btnSpan.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      // Simulate API call delay
      setTimeout(() => {
        // Success state
        btnSpan.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        
        contactForm.reset();
        formSuccess.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 5000);
      }, 1500);
    });
  }
});
