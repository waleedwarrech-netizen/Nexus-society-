// =========================
// SMOOTH SCROLLING & ACTIVE LINK
// =========================
const navLinks = document.querySelectorAll('nav a');
const nav = document.getElementById("main-nav");

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    const headerOffset = document.querySelector('header').offsetHeight;
    const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

    navLinks.forEach(l => l.style.fontWeight = '500');
    e.target.style.fontWeight = 'bold';

    // Close menu on mobile after click
    if(nav.classList.contains('open')) {
      nav.classList.remove('open');
    }
  });
});

// =========================
// SECTION REVEAL ON SCROLL
// =========================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// =========================
// LOAD GROUPS AND INFO FROM JSON
// =========================
fetch('groups.json')
  .then(response => response.json())
  .then(data => {
    // INFO BOX
    const infoBox = document.getElementById('info-box');
    data.info.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      infoBox.appendChild(p);
    });

    // GROUP LIST
    const groupList = document.getElementById('group-list');
    data.groups.forEach((group, i) => {
      const li = document.createElement('li');

      const desc = document.createElement('p');
      desc.textContent = group.name + " - " + group.desc;

      const a = document.createElement('a');
      a.href = group.link;
      a.className = 'join-btn';
      a.textContent = 'Join';

      li.appendChild(desc);
      li.appendChild(a);
      groupList.appendChild(li);
    });

    // Fade-in animations for dynamic elements
    const fadeElements = document.querySelectorAll('.community-link a, .join-btn, ul.group-list li');
    const fadeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));
  });

// =========================
// FLOATING PARTICLES
// =========================
const particlesContainer = document.querySelector('.particles');

function createParticles() {
  particlesContainer.innerHTML = '';
  const count = window.innerWidth < 600 ? 30 : 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * window.innerWidth + 'px';
    p.style.top = Math.random() * window.innerHeight + 'px';
    const size = 2 + Math.random() * 6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = (window.innerWidth < 600 ? 6 : 4) + Math.random() * 4 + 's';
    particlesContainer.appendChild(p);
  }
}

createParticles();
window.addEventListener('resize', createParticles);

// =========================
// HAMBURGER MENU TOGGLE & SLIDE-IN ITEMS
// =========================
const toggle = document.getElementById("menu-toggle");
toggle.addEventListener("click", () => {
  nav.classList.toggle("open");

  const menuItems = nav.querySelectorAll('li');
  menuItems.forEach((item, i) => {
    item.style.transitionDelay = nav.classList.contains('open') ? `${i * 0.1}s` : '0s';
  });
});
