const weddingDate = new Date('2026-10-04T11:30:00');

function updateCountdown() {
  const diff = Math.max(0, weddingDate - new Date());
  const values = [
    Math.floor(diff / 864e5),
    Math.floor(diff / 36e5) % 24,
    Math.floor(diff / 6e4) % 60,
    Math.floor(diff / 1e3) % 60
  ];
  ['days', 'hours', 'mins', 'secs'].forEach((id, index) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(values[index]).padStart(2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Multi-language Switcher
document.querySelectorAll('.langbar button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.langbar button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const lang = button.dataset.lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) el.innerHTML = text;
    });
  });
});

// Opening Section & Background Music Integration
const openBtn = document.getElementById('open-btn');
const openingOverlay = document.getElementById('opening-overlay');
const bgMusic = document.getElementById('bg-music');
const audioToggle = document.getElementById('audio-toggle');

if (openingOverlay && openBtn) {
  document.body.classList.add('lock-scroll');
  
  openBtn.addEventListener('click', () => {
    openingOverlay.classList.add('opened');
    document.body.classList.remove('lock-scroll');

    if (bgMusic) {
      bgMusic.play().then(() => {
        if (audioToggle) {
          audioToggle.classList.remove('muted');
          audioToggle.textContent = '🔊';
          audioToggle.setAttribute('aria-label', 'Mute audio');
        }
      }).catch(err => {
        console.warn('Playback error or user gesture required:', err);
      });
    }
  });
}

if (audioToggle && bgMusic) {
  audioToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      audioToggle.classList.remove('muted');
      audioToggle.textContent = '🔊';
      audioToggle.setAttribute('aria-label', 'Mute audio');
    } else {
      bgMusic.pause();
      audioToggle.classList.add('muted');
      audioToggle.textContent = '🔈';
      audioToggle.setAttribute('aria-label', 'Unmute audio');
    }
  });
}
