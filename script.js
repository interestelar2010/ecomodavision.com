// Interacciones sencillas y editables para el sitio ECOMODA.
// Añade el número internacional (solo dígitos) al publicar WhatsApp.
const WHATSAPP_NUMBER = "593939348997";

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    navigation.classList.remove('open');
  });
});

// Filtrado por estilo: los modelos pueden pertenecer a más de una categoría.
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    productCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.classList.toggle('hidden', !matches);
    });
  });
});

// Los botones de consulta informan el modelo y preparan el mensaje de WhatsApp.
const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('.product-link').forEach((link) => {
  link.addEventListener('click', () => {
    const model = link.dataset.model;
    if (WHATSAPP_NUMBER) {
      link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quisiera consultar información del modelo ${model}.`)}`;
      link.target = '_blank';
      link.rel = 'noopener';
    } else {
      toast.textContent = `Consulta por el modelo ${model}: agrega tu teléfono para habilitar WhatsApp.`;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
    }
  });
});

const whatsappLink = document.querySelector('.whatsapp-link');
if (WHATSAPP_NUMBER) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, quisiera información sobre ECOMODA.')}`;
  whatsappLink.removeAttribute('aria-label');
} else {
  whatsappLink.addEventListener('click', (event) => {
    event.preventDefault();
    toast.textContent = 'Agrega el número de WhatsApp en script.js para activar este contacto.';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
