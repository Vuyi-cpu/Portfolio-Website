function submitForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput = document.getElementById('message');
    
    if(!nameInput || !emailInput || !msgInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const msg = msgInput.value.trim();
    let ok = true;
    
    document.querySelectorAll('.err').forEach(e => e.classList.remove('show'));
    
    if (!name) { document.getElementById('name-err').classList.add('show'); ok = false; }
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { document.getElementById('email-err').classList.add('show'); ok = false; }
    if (!msg) { document.getElementById('msg-err').classList.add('show'); ok = false; }
    
    if (!ok) return;
    
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        document.getElementById('contact-form').style.display = 'none';
        document.getElementById('form-success').classList.add('show');
    }, 1200);
}