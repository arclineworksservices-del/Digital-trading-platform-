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

const shopTabs = document.querySelectorAll('.shop-tab');
const shopCards = document.querySelectorAll('.shop-card');
const quoteBasket = [];
const basket = document.querySelector('#basket');
const basketItems = document.querySelector('#basket-items');
const basketCount = document.querySelector('#basket-count');
const basketOpen = document.querySelector('#basket-open');
const basketClose = document.querySelector('#basket-close');
const basketCheckout = document.querySelector('#basket-checkout');

shopTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.shopFilter;
    shopTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    shopCards.forEach((card) => {
      card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.shopCategory !== filter);
    });
  });
});

function setBasket(open) {
  basket.classList.toggle('is-open', open);
  basket.setAttribute('aria-hidden', String(!open));
  basketOpen.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
}

function renderBasket() {
  basketCount.textContent = quoteBasket.length;
  basketCheckout.disabled = quoteBasket.length === 0;
  document.querySelectorAll('.shop-card').forEach((card) => {
    const added = quoteBasket.includes(card.dataset.product);
    const button = card.querySelector('.add-quote');
    button.classList.toggle('is-added', added);
    button.textContent = added ? 'Added to quote' : 'Add to quote';
  });
  if (!quoteBasket.length) {
    basketItems.innerHTML = '<p class="basket-empty">Your basket is empty. Add products to prepare a WhatsApp order request.</p>';
    return;
  }
  basketItems.innerHTML = quoteBasket.map((product, index) => `<div class="basket-row"><span>${product}</span><button type="button" data-remove="${index}">Remove</button></div>`).join('');
  basketItems.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => {
      quoteBasket.splice(Number(button.dataset.remove), 1);
      renderBasket();
    });
  });
}

document.querySelectorAll('.add-quote').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.closest('.shop-card').dataset.product;
    if (!quoteBasket.includes(product)) quoteBasket.push(product);
    renderBasket();
    setBasket(true);
  });
});

basketOpen?.addEventListener('click', () => setBasket(true));
basketClose?.addEventListener('click', () => setBasket(false));
basket?.addEventListener('click', (event) => {
  if (event.target === basket) setBasket(false);
});
document.querySelector('#basket-clear')?.addEventListener('click', () => {
  quoteBasket.splice(0, quoteBasket.length);
  renderBasket();
});
basketCheckout?.addEventListener('click', () => {
  const products = quoteBasket.map((product, index) => `${index + 1}. ${product}`).join('\n');
  const message = `Hello Selenity, I would like a price and availability quote for:\n\n${products}\n\nPlease confirm the total price and delivery options.`;
  window.open(`https://wa.me/23276666665?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

renderBasket();
