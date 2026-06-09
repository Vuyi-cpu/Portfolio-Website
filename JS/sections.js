// Typewriter effect on the hero subtitle
const typewriterEl = document.querySelector('#typewriter');

if (typewriterEl) {
  const phrases = [
    'Web Developer.',
    'Software Engineer.',
    'Game Designer.',
    'Embedded Systems Developer.',
    'Digital Artist.'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function typeNextChar() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Type one character forward
      typewriterEl.textContent = currentPhrase.slice(0, ++charIndex);

      if (charIndex === currentPhrase.length) {
        // Pause at end of phrase before deleting
        isDeleting = true;
        setTimeout(typeNextChar, 1800);
        return;
      }
      setTimeout(typeNextChar, 80);

    } else {
      // Erase one character
      typewriterEl.textContent = currentPhrase.slice(0, --charIndex);

      if (charIndex === 0) {
        // Move to next phrase once fully erased
        isDeleting  = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeNextChar, 400);
        return;
      }
      setTimeout(typeNextChar, 45);
    }
  }

  // Delay start so the page-load animation settles first
  setTimeout(typeNextChar, 1600);
}