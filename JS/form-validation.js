const submitBtn = document.querySelector('#submit-btn');
if (submitBtn) submitBtn.addEventListener('click', submitForm);

function submitForm() {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput= document.querySelector('#message');
  if (!nameInput || !emailInput || !messageInput) return;

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue= messageInput.value.trim();

  document.querySelectorAll('.err').forEach(el => el.classList.remove('show'));

  let isValid = true;

  if (!nameValue) {
    document.querySelector('#name-err').classList.add('show');
    isValid = false;
  }
  if (!emailValue || !/^[^@]+@[^@]+\.[^@]+$/.test(emailValue)) {//check for symbols for valid email address and if not display error
    document.querySelector('#email-err').classList.add('show');
    isValid = false;
  }
  if (!messageValue) {
    document.querySelector('#msg-err').classList.add('show');
    isValid = false;
  }

  if (!isValid) return;

  const btn = document.querySelector('#submit-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true; // disable clicks on button while message sending

  setTimeout(() => {
    document.querySelector('#contact-form').style.display = 'none';
    document.querySelector('#form-success').classList.add('show');
  }, 1200);
}