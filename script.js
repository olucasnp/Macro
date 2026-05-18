/* =======================================
   MACRO — Bolsas de Crochê | script.js
   ======================================= */
 
/* ---- CURSOR PERSONALIZADO ---- */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
 
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
 
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
 
document.querySelectorAll('button, a, .produto-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    follower.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    follower.classList.remove('active');
  });
});
 
/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
 
/* ---- MENU MOBILE ---- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
 
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
 
function fecharMenu() {
  mobileMenu.classList.remove('open');
}
 
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    fecharMenu();
  }
});
 
/* ---- REVEAL ON SCROLL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay baseado na posição no grupo
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let index = 0;
      siblings.forEach((sib, idx) => { if (sib === entry.target) index = idx; });
 
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Math.min(index * 80, 400));
 
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ---- FILTROS DE CATÁLOGO ---- */
const filtros = document.querySelectorAll('.filtro-btn');
const cards   = document.querySelectorAll('.produto-card');
 
filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    // Atualizar botão ativo
    filtros.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
 
    const filtro = btn.dataset.filtro;
 
    cards.forEach(card => {
      const categoria = card.dataset.categoria;
      const mostrar   = filtro === 'todos' || categoria === filtro;
 
      if (mostrar) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInCard .4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
 
// Keyframes dinâmicos para fadeInCard
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInCard {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
`;
document.head.appendChild(style);
 
/* ---- MODAL DE CONTATO ---- */
const modalOverlay = document.getElementById('modalOverlay');
 
function abrirContato() {
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function fecharModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
 
// Fechar ao clicar fora do modal
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) fecharModal();
});
 
// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharModal();
});
 
/* ---- LINKS DE CONTATO ---- */
// Substitua pelos dados reais da vendedora!
const WHATSAPP_NUMERO = '5531999999999';
const INSTAGRAM_PERFIL = 'macrocrochet';
 
function abrirWhatsApp() {
  const mensagem = encodeURIComponent(
    'Olá! Vi o site da Macro e gostaria de saber mais sobre as bolsas de crochê!'
  );
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagem}`;
  window.open(url, '_blank');
  fecharModal();
}
 
function abrirInstagram() {
  const url = `https://instagram.com/${INSTAGRAM_PERFIL}`;
  window.open(url, '_blank');
  fecharModal();
}
 
/* ---- SMOOTH SCROLL para links âncora ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // altura da navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
 
/* ---- ANIMAÇÃO DE ENTRADA DO HERO ---- */
window.addEventListener('DOMContentLoaded', () => {
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
});