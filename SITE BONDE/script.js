// Inicializa os ícones do Lucide
lucide.createIcons();
// Adiciona animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
// Animação para cards de serviço
const observerOptions = {
  threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);
document.querySelectorAll('.service-card, .stat-card, .contact-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});
// Navbar transparente ao scroll
let lastScroll = 0;
const navbar = document.querySelector('.nav-fixed');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    return;
  }
  
  if (currentScroll > lastScroll) {
    // Scroll down
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  } else {
    // Scroll up
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  }
  
  lastScroll = currentScroll;
});