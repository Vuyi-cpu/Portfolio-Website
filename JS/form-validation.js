function submitForm() {
  const nameInput= document.querySelector('#name');
  const emailInput= document.querySelector('#email');
  const messageInput= document.querySelector('#message');
  if (!nameInput || !emailInput || !messageInput) return;

  const nameValue= nameInput.value.trim();
  const emailValue= emailInput.value.trim();
  const messageValue= messageInput.value.trim();

  // Clear previous error messages before re-validating
  document.querySelectorAll('.err').forEach(errorEl => errorEl.classList.remove('show'));

  let isValid = true;
  if (!nameValue){ 
    document.querySelector('#name-err').classList.add('show');  
    isValid = false; 
}

  if (!emailValue || !/^[^@]+@[^@]+\.[^@]+$/.test(emailValue)) {
    document.querySelector('#email-err').classList.add('show'); isValid = false;
  }
  if (!messageValue) { 
    document.querySelector('#msg-err').classList.add('show');   
    isValid = false; 
}

  if (!isValid) return;

  // Disable button to prevent duplicate submissions
  const submitBtn = document.querySelector('#submit-btn');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled    = true;

  // Simulate network delay then show the success state
  setTimeout(() => {
    document.querySelector('#contact-form').style.display = 'none';
    document.querySelector('#form-success').classList.add('show');
  }, 1200);
}