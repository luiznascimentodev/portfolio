import './bootstrap';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const hamburger = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Navegação suave para os links do menu
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
  link.addEventListener('click', (event) => {
    const targetId = event.target.getAttribute('data-target');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Seleciona o botão
const scrollToTopButton = document.getElementById('scrollToTop');

// Mostra o botão ao rolar para baixo
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollToTopButton.classList.add('visible');
  } else {
    scrollToTopButton.classList.remove('visible');
  }
});

// Função para rolar até o topo ao clicar no botão
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Funções para os botões de LinkedIn, GitHub e Download CV
document.getElementById('linkedin-profile').addEventListener('click', () => {
  window.open('https://www.linkedin.com/in/luiz-felippe-nascimento/', '_blank');
});

document.getElementById('go-to-projects').addEventListener('click', () => {
  window.open('https://github.com/luiznascimentodev', '_blank');
});

document.getElementById('download-cv').addEventListener('click', () => {
  window.location.href = './assets/Luiz_Nascimento_CV.pdf';
});

// Animação para os elementos de tecnologia
const tecnologias = document.querySelectorAll('.tecnologia');
tecnologias.forEach(tecnologia => {
  tecnologia.addEventListener('mouseover', () => {
    tecnologia.classList.add('hover');
  });
  tecnologia.addEventListener('mouseout', () => {
    tecnologia.classList.remove('hover');
  });
});

// Carrossel de projetos
const slides = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.nav-button[title="Previous slide"]');
const nextButton = document.querySelector('.nav-button[title="Next slide"]');
let currentSlide = 0;

// Atualiza os indicadores do carrossel
function updateIndicators() {
  const indicators = document.querySelectorAll('.carousel-container .absolute.bottom-2 button');
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('bg-blue-500/60');
      indicator.classList.remove('bg-blue-500/40');
    } else {
      indicator.classList.add('bg-blue-500/40');
      indicator.classList.remove('bg-blue-500/60');
    }
  });
}

// Atualiza os slides e os indicadores com animação aprimorada
function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'hidden', 'prev', 'next', 'slide-in', 'slide-out');
    if (index === currentSlide) {
      slide.classList.add('active', 'slide-in');
    } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
      slide.classList.add('prev', 'slide-out');
    } else if (index === (currentSlide + 1) % slides.length) {
      slide.classList.add('next', 'slide-out');
    } else {
      slide.classList.add('hidden');
    }
  });
  updateIndicators();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Adiciona eventos aos indicadores
const indicators = document.querySelectorAll('.carousel-container .absolute.bottom-2 button');
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentSlide = index;
    updateSlides();
  });
});

// Inicializa os slides e os indicadores
updateSlides();