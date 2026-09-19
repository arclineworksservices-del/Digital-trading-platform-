const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteMenu.classList.toggle('is-open', !isOpen);
});

siteMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteMenu.classList.remove('is-open');
  });
});

const categoryTabs = document.querySelectorAll('.category-tab');
const productCards = document.querySelectorAll('.product-card');

categoryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    categoryTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    productCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const enquiryForm = document.querySelector('#enquiry-form');
const formStatus = document.querySelector('#form-status');

enquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const message = [
    'Hello Selenity, I would like to make a trade enquiry.',
    `Name / company: ${data.get('name')}`,
    `Contact: ${data.get('email')}`,
    `Category: ${data.get('category')}`,
    `Brief: ${data.get('message')}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/23276666665?text=${encodeURIComponent(message)}`;
  formStatus.textContent = 'Your enquiry is ready. WhatsApp will open so you can review and send it.';
  window.open(whatsappUrl, '_blank', 'noopener');
});

document.querySelector('#year').textContent = new Date().getFullYear();