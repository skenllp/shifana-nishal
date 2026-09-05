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

document.getElementById('audio-toggle').addEventListener('click', event => {
  event.currentTarget.classList.toggle('muted');
  event.currentTarget.textContent = event.currentTarget.classList.contains('muted') ? '🔈' : '🔊';
});
