/**
 * Mario Tadic – Electronics & Software Engineering Portfolio
 * Interactive Script: Canvas Circuit Simulation, Terminal, ScrollSpy, Filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCircuitCanvas();
  initTerminal();
  initScrollReveal();
  initSkillsFilter();
  initContactForm();
  initCopyEmail();
  initScrollTop();
});

/* ==========================================================================
   1. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  function toggleMobileNav(open) {
    if (open) {
      hamburger.classList.add('active');
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');
      toggleMobileNav(!isOpen);
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', () => toggleMobileNav(false));
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileNav(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        toggleMobileNav(false);
      }
    });
  }

  // ScrollSpy with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. INTERACTIVE CIRCUIT CANVAS (Hero Background)
   ========================================================================== */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;
  let isVisible = true;

  const nodes = [];
  const pulses = [];
  const maxNodes = 60;
  const connectionDistance = 140;
  const mouse = { x: null, y: null, radius: 160 };

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    initNodes();
  }

  window.addEventListener('resize', debounce(resize, 150));

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY <= rect.bottom) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Node {
    constructor(x, y) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1.5;
      this.baseAlpha = Math.random() * 0.35 + 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${this.baseAlpha})`;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  class Pulse {
    constructor(startNode, endNode) {
      this.start = startNode;
      this.end = endNode;
      this.progress = 0;
      this.speed = 0.015 + Math.random() * 0.02;
    }

    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }

    draw() {
      const x = this.start.x + (this.end.x - this.start.x) * this.progress;
      const y = this.start.y + (this.end.y - this.start.y) * this.progress;

      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initNodes() {
    nodes.length = 0;
    const count = Math.min(maxNodes, Math.floor((width * height) / 14000));
    for (let i = 0; i < count; i++) {
      nodes.push(new Node());
    }
  }

  function spawnPulses() {
    if (Math.random() < 0.05 && nodes.length > 1) {
      const idxA = Math.floor(Math.random() * nodes.length);
      const nodeA = nodes[idxA];
      // Find a close neighbor
      for (let j = 0; j < nodes.length; j++) {
        if (idxA === j) continue;
        const nodeB = nodes[j];
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          pulses.push(new Pulse(nodeA, nodeB));
          break;
        }
      }
    }
  }

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Update & draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      // Connect nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Mouse connection
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const malpha = (1 - mdist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${malpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Update & draw pulses
    spawnPulses();
    for (let i = pulses.length - 1; i >= 0; i--) {
      if (pulses[i].update()) {
        pulses[i].draw();
      } else {
        pulses.splice(i, 1);
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Observer to pause when off-screen
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animate();
      }
    });
  }, { threshold: 0.1 });

  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);

  resize();
  animate();
}

/* ==========================================================================
   3. TERMINAL EMULATOR ANIMATION
   ========================================================================== */
function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  if (!terminalBody) return;

  const lines = [
    { text: '> initializing hardware bus...', delay: 200 },
    { text: '> MCU: ESP32-S3 & ATmega328P detected', delay: 400 },
    { text: '> PROFILE: Mario Tadic', delay: 350 },
    { text: '> DEGREE: Angewandte Elektronik & Technische Informatik', delay: 450 },
    { text: '> CAMPUS: FH Campus Wien', delay: 350 },
    { text: '> LOCATION: Wien, Österreich [48.2082° N, 16.3738° E]', delay: 400 },
    { text: '> CORE SKILLS: PCB Design | KiCad | C++ | Sensorik', delay: 450 },
    { text: '> STATUS: [ONLINE] System operational & ready.', delay: 500, highlight: true }
  ];

  let currentLineIndex = 0;
  let hasStarted = false;

  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        typeNextLine();
      }
    });
  }, { threshold: 0.3 });

  terminalObserver.observe(terminalBody);

  function typeNextLine() {
    if (currentLineIndex >= lines.length) {
      // Add blinking cursor
      const cursor = document.createElement('span');
      cursor.className = 'terminal__cursor';
      terminalBody.appendChild(cursor);
      return;
    }

    const lineData = lines[currentLineIndex];
    const lineEl = document.createElement('div');
    lineEl.className = 'terminal__line';
    if (lineData.highlight) lineEl.className += ' terminal__line--success';

    terminalBody.appendChild(lineEl);

    let charIndex = 0;
    const text = lineData.text;

    function typeChar() {
      if (charIndex < text.length) {
        lineEl.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, 25);
      } else {
        currentLineIndex++;
        setTimeout(typeNextLine, lineData.delay || 300);
      }
    }

    typeChar();
  }
}

/* ==========================================================================
   4. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Slight stagger for sibling cards
        setTimeout(() => {
          entry.target.classList.add('active');
        }, (idx % 3) * 60);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills__filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM (Client-side Mailto Generator)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subjectSelect = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      alert('Bitte fülle alle erforderlichen Felder aus.');
      return;
    }

    const emailTo = 'mariotadic246@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio-Kontakt] ${subjectSelect || 'Anfrage'} von ${name}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\n` +
      `E-Mail: ${email}\n` +
      `Thema: ${subjectSelect || 'Keine Angabe'}\n\n` +
      `Nachricht:\n${message}\n\n` +
      `---\nGesendet über mario-tadic.portfolio`
    );

    const mailtoUrl = `mailto:${emailTo}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
  });
}

/* ==========================================================================
   7. COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = copyBtn.getAttribute('data-copy') || 'mariotadic246@gmail.com';

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Kopiert!';
      copyBtn.classList.add('copied');

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Kopieren fehlgeschlagen:', err);
    });
  });
}

/* ==========================================================================
   8. SCROLL TO TOP BUTTON
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- Utility: Debounce --- */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
