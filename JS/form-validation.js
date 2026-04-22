/**
 * SCRIPT: form-validation.js
 * DESCRIPTION: Validates contact form inputs and provides user feedback.
 */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector('.contact-form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector('textarea');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Better email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    alert(`Thank you, ${name}! Your message has been sent successfully.`);

    contactForm.reset();
  });
});