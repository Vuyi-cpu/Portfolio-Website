/**
 * SCRIPT: form-validation.js
 * DESCRIPTION: Validates contact form inputs and provides user feedback.
 */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('input[type="text"]').value.trim();
      const email = contactForm.querySelector('input[type="email"]').value.trim();
      const message = contactForm.querySelector('textarea').value.trim();

      if (name && email && message) {
        // Log to console to simulate form processing as per PRD
        console.log("Form Submitted:", { name, email, message });
        alert(`Thank you, ${name}! Your message has been sent successfully.`);
        contactForm.reset();
      } 
    });
  }
});