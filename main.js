/* =============================================
   UNPFC 2024 - Main JavaScript
   ============================================= */

// ---- Navbar scroll behavior ----
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }

  // Active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (link) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('mobile-open');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('mobile-open');
  });
});

// ---- Countdown Timer ----
// ==================== CONFERENCE COUNTDOWN ====================

const conferenceDate = new Date("November 16, 2026 09:00:00").getTime();

const countdown = setInterval(() => {

  const now = new Date().getTime();
  const distance = conferenceDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  document.getElementById("c-days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("c-hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("c-mins").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("c-secs").textContent =
    String(seconds).padStart(2, "0");

  // Conference has started
  if (distance < 0) {
    clearInterval(countdown);

    document.getElementById("c-days").textContent = "00";
    document.getElementById("c-hours").textContent = "00";
    document.getElementById("c-mins").textContent = "00";
    document.getElementById("c-secs").textContent = "00";
  }

}, 1000);

// ---- Floating Particles ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 3 + 1) + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = (Math.random() * 15 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.8 + 0.2;
    // Alternate colors
    if (i % 3 === 0) p.style.background = 'rgba(0,197,161,0.8)';
    else if (i % 3 === 1) p.style.background = 'rgba(26,111,196,0.6)';
    else p.style.background = 'rgba(255,255,255,0.4)';
    container.appendChild(p);
  }
}

createParticles();

// ---- Scroll Animations ----
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => observer.observe(el));

// ---- Speaker Tabs ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById('tab-' + tab);
    if (target) target.classList.add('active');
  });
});

// ---- Schedule Tabs ----
const schedTabs = document.querySelectorAll('.sched-tab');
const schedContents = document.querySelectorAll('.schedule-content');

schedTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const day = tab.dataset.day;
    schedTabs.forEach(t => t.classList.remove('active'));
    schedContents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('sched-' + day);
    if (target) target.classList.add('active');
  });
});

// ---- Smooth hover glow on cards ----
document.querySelectorAll('.glass-card, .theme-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Console welcome ----
console.log('%c UNPFC 2024 ', 'background:#00c5a1;color:#0a1a15;padding:8px 16px;border-radius:4px;font-weight:bold;font-size:16px;');
console.log('%c International Conference on Folk Medicine & Cultural Heritage of Sindh', 'color:#8fa3bf;font-size:12px;');
