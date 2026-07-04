const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));



const lightbox = document.querySelector('[data-lightbox]');
if (lightbox) {
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const openLightbox = (img) => {
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || 'Imagen ampliada';
    const caption = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.classList.add('lightbox-open');
  };
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => {
      lightboxImage.src = '';
      lightboxCaption.textContent = '';
    }, 180);
  };
  document.querySelectorAll('.lightboxable').forEach((img) => {
    img.addEventListener('click', () => openLightbox(img));
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });
  closeButton?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}
