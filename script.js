document.querySelectorAll('.book-img').forEach(img => {
  let overlay = null;
  let zoomed = false;

  img.addEventListener('click', () => {
    // Create overlay on first click
    overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.85);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: zoom-out;
    `;

    const full = document.createElement('img');
    full.src = img.src;
    full.style.cssText = `
      max-width: 50vw;
      max-height: 50vh;
      border-radius: 12px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
      transition: transform 0.3s ease;
      cursor: zoom-in;
      transform: scale(1);
    `;

    zoomed = false;

    // Toggle zoom in/out on the full image
    full.addEventListener('click', (e) => {
      e.stopPropagation();
      zoomed = !zoomed;
      full.style.transform = zoomed ? 'scale(1)' : 'scale(1)';
      full.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
    });

    // Close overlay when clicking outside the image
    overlay.addEventListener('click', () => {
      overlay.remove();
      overlay = null;
      zoomed = false;
    });

    overlay.appendChild(full);
    document.body.appendChild(overlay);
  });
});

// ── MOBILE NAV TOGGLE ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
}

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// ── CLOSE MOBILE NAV ON OUTSIDE CLICK ──
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('open');
  }
});
