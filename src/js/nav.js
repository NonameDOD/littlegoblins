// Fade-out az oldalon, majd navigálás
function navigateTo(url) {
  document.body.classList.add('fade-out');
  setTimeout(() => {
    window.location.href = url;
  }, 300);
}

// Fade-in amikor betöltődik az oldal
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});
