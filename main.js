window.addEventListener('load', () => {
  /* ===== PRELOADER ===== */
  const preloader = document.getElementById('preloader');
  
  // Hide preloader after a slight delay to ensure smooth transition
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
        initScrollReveal();
        initTypewriter();
      }, 600);
    }
  }, 500); // reduced timeout for better UX
});

document.addEventListener('DOMContentLoaded', () => {

  /* ===== CUSTOM CURSOR ===== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (window.innerWidth > 1024 && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Add hover effect to links and buttons
    const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .timeline-card, .about-card, .skills-block');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
        cursorOutline.style.borderColor = 'rgba(6, 182, 212, 0.8)';
        cursorDot.style.transform = 'scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '36px';
        cursorOutline.style.height = '36px';
        cursorOutline.style.borderColor = 'rgba(124, 58, 237, 0.6)';
        cursorDot.style.transform = 'scale(1)';
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
    "Physical Science Student.",
    "WordPress Developer.",
    "AI Content Manager.",
    "Editorial Convener.",
    "Data Analyst."
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

  // Initial Check for Scroll Reveal (after preloader)
  // window.addEventListener('scroll', initScrollReveal); is already attached below

  window.addEventListener('scroll', initScrollReveal);

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
