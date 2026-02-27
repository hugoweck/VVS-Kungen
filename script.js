const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const validateField = (field) => {
  const isRequired = field.hasAttribute('required');
  const value = field.value.trim();

  if (isRequired && !value) {
    field.classList.add('invalid');
    return false;
  }

  if (field.type === 'email' && value) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!emailValid) {
      field.classList.add('invalid');
      return false;
    }
  }

  field.classList.remove('invalid');
  return true;
};

if (contactForm && formMessage) {
  const fields = Array.from(contactForm.querySelectorAll('input, textarea'));

  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('blur', () => validateField(field));
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const allValid = fields.every((field) => validateField(field));

    formMessage.classList.remove('success', 'error');

    if (!allValid) {
      formMessage.textContent = 'Vänligen fyll i obligatoriska fält korrekt.';
      formMessage.classList.add('error');
      return;
    }

    formMessage.textContent = 'Tack! Vi har tagit emot ditt meddelande och återkommer snart.';
    formMessage.classList.add('success');
    contactForm.reset();
  });
}
