function submitForm() {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const msgInput = document.querySelector('#message');
    
    if(!nameInput || !emailInput || !msgInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = msgInput.value.trim();
    let ok = true;
    
    document.querySelectorAll('.err').forEach(e => e.classList.remove('show'));
    
    if (!name) { document.querySelector('#name-err').classList.add('show'); ok = false; }
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { document.querySelector('#email-err').classList.add('show'); ok = false; }
    if (!msg) { document.querySelector('#msg-err').classList.add('show'); ok = false; }
    
    if (!ok) return;
    
    const btn = document.querySelector('#submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        document.querySelector('#contact-form').style.display = 'none';
        document.querySelector('#form-success').classList.add('show');
    }, 1200);
}